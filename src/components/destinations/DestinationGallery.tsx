import Image from 'next/image';

interface DestinationGalleryProps {
  images: readonly string[];
  title: string;
  eyebrow: string;
  heading: string;
}

const DESKTOP_SPANS = [
  'lg:col-span-8',
  'lg:col-span-8',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-8',
] as const;

/** Swiss-style editorial mosaic that remains balanced for variable image counts. */
export function DestinationGallery({
  images,
  title,
  eyebrow,
  heading,
}: DestinationGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section
      aria-labelledby="destination-gallery-title"
      className="-mx-6 mt-20 overflow-hidden bg-[var(--surface-inverse)] px-6 py-14 text-[var(--text-inverse)] sm:rounded-sm sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        <header className="flex flex-col justify-between gap-6 pb-4 sm:col-span-2 lg:col-span-4 lg:min-h-[340px] lg:pb-8 lg:pr-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--green-400)]">
              {eyebrow}
            </span>
            <h2
              id="destination-gallery-title"
              className="max-w-[12ch] text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/55">
            {String(images.length).padStart(2, '0')} {eyebrow}
          </span>
        </header>

        {images.map((image, index) => {
          const isLastUnpaired =
            index === images.length - 1 && images.length > 1 && images.length % 2 === 0;
          const desktopSpan =
            index === 0
              ? DESKTOP_SPANS[0]
              : DESKTOP_SPANS[((index - 1) % (DESKTOP_SPANS.length - 1)) + 1];
          const tileLabel = index === 0 ? title : `${eyebrow} ${String(index + 1).padStart(2, '0')}`;

          return (
            <figure
              key={`${image}-${index}`}
              className={`group relative m-0 h-[260px] overflow-hidden rounded-sm bg-[var(--surface-sunken)] sm:h-[320px] ${
                index === 0 ? 'sm:col-span-2 lg:h-[340px]' : ''
              } ${isLastUnpaired ? 'sm:col-span-2 lg:col-span-12' : desktopSpan}`}
            >
              <Image
                src={image}
                alt={`${title} gallery ${index + 1}`}
                fill
                sizes={
                  index === 0 || desktopSpan === 'lg:col-span-8'
                    ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
                }
                className="object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <span className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-bold leading-tight text-white`}>
                  {tileLabel}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
