import { render, screen } from "@testing-library/react";
import Hero from "../hero";

describe("hero", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /learning is a process/i }),
    ).toBeInTheDocument();
  });

  it("renders the intro paragraph", () => {
    render(<Hero />);

    const intro = screen.getByText(/hello, i'?m likando/i);

    expect(intro).toBeInTheDocument();
    expect(intro.tagName).toBe("P");
    expect(intro).toHaveTextContent(/web development/i);
  });

  it("renders only one top-level heading", () => {
    render(<Hero />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the heading before the intro paragraph", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    const intro = screen.getByText(/hello, i'?m likando/i);

    expect(
      heading.compareDocumentPosition(intro) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
