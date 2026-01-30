export interface Accordion {
  title: string;
  id: string;
  internalName: string;
  accordionItems: AccordionItem[];
}

export interface AccordionItem {
  id: string;
  name: string;
  text: string;
}
