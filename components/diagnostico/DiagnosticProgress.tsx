"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  current: number;
  total: number;
  phase: "intro" | "question" | "lead" | "result";
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function getProgress(current: number, total: number, phase: Props["phase"]) {
  if (phase === "intro") return 5;
  if (phase === "lead" || phase === "result") return 100;
  return Math.round(8 + (current / total) * 80);
}

export default function DiagnosticProgress({ current, total, phase }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const percent = getProgress(current, total, phase);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const scope = path.parentElement;
    if (!scope) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 100 - percent,
        duration: reduceMotion ? 0 : phase === "result" ? 0.32 : 0.48,
        ease: "power2.inOut",
      });

      if (phase === "result" && !reduceMotion) {
        gsap.fromTo(path, { opacity: 0.58 }, { opacity: 1, duration: 0.36, ease: "power2.out" });
      }
    }, scope);

    return () => context.revert();
  }, [percent, phase]);

  return (
    <div
      className={`diagnostic__progress diagnostic__progress--${phase}`}
      role="progressbar"
      aria-label="Progresso do diagnóstico"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="diagnostic__progressTrack"
          d="M-30 112 C 180 102, 280 42, 480 68 S 760 142, 930 80 S 1190 22, 1470 50"
          pathLength="100"
        />
        <path
          ref={pathRef}
          className="diagnostic__progressPath"
          d="M-30 112 C 180 102, 280 42, 480 68 S 760 142, 930 80 S 1190 22, 1470 50"
          pathLength="100"
          style={{ strokeDashoffset: 100 - percent }}
        />
      </svg>

      {phase !== "intro" && phase !== "result" && (
        <div className="diagnostic__progressLabel">
          {pad(Math.min(current, total))} / {pad(total)}
        </div>
      )}
    </div>
  );
}
