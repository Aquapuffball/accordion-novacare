"use client";

import { AccordionItem } from "@/types/contentful";
import { useState } from "react";
import SimpleTitle from "./SimpleTitle";
import Accordion from "./Accordion";

interface FAQ {
  title: string;
  content: AccordionItem[];
}

export default function FAQ({ title, content }: FAQ) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [multipleOpen, setMultipleOpen] = useState(true);

  const handleOpen = (index: number | null) => {
    setOpenIndex(index);
  };

  const handleMultipleOpenChange = () => {
    // Reset openIndex when switching modes
    setOpenIndex(0);
    setMultipleOpen(!multipleOpen);
  };
  return (
    <div className="mb-8">
      <SimpleTitle title={title} />
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={multipleOpen}
            onChange={handleMultipleOpenChange}
            id="multipleOpen"
            className="w-4 h-4 text-[#fff7ca]"
          />
          <label htmlFor="multipleOpen" className="text-[#fff7ca]">
            Multiple open
          </label>
        </div>
        {content.map((item, index) => (
          <Accordion
            key={item.id}
            question={item.name}
            answer={item.text}
            multipleOpen={multipleOpen}
            onOpen={handleOpen}
            openIndex={openIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
