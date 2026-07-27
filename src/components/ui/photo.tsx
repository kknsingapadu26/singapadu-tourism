import Image from "next/image";

import type { ImageAsset, Locale } from "@/domain/tourism";

type PhotoProps = {
  asset: ImageAsset;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Photo({
  asset,
  locale,
  className = "",
  priority = false,
  sizes = "100vw",
}: PhotoProps) {
  if (asset.src) {
    return (
      <div className={`photo ${className}`}>
        <Image
          alt={asset.alt[locale]}
          fill
          priority={priority}
          sizes={sizes}
          src={asset.src}
        />
      </div>
    );
  }

  // CHANGE THE PHOTO HERE: placeholders disappear automatically when asset.src is supplied.
  return (
    <div
      aria-label={asset.alt[locale]}
      className={`photo photo--placeholder photo--${asset.tone} ${className}`}
      role="img"
    >
      <span className="photo__sun" />
      <span className="photo__ridge photo__ridge--back" />
      <span className="photo__ridge photo__ridge--front" />
      <span className="photo__grain" />
      <span className="photo__label">{asset.alt[locale]}</span>
    </div>
  );
}
