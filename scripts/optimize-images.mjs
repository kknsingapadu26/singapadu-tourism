import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  watch,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();
const WATCH_MODE = process.argv.includes("--watch");
const PIPELINE_VERSION = 2;

const PROFILES = Object.freeze({
  logos: {
    source: "public/logos-unoptimized",
    output: "public/logos",
    widths: [512],
    responsive: false,
    formats: {
      webp: { lossless: true, effort: 6 },
    },
  },
  heroes: {
    source: "public/heroes-unoptimized",
    output: "public/heroes",
    widths: [768, 1280, 1600, 1920, 2560],
    responsive: true,
    formats: {
      avif: { quality: 60, effort: 5 },
      webp: { quality: 82, effort: 5, smartSubsample: true },
    },
  },
  gallery: {
    source: "public/gallery-unoptimized",
    output: "public/gallery",
    widths: [480, 768, 1200, 1600],
    responsive: true,
    formats: {
      avif: { quality: 60, effort: 5 },
      webp: { quality: 82, effort: 5, smartSubsample: true },
    },
  },
});

const SUPPORTED_EXTENSIONS = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

function parseSelectedProfiles() {
  const args = process.argv.slice(2);
  const selected = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--watch") continue;

    if (argument === "--profile") {
      const profileName = args[index + 1];
      if (!profileName) throw new Error("--profile requires a profile name");
      selected.push(profileName);
      index += 1;
      continue;
    }

    if (argument.startsWith("--profile=")) {
      selected.push(argument.slice("--profile=".length));
      continue;
    }

    throw new Error(`Unknown argument: ${argument}`);
  }

  const names = selected.length > 0 ? [...new Set(selected)] : Object.keys(PROFILES);

  for (const name of names) {
    if (!PROFILES[name]) {
      throw new Error(
        `Unknown profile "${name}". Available profiles: ${Object.keys(PROFILES).join(", ")}`,
      );
    }
  }

  return names;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listImages(directory) {
  const files = [];

  async function visit(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;

      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (
        entry.isFile() &&
        SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
      ) {
        files.push(entryPath);
      }
    }
  }

  await visit(directory);
  return files.sort((a, b) => a.localeCompare(b));
}

async function readManifest(manifestPath) {
  if (!(await exists(manifestPath))) return { version: PIPELINE_VERSION, images: [] };

  try {
    const contents = await readFile(manifestPath, "utf8");
    const manifest = JSON.parse(contents);

    if (!Array.isArray(manifest.images)) throw new Error("missing images array");
    return manifest;
  } catch (error) {
    console.warn(
      `[images] Ignoring invalid manifest: ${error instanceof Error ? error.message : error}`,
    );
    return { version: PIPELINE_VERSION, images: [] };
  }
}

function fingerprint(sourceBuffer, profile) {
  return createHash("sha256")
    .update(String(PIPELINE_VERSION))
    .update(JSON.stringify(profile))
    .update(sourceBuffer)
    .digest("hex");
}

