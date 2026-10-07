"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteAssets } from "@/lib/siteAssets";

export default function VideoFeatureScene() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        const clock = { progress: 0 };

        timeline
          .to(clock, { progress: 1, duration: 1, ease: "none" }, 0)
          .fromTo(
            ".video-feature__frame",
            { scale: 0.94, y: 24 },
            { scale: 1, y: 0, duration: 0.25, ease: "power2.out" },
            0
          )
          .to(
            ".video-feature__frame",
            { scale: 0.98, y: -14, duration: 0.3, ease: "power2.inOut" },
            0.7
          );
      });

      media.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".video-feature__frame",
          { y: 18 },
          {
            y: 0,
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              end: "top 48%",
              scrub: .65,
            },
          }
        );
      });
    }, root);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <section className="video-feature" ref={root}>
      <div className="video-feature__frame">
        <Image
          src={siteAssets.videoFeature.poster}
          alt={siteAssets.videoFeature.alt}
          width={3000}
          height={2001}
          sizes="100vw"
          className="video-feature__poster"
        />
      </div>
    </section>
  );
}
