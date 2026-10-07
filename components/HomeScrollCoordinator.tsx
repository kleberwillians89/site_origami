"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeScrollCoordinator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refresh = () => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const pendingMedia = Array.from(
      document.querySelectorAll<HTMLImageElement | HTMLVideoElement>("main img, main video")
    ).filter((element) =>
      element instanceof HTMLImageElement
        ? !element.complete
        : element.readyState < HTMLMediaElement.HAVE_METADATA
    );

    pendingMedia.forEach((element) => {
      const eventName = element instanceof HTMLImageElement ? "load" : "loadedmetadata";
      element.addEventListener(eventName, refresh, { once: true });
    });

    window.addEventListener("origami:intro-complete", refresh);
    window.addEventListener("load", refresh);

    return () => {
      pendingMedia.forEach((element) => {
        const eventName = element instanceof HTMLImageElement ? "load" : "loadedmetadata";
        element.removeEventListener(eventName, refresh);
      });
      window.removeEventListener("origami:intro-complete", refresh);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
