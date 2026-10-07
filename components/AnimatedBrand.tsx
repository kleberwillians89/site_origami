import Image from "next/image";
import { siteAssets } from "@/lib/siteAssets";

export default function AnimatedBrand() {
  return (
    <span className="header__brandMedia">
      <Image
        src={siteAssets.brand.headerAnimationImage}
        alt=""
        aria-hidden="true"
        width={560}
        height={200}
        className="header__brandAnimation"
        unoptimized
        preload
      />
      <Image
        src={siteAssets.brand.header}
        alt=""
        aria-hidden="true"
        width={150}
        height={35}
        className="header__brandFallback"
      />
    </span>
  );
}
