"use client";
import { useState, useEffect } from "react";

export default function Accordion({
  question,
  answer,
  multipleOpen = true,
  onOpen,
  openIndex,
  index,
}: {
  question: string;
  answer: string;
  multipleOpen?: boolean;
  onOpen?: (index: number | null) => void;
  openIndex?: number | null;
  index?: number;
}) {
  /*
    Accordion component that allows for multiple open accordions or only one open accordion. 
    If only one open accordion is allowed, this should be controlled by the parent component.
    Defaults to multipleOpen=true (each accordion manages its own state).
  */
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!multipleOpen) {
      setIsOpen(false);
    }
  }, [multipleOpen]);

  // Determine if this accordion is open
  // If multipleOpen is true OR if parent control props are not provided, use local state
  // Otherwise, use parent-controlled state
  const isCurrentlyOpen =
    multipleOpen || !onOpen || openIndex === undefined || index === undefined
      ? isOpen
      : openIndex === index;

  const handleClick = () => {
    // If multipleOpen is true OR parent control props are not provided, use local state. Else use parent-controlled state.
    if (
      multipleOpen ||
      !onOpen ||
      openIndex === undefined ||
      index === undefined
    ) {
      setIsOpen(!isOpen);
    } else {
      onOpen(openIndex === index ? null : index);
    }
  };

  return (
    <div className="bg-[#0BA7EB] rounded-lg overflow-hidden">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between py-5 px-6 text-left font-semibold text-white transition-colors hover:text-white/80"
        aria-expanded={isCurrentlyOpen}
        aria-controls={`answer-${question}`}
      >
        <span className="text-lg">{question}</span>
        <span
          className={`ml-4 text-xl transform transition-transform duration-200 shrink-0 ${
            isCurrentlyOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isCurrentlyOpen && (
        <div
          id={`answer-${question}`}
          className="px-6 pb-5 text-base text-white leading-relaxed"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
