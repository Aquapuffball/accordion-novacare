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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <SimpleTitle title={title} />
      {content.map((item) => (
        <Accordion key={item.id} question={item.name} answer={item.text} />
      ))}
    </div>
  );
}
