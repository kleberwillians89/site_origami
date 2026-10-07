"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const TRANSITION_MS = 900;
const MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";

// ---------------------------------------------------------------------------
// Desktop — untouched behavior: <video>, same timing, same CSS-driven
// scale/blur/fade explosion.
// ---------------------------------------------------------------------------
const EXPLODE_MS = 3;
const LOAD_GRACE_MS = 800;
const FALLBACK_HOLD_MS = 500;
const DESKTOP_ABSOLUTE_TIMEOUT_MS = 3000;

function DesktopIntroMedia({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const fallbackTriggeredRef = useRef(false);

  const [isExploding, setIsExploding] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);

  const finishIntro = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    videoRef.current?.pause();
    setIsExploding(true);
    window.setTimeout(onFinish, TRANSITION_MS);
  };

  const triggerFallback = () => {
    if (fallbackTriggeredRef.current || finishedRef.current) return;
    fallbackTriggeredRef.current = true;

    videoRef.current?.pause();
    setMediaFailed(true);
    window.setTimeout(finishIntro, FALLBACK_HOLD_MS);
  };

  useEffect(() => {
    const absoluteTimeout = window.setTimeout(finishIntro, DESKTOP_ABSOLUTE_TIMEOUT_MS);
    const video = videoRef.current;

    if (!video) {
      triggerFallback();
      return () => window.clearTimeout(absoluteTimeout);
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.currentTime = 0;

    const loadGraceTimeout = window.setTimeout(() => {
      if (video.paused || video.readyState < 2) triggerFallback();
    }, LOAD_GRACE_MS);

    const handleTimeUpdate = () => {
      if (video.currentTime >= EXPLODE_MS) finishIntro();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", finishIntro);
    video.addEventListener("error", triggerFallback);

    video.play()?.catch(triggerFallback);

    return () => {
      window.clearTimeout(absoluteTimeout);
      window.clearTimeout(loadGraceTimeout);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", finishIntro);
      video.removeEventListener("error", triggerFallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`intro${isExploding ? " intro--explode" : ""}`}>
      {mediaFailed ? (
        <Image
          src="/assets/brand/logo-primary.png"
          alt="Origami Investimentos"
          width={220}
          height={81}
          priority
          className="intro__media intro__media--fallback"
        />
      ) : (
        <video
          ref={videoRef}
          className="intro__media"
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        >
          <source src="/assets/brand/logo-animation-white.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile — no <video>, no autoplay. iOS Low Power Mode blocks <video>
// autoplay even when muted+playsInline, so the mobile path never attempts
// it at all: an animated WebP (looping, no media events required) driven
// entirely by known timers, exploded via GSAP.
// ---------------------------------------------------------------------------
const MOBILE_SHOW_MS = 3000;
const MOBILE_ABSOLUTE_TIMEOUT_MS = 3400;
const MOBILE_REDUCED_MOTION_HOLD_MS = 500;

function MobileIntroMedia({ onFinish }: { onFinish: () => void }) {
  const finishedRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);

  const [imageFailed, setImageFailed] = useState(false);
  const [prefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const finishIntro = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (prefersReducedMotion) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.out",
        onComplete: onFinish,
      });
      return;
    }

    const tl = gsap.timeline({ onComplete: onFinish });
    tl.set(overlayRef.current, { pointerEvents: "none" }, 0);
    if (mediaRef.current) {
      tl.to(
        mediaRef.current,
        { scale: 16, filter: "blur(8px)", duration: TRANSITION_MS / 1000, ease: "power2.in" },
        0
      );
    }
    tl.to(overlayRef.current, { opacity: 0, duration: TRANSITION_MS / 1000, ease: "power2.in" }, 0);
  };

  useEffect(() => {
    // Deliberately NOT tied to any image load/animation-end event — the
    // whole point is that the Home ships on known timing, regardless of
    // whether the asset ever renders a single frame.
    const showMs = prefersReducedMotion ? MOBILE_REDUCED_MOTION_HOLD_MS : MOBILE_SHOW_MS;
    const showTimer = window.setTimeout(finishIntro, showMs);
    const absoluteTimeout = window.setTimeout(finishIntro, MOBILE_ABSOLUTE_TIMEOUT_MS);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(absoluteTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showStatic = imageFailed || prefersReducedMotion;

  return (
    <div ref={overlayRef} className="intro intro--mobile">
      {showStatic ? (
        <Image
          ref={mediaRef}
          src="/assets/brand/logo-primary.png"
          alt="Origami Investimentos"
          width={220}
          height={81}
          priority
          className="intro__mobileMedia intro__mobileMedia--fallback"
        />
      ) : (
        <Image
          ref={mediaRef}
          src="/assets/brand/logo-animation-mobile.webp"
          alt="Origami Investimentos"
          width={720}
          height={1280}
          priority
          unoptimized
          className="intro__mobileMedia"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root — decides platform once (client-only, SSR-safe: renders nothing
// until measured, avoiding any hydration mismatch), owns the scroll lock,
// and mounts the Home from the very first frame regardless (Intro is only
// ever a sibling overlay in app/page.tsx, never a gate around it).
// ---------------------------------------------------------------------------
export default function Intro() {
  const finishedRef = useRef(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setIsMobile(window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setIsFinished(true);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("origami:intro-complete"));
  };

  if (isFinished) return null;
  if (isMobile === null) return null;

  return isMobile ? (
    <MobileIntroMedia onFinish={handleFinish} />
  ) : (
    <DesktopIntroMedia onFinish={handleFinish} />
  );
}
