import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "../Accordion";

describe("Accordion", () => {
  it("renders question", () => {
    render(<Accordion question="Question" answer="Answer" />);
    expect(screen.getByText("Question")).toBeInTheDocument();
  });

  it("does not show answer initially", () => {
    render(<Accordion question="Question" answer="Hidden answer" />);
    expect(screen.queryByText("Hidden answer")).not.toBeInTheDocument();
  });

  it("toggles open/closed on click, and shows answer when open", async () => {
    const user = userEvent.setup();
    render(<Accordion question="Question" answer="Answer" />);

    const button = screen.getByRole("button");
    expect(screen.queryByText("Answer")).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText("Answer")).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText("Answer")).not.toBeInTheDocument();
  });

  it("respects multipleOpen=false with parent control", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(
      <Accordion
        question="Question"
        answer="Answer"
        multipleOpen={false}
        onOpen={handleOpen}
        openIndex={null}
        index={0}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(handleOpen).toHaveBeenCalledWith(0);
  });

  it("uses local state when multipleOpen=true", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(
      <Accordion
        question="Question"
        answer="Answer"
        multipleOpen={true}
        onOpen={handleOpen}
        openIndex={null}
        index={0}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(handleOpen).not.toHaveBeenCalled();
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });
});
