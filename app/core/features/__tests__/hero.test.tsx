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

  it("renders the section with expected container classes", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");

    expect(section).toHaveClass("min-h-0");
    expect(section).toHaveClass("md:min-h-screen");
    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("items-center");
    expect(section).toHaveClass("justify-center");
    expect(section).toHaveClass("mt-[70px]");
    expect(section).toHaveClass("mb-[60px]");
    expect(section).toHaveClass("md:mt-[7px]");
    expect(section).toHaveClass("md:mb-[15px]");
  });

  it("renders the heading container with expected classes", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    const headingContainer = heading.parentElement;

    expect(headingContainer).toHaveClass("max-w-4xl");
    expect(headingContainer).toHaveClass("mx-auto");
    expect(headingContainer).toHaveClass("text-center");
    expect(headingContainer).toHaveClass("md:text-center");
  });

  it("renders the paragraph with expected classes", () => {
    render(<Hero />);

    const paragraph = screen.getByText(/hello, i'?m likando/i);

    expect(paragraph).toHaveClass("mt-9");
    expect(paragraph).toHaveClass("text-lg");
    expect(paragraph).toHaveClass("text-[#8c92a4]");
    expect(paragraph).toHaveClass("max-w-xl");
    expect(paragraph).toHaveClass("mx-auto");
    expect(paragraph).toHaveClass("leading-relaxed");
  });

  it("renders the h1 with line break", () => {
    render(<Hero />);

    const h1 = screen.getByRole("heading", { level: 1, name: /learning is a process/i });

    expect(h1).toHaveTextContent("Learning is");
    expect(h1).toHaveTextContent("a process");
    expect(h1.querySelector("br")).toBeInTheDocument();
  });

  it("renders the paragraph with web development mention", () => {
    render(<Hero />);

    const intro = screen.getByText(/hello, i'?m likando/i);

    expect(intro).toHaveTextContent("web development");
    expect(intro).toHaveTextContent("stories");
    expect(intro).toHaveTextContent("interesting");
  });

  it("has accessibility-friendly structure", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    const heading = screen.getByRole("heading", { level: 1 });
    const paragraph = screen.getByText(/hello, i'?m likando/i);

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

    // Verify heading comes before paragraph in the DOM
    expect(heading.compareDocumentPosition(paragraph) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