function assertInside(directory, filePath) {
  const relativePath = path.relative(directory, filePath);

  if (
    relativePath === "" ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Unsafe generated path: ${filePath}`);
  }
}

async function atomicWrite(outputDirectory, filePath, contents) {
  assertInside(outputDirectory, filePath);
  await mkdir(path.dirname(filePath), { recursive: true });

  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, contents);
  await rm(filePath, { force: true });
  await rename(temporaryPath, filePath);
}

function expectedFormatForExtension(extension) {
  if (extension === ".jpg" || extension === ".jpeg") return "jpeg";
  if (extension === ".tif" || extension === ".tiff") return "tiff";
  return extension.slice(1);
}

function getTargetWidths(sourceWidth, configuredWidths) {
  const maximumWidth = Math.max(...configuredWidths);
  const cappedSourceWidth = Math.min(sourceWidth, maximumWidth);

  return [
    ...new Set([
      ...configuredWidths.filter((width) => width < cappedSourceWidth),
      cappedSourceWidth,
    ]),
  ].sort((a, b) => a - b);
}

async function allVariantFilesExist(image, outputDirectory, publicPrefix) {
  if (!Array.isArray(image?.variants) || image.variants.length === 0) return false;

  for (const variant of image.variants) {
    if (!variant.output.startsWith(publicPrefix)) return false;

    const relativeOutput = variant.output.slice(publicPrefix.length);
    const outputPath = path.join(outputDirectory, relativeOutput);
    assertInside(outputDirectory, outputPath);

    if (!(await exists(outputPath))) return false;
  }

  return true;
}

async function encodeVariant(sourceBuffer, width, format, options) {
  const pipeline = sharp(sourceBuffer, { failOn: "warning" })
    .rotate()
    .resize({ width, withoutEnlargement: true });

  if (format === "avif") return pipeline.avif(options).toBuffer();
  if (format === "webp") return pipeline.webp(options).toBuffer();

  throw new Error(`Unsupported output format: ${format}`);
}

async function optimizeProfile(profileName) {
  const profile = PROFILES[profileName];
  const sourceDirectory = path.join(PROJECT_ROOT, profile.source);
  const outputDirectory = path.join(PROJECT_ROOT, profile.output);
  const manifestPath = path.join(outputDirectory, "manifest.json");
  const publicPrefix = `/${toPosix(path.relative(path.join(PROJECT_ROOT, "public"), outputDirectory))}/`;

  if (!(await exists(sourceDirectory))) {
    throw new Error(`Source directory not found: ${profile.source}`);
  }

  await mkdir(outputDirectory, { recursive: true });

  const sourceFiles = await listImages(sourceDirectory);
  const previousManifest = await readManifest(manifestPath);
  const previousBySource = new Map(
    previousManifest.images.map((image) => [image.source, image]),
  );
  const claimedOutputs = new Map();
  const images = [];
  let optimizedCount = 0;
  let skippedCount = 0;
  let retainedCount = 0;

  for (const sourcePath of sourceFiles) {
    const sourceRelative = toPosix(path.relative(sourceDirectory, sourcePath));
    const sourceBuffer = await readFile(sourcePath);
    const sourceHash = fingerprint(sourceBuffer, profile);
    const previous = previousBySource.get(sourceRelative);

    if (
      previous?.sourceHash === sourceHash &&
      (await allVariantFilesExist(previous, outputDirectory, publicPrefix))
    ) {
      for (const variant of previous.variants) {
        const outputRelative = variant.output.slice(publicPrefix.length);
        const outputKey = outputRelative.toLowerCase();
        const claimedBy = claimedOutputs.get(outputKey);

        if (claimedBy && claimedBy !== sourceRelative) {
          throw new Error(
            `Output collision: ${claimedBy} and ${sourceRelative} both map to ${outputRelative}`,
          );
        }

        claimedOutputs.set(outputKey, sourceRelative);
      }

      images.push(previous);
      skippedCount += 1;
      continue;
    }

    let sourceMetadata;

    try {
      sourceMetadata = await sharp(sourceBuffer, { failOn: "warning" }).metadata();
    } catch (error) {
      throw new Error(
        `Cannot read ${profileName}/${sourceRelative}: ${error instanceof Error ? error.message : error}`,
      );
    }

    if (!sourceMetadata.width || !sourceMetadata.height) {
      throw new Error(`Missing dimensions for ${profileName}/${sourceRelative}`);
    }

    const extension = path.extname(sourceRelative).toLowerCase();
    const expectedFormat = expectedFormatForExtension(extension);

    if (sourceMetadata.format && sourceMetadata.format !== expectedFormat) {
      console.warn(
        `[images:${profileName}] ${sourceRelative} is encoded as ${sourceMetadata.format}, ` +
          `not ${expectedFormat}. Generated files will have correct extensions.`,
      );
    }

    const parsedPath = path.parse(sourceRelative);
    const targetWidths = getTargetWidths(sourceMetadata.width, profile.widths);
    const variants = [];

    for (const width of targetWidths) {
      for (const [format, options] of Object.entries(profile.formats)) {
        const fileName = profile.responsive
          ? `${parsedPath.name}-${width}w.${format}`
          : `${parsedPath.name}.${format}`;
        const outputRelative = toPosix(path.join(parsedPath.dir, fileName));
        const outputKey = outputRelative.toLowerCase();
        const claimedBy = claimedOutputs.get(outputKey);

        if (claimedBy && claimedBy !== sourceRelative) {
          throw new Error(
            `Output collision: ${claimedBy} and ${sourceRelative} both map to ${outputRelative}`,
          );
        }

        claimedOutputs.set(outputKey, sourceRelative);

        const outputPath = path.join(outputDirectory, outputRelative);
        assertInside(outputDirectory, outputPath);

        const outputBuffer = await encodeVariant(
          sourceBuffer,
          width,
          format,
          options,
        );
        const outputMetadata = await sharp(outputBuffer).metadata();
        await atomicWrite(outputDirectory, outputPath, outputBuffer);

        variants.push({
          output: `${publicPrefix}${outputRelative}`,
          format: outputMetadata.format,
          width: outputMetadata.width,
          height: outputMetadata.height,
          bytes: outputBuffer.length,
        });
      }
    }

    images.push({
      source: sourceRelative,
      sourceHash,
      sourceFormat: sourceMetadata.format,
      sourceWidth: sourceMetadata.width,
      sourceHeight: sourceMetadata.height,
      sourceBytes: sourceBuffer.length,
      hasAlpha: sourceMetadata.hasAlpha,
      variants,
    });
    optimizedCount += 1;
  }

  const activeSources = new Set(images.map((image) => image.source));

  for (const previous of previousManifest.images) {
    if (!activeSources.has(previous.source)) {
      images.push(previous);
      retainedCount += 1;
    }
  }

  images.sort((a, b) => a.source.localeCompare(b.source));

  const manifest = {
    version: PIPELINE_VERSION,
    profile: profileName,
    config: profile,
    images,
  };
  await atomicWrite(
    outputDirectory,
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  const originalBytes = images.reduce(
    (total, image) => total + image.sourceBytes,
    0,
  );
  const generatedBytes = images.reduce(
    (total, image) =>
      total + image.variants.reduce((sum, variant) => sum + variant.bytes, 0),
    0,
  );

  console.log(
    `[images:${profileName}] ${sourceFiles.length} current source(s): ` +
      `${optimizedCount} optimized, ${skippedCount} unchanged, ` +
      `${retainedCount} previous manifest entry/entries retained, ` +
      `no generated files deleted, ` +
      `${images.reduce((total, image) => total + image.variants.length, 0)} variant(s), ` +
      `${originalBytes} source bytes → ${generatedBytes} generated bytes.`,
  );
}

const selectedProfiles = parseSelectedProfiles();
let running = false;
let rerunRequested = false;

async function runOptimization() {
  if (running) {
    rerunRequested = true;
    return;
  }

  running = true;

  try {
    for (const profileName of selectedProfiles) {
      await optimizeProfile(profileName);
    }
  } catch (error) {
    console.error(
      `[images] ${error instanceof Error ? error.message : String(error)}`,
    );
    if (!WATCH_MODE) process.exitCode = 1;
  } finally {
    running = false;

    if (rerunRequested) {
      rerunRequested = false;
      await runOptimization();
    }
  }
}

await runOptimization();

if (WATCH_MODE) {
  let debounceTimer;

  async function watchProfile(profileName) {
    const sourceDirectory = path.join(PROJECT_ROOT, PROFILES[profileName].source);
    const watcher = watch(sourceDirectory, { recursive: true });

    console.log(`[images:${profileName}] Watching ${PROFILES[profileName].source}...`);

    for await (const event of watcher) {
      if (
        !SUPPORTED_EXTENSIONS.has(
          path.extname(event.filename ?? "").toLowerCase(),
        )
      ) {
        continue;
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => void runOptimization(), 250);
    }
  }

  await Promise.all(selectedProfiles.map((profileName) => watchProfile(profileName)));
}
