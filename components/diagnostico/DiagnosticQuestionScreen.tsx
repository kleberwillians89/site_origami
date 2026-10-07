"use client";

import { useEffect, useRef, useState } from "react";
import type { DiagnosticQuestion } from "./data";

const SINGLE_SELECT_DELAY_MS = 280;

type Props = {
  question: DiagnosticQuestion;
  initialSelected: string[];
  onAnswer: (selected: string[]) => void;
  onBack: () => void;
};

export default function DiagnosticQuestionScreen({
  question,
  initialSelected,
  onAnswer,
  onBack,
}: Props) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [isCommitting, setIsCommitting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  function toggleOption(option: string) {
    if (isCommitting) return;

    if (question.multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
      return;
    }

    setSelected([option]);
    setIsCommitting(true);
    timeoutRef.current = window.setTimeout(() => onAnswer([option]), SINGLE_SELECT_DELAY_MS);
  }

  function handleContinue() {
    if (selected.length === 0) return;
    onAnswer(selected);
  }

  return (
    <div className="diagnostic__screen diagnostic__screen--question">
      <button type="button" className="diagnostic__back" onClick={onBack}>
        ← Voltar
      </button>

      <div className="diagnostic__titleMask">
        <h2 className="diagnostic__title diagnostic__revealTitle" tabIndex={-1}>{question.title}</h2>
      </div>

      <div
        className="diagnostic__options"
        role={question.multiple ? "group" : "radiogroup"}
        aria-label={question.title}
      >
        {question.options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              className={`diagnostic__option diagnostic__revealOption${
                isSelected ? " diagnostic__option--selected" : ""
              }`}
              onClick={() => toggleOption(option)}
              disabled={isCommitting}
              role={question.multiple ? "checkbox" : "radio"}
              aria-checked={isSelected}
            >
              <span>{option}</span>
              {question.multiple && (
                <span className="diagnostic__optionMark" aria-hidden="true" />
              )}
              {!question.multiple && (
                <span className="diagnostic__optionArrow" aria-hidden="true">→</span>
              )}
            </button>
          );
        })}
      </div>

      {question.multiple && (
        <button
          type="button"
          className="button button--blue diagnostic__continue"
          onClick={handleContinue}
          disabled={selected.length === 0}
        >
          Continuar <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
