import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("footer", () => {
  it("renders all navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /changelog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source code/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
  });

  it("displays current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });
});
