"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteMedia } from "@/lib/siteAssets";

type Props = {
  media: SiteMedia;
  sizes: string;
  className?: string;
  preload?: boolean;
};

export default function SiteImage({ media, sizes, className, preload }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const src = failedSource === media.src ? media.fallback : media.src;

  return (
    <Image
      src={src}
      alt={media.alt}
      fill
      sizes={sizes}
      className={className}
      preload={preload}
      onError={() => setFailedSource(media.src)}
    />
  );
}
