"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { trackEvent } from "@/lib/tracking";
import { DIAGNOSTIC_QUESTIONS } from "./data";
import DiagnosticProgress from "./DiagnosticProgress";
import DiagnosticIntroScreen from "./DiagnosticIntroScreen";
import DiagnosticQuestionScreen from "./DiagnosticQuestionScreen";
import DiagnosticLeadForm, { type LeadData } from "./DiagnosticLeadForm";
import DiagnosticResult from "./DiagnosticResult";

const TOTAL_QUESTIONS = DIAGNOSTIC_QUESTIONS.length;
const INTRO_STEP = 0;
const LEAD_STEP = TOTAL_QUESTIONS + 1;
const RESULT_STEP = TOTAL_QUESTIONS + 2;

export default function DiagnosticoFlow() {
  const [stepIndex, setStepIndex] = useState(INTRO_STEP);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [, setLead] = useState<LeadData | null>(null);
  const [progressStep, setProgressStep] = useState(INTRO_STEP);
  const screenWrapRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef(false);

  const isQuestionStep = stepIndex >= 1 && stepIndex <= TOTAL_QUESTIONS;
  const progressPhase = progressStep === INTRO_STEP
    ? "intro"
    : progressStep <= TOTAL_QUESTIONS
      ? "question"
      : progressStep === LEAD_STEP
        ? "lead"
        : "result";

  useLayoutEffect(() => {
    const root = screenWrapRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".diagnostic__screen", { autoAlpha: 1, y: 0, clipPath: "none" });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".diagnostic__revealTitle", { yPercent: 105 }, { yPercent: 0, duration: 0.55 }, 0)
        .fromTo(".diagnostic__back", { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.28 }, 0.04)
        .fromTo(".diagnostic__revealText", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.05 }, 0.14)
        .fromTo(".diagnostic__revealOption", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.035 }, 0.1)
        .fromTo(".diagnostic__revealField", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.055 }, 0.16)
        .fromTo(".diagnostic__revealTheme", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.06 }, 0.2)
        .fromTo(".diagnostic__revealAction", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.28)
        .fromTo(".diagnostic__revealMeta", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.34);

      timeline.eventCallback("onComplete", () => {
        root.querySelector<HTMLElement>(".diagnostic__title")?.focus({ preventScroll: true });
      });
    }, root);

    transitionRef.current = false;
    return () => context.revert();
  }, [stepIndex]);

  function transitionTo(nextStep: number, direction: "forward" | "back" = "forward", hold = 0) {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setProgressStep(nextStep);

    const screen = screenWrapRef.current?.querySelector<HTMLElement>(".diagnostic__screen");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!screen || reduceMotion) {
      setStepIndex(nextStep);
      return;
    }

    gsap.to(screen, {
      autoAlpha: 0,
      y: direction === "forward" ? -22 : 18,
      scale: hold ? 0.992 : 1,
      duration: 0.26,
      ease: "power2.in",
      onComplete: () => {
        window.setTimeout(() => setStepIndex(nextStep), hold);
      },
    });
  }

  function handleStart() {
    trackEvent("diagnostic_start");
    transitionTo(1);
  }

  function handleAnswer(questionIndex: number, selected: string[]) {
    const question = DIAGNOSTIC_QUESTIONS[questionIndex];

    setAnswers((prev) => ({ ...prev, [question.id]: selected }));

    trackEvent("diagnostic_step", {
      step: questionIndex + 1,
      question: question.id,
      answer: selected,
    });

    transitionTo(questionIndex + 2);
  }

  function handleBack() {
    transitionTo(Math.max(INTRO_STEP, stepIndex - 1), "back");
  }

  function handleLeadSubmit(data: LeadData) {
    // TODO: integrar com Supabase/CRM para persistir o lead e as respostas do diagnóstico.
    setLead(data);

    trackEvent("diagnostic_lead_submit");
    trackEvent("diagnostic_complete");

    transitionTo(RESULT_STEP, "forward", 260);
  }

  return (
    <div className="diagnostic">
      <Link href="/" className="diagnostic__brand" aria-label="Origami Investimentos">
        <Image
          src="/assets/brand/logo-horizontal.png"
          alt="Origami Investimentos"
          width={160}
          height={37}
        />
      </Link>

      <DiagnosticProgress
        current={Math.min(Math.max(progressStep, 0), TOTAL_QUESTIONS)}
        total={TOTAL_QUESTIONS}
        phase={progressPhase}
      />

      <div className="diagnostic__stage">
        <div className="diagnostic__screenWrap" key={stepIndex} ref={screenWrapRef}>
          {stepIndex === INTRO_STEP && (
            <DiagnosticIntroScreen onStart={handleStart} />
          )}

          {isQuestionStep &&
            (() => {
              const questionIndex = stepIndex - 1;
              const question = DIAGNOSTIC_QUESTIONS[questionIndex];

              return (
                <DiagnosticQuestionScreen
                  question={question}
                  initialSelected={answers[question.id] ?? []}
                  onAnswer={(selected) => handleAnswer(questionIndex, selected)}
                  onBack={handleBack}
                />
              );
            })()}

          {stepIndex === LEAD_STEP && (
            <DiagnosticLeadForm onSubmit={handleLeadSubmit} onBack={handleBack} />
          )}

          {stepIndex === RESULT_STEP && <DiagnosticResult answers={answers} />}
        </div>
      </div>
    </div>
  );
}
