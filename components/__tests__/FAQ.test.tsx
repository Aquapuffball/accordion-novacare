import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "../FAQ";
import type { AccordionItem } from "@/types/contentful";

const mockContent: AccordionItem[] = [
  {
    id: "1",
    name: "Question 1",
    text: "Answer 1",
  },
  {
    id: "2",
    name: "Question 2",
    text: "Answer 2",
  },
];

describe("FAQ", () => {
  it("renders title", () => {
    render(<FAQ title="Test FAQ" content={mockContent} />);
    expect(screen.getByText("Test FAQ")).toBeInTheDocument();
  });

  it("renders all accordion items", () => {
    render(<FAQ title="Test FAQ" content={mockContent} />);
    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
  });

  it("toggles multipleOpen checkbox", async () => {
    const user = userEvent.setup();
    render(<FAQ title="Test FAQ" content={mockContent} />);

    const checkbox = screen.getByLabelText("Multiple open");
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("allows multiple accordions open when multipleOpen is true", async () => {
    const user = userEvent.setup();
    render(<FAQ title="Test FAQ" content={mockContent} />);

    const question1Button = screen.getByRole("button", {
      name: /Question 1/,
    });
    const question2Button = screen.getByRole("button", {
      name: /Question 2/,
    });

    await user.click(question1Button);
    expect(await screen.findByText("Answer 1")).toBeInTheDocument();

    await user.click(question2Button);
    expect(await screen.findByText("Answer 2")).toBeInTheDocument();

    expect(screen.getByText("Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Answer 2")).toBeInTheDocument();
  });

  it("only allows one open when multipleOpen is false", async () => {
    const user = userEvent.setup();
    render(<FAQ title="Test FAQ" content={mockContent} />);

    const checkbox = screen.getByLabelText("Multiple open");
    await user.click(checkbox);

    // Answer 1 is default open with mutipleOpen false
    expect(screen.queryByText("Answer 1")).toBeInTheDocument();

    const question2Button = screen.getByRole("button", {
      name: /Question 2/,
    });

    await user.click(question2Button);
    expect(await screen.findByText("Answer 2")).toBeInTheDocument();
    expect(screen.queryByText("Answer 1")).not.toBeInTheDocument();
  });
});
