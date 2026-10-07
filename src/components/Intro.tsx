"use client";

import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  const [isExploding, setIsExploding] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const finishIntro = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;

    setIsExploding(true);

    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = "";
    }, 900);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 3) {
        video.pause();
        finishIntro();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    video.play().catch(() => {
      finishIntro();
    });

    return () => {
      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`intro ${
        isExploding ? "intro--explode" : ""
      }`}
    >
      <video
        ref={videoRef}
        className="intro__video"
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/assets/brand/logo-animation.mp4"
          type="video/mp4"
        />
      </video>

      <button
        type="button"
        className="intro__skip"
        onClick={finishIntro}
      >
        Entrar
      </button>
    </div>
  );
}