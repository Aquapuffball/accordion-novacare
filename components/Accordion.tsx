"use client";
import { useState } from "react";

export default function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-black transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        aria-expanded={isOpen}
        aria-controls={`answer-${question}`}
      >
        <span>{question}</span>
        <span
          className={`ml-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          id={`answer-${question}`}
          className="pb-4 text-zinc-600 dark:text-zinc-400"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
