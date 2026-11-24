import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Terminal from "../terminal";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

type Post = {
  title: string;
  slug: string;
  content: string;
};

const mockPosts: Post[] = [
  {
    title: "React Basics",
    slug: "react-basics",
    content: "An introduction to building user interfaces.",
  },
  {
    title: "Server Components",
    slug: "server-components",
    content: "A guide to react server components.",
  },
];

const mockChangelog = [
  "Added a terminal for searching posts",
  "Fixed the changelog page layout",
];

type TerminalProps = {
  changelog?: string[];
  visible?: boolean;
  onClose?: () => void;
};

const fetchMock = jest.fn();

function mockPostsResponse(posts: Post[]) {
  fetchMock.mockResolvedValue({ json: () => Promise.resolve(posts) });
}

function renderTerminal({
  changelog = mockChangelog,
  visible = true,
  onClose = jest.fn(),
}: TerminalProps = {}) {
  const utils = render(
    <Terminal changelog={changelog} visible={visible} onClose={onClose} />,
  );

  return { ...utils, onClose };
}

async function renderLoaded(props: TerminalProps = {}) {
  const utils = renderTerminal(props);

  await waitFor(() => {
    expect(screen.queryByText("Loading posts...")).not.toBeInTheDocument();
  });

  return utils;
}

function getInput() {
  return screen.getByPlaceholderText("Type a command...");
}

function type(value: string) {
  fireEvent.change(getInput(), { target: { value } });
}

function run(value: string) {
  const input = getInput();
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(input, { key: "Enter" });
}

beforeEach(() => {
  mockPush.mockReset();
  localStorage.clear();
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({ json: () => Promise.resolve(mockPosts) });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe("terminal", () => {
  describe("visibility", () => {
    it("renders nothing and skips fetching when hidden", () => {
      const { container } = renderTerminal({ visible: false });

      expect(container).toBeEmptyDOMElement();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("renders the prompt and header when visible", () => {
      renderTerminal();

      expect(getInput()).toBeInTheDocument();
      expect(screen.getByText(/q to close or esc, clear/i)).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "Terminal" })).toBeInTheDocument();
    });

    it("focuses the input when it becomes visible", async () => {
      const { rerender, onClose } = renderTerminal({ visible: false });

      rerender(<Terminal changelog={mockChangelog} visible onClose={onClose} />);

      expect(getInput()).toHaveFocus();
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    });

    it("fetches posts only once after they are loaded", async () => {
      const { rerender, onClose } = await renderLoaded();

      rerender(<Terminal changelog={mockChangelog} visible onClose={onClose} />);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("reports fetch failures without breaking the terminal", async () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      fetchMock.mockRejectedValue(new Error("network down"));

      renderTerminal();

      await waitFor(() => expect(consoleError).toHaveBeenCalled());

      run("posts react");

      expect(screen.getByText("Try again in a moment")).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });

  describe("closing", () => {
    it("closes when Escape is pressed", () => {
      const { onClose } = renderTerminal();

      fireEvent.keyDown(getInput(), { key: "Escape" });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when the close button is clicked", () => {
      const { onClose } = renderTerminal();

      fireEvent.click(screen.getByRole("button", { name: "✕" }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when the exit command is run", () => {
      const { onClose } = renderTerminal();

      run("exit");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when the q command is run", () => {
      const { onClose } = renderTerminal();

      run("q");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("help and clear", () => {
    it("echoes the command and prints the available commands", () => {
      renderTerminal();

      run("help");

      expect(screen.getByText("$ help")).toBeInTheDocument();
      expect(screen.getByText("Available commands:")).toBeInTheDocument();
      expect(screen.getByText(/posts <keyword>/)).toBeInTheDocument();
      expect(screen.getByText(/changelog <keyword>/)).toBeInTheDocument();
    });

    it("clears previous output", () => {
      renderTerminal();

      run("help");
      expect(screen.getByText("Available commands:")).toBeInTheDocument();

      run("clear");

      expect(screen.queryByText("Available commands:")).not.toBeInTheDocument();
      expect(screen.queryByText("$ help")).not.toBeInTheDocument();
      expect(getInput()).toBeInTheDocument();
    });

    it("ignores empty commands", () => {
      renderTerminal();

      run("   ");

      expect(screen.queryByText(/^\$ /)).not.toBeInTheDocument();
      expect(getInput()).toHaveValue("");
    });

    it("treats commands case-insensitively", async () => {
      await renderLoaded();

      run("HELP");

      expect(screen.getByText("Available commands:")).toBeInTheDocument();
    });
  });

  describe("posts command", () => {
    it("asks for a keyword when none is provided", async () => {
      await renderLoaded();

      run("posts");

      expect(screen.getByText("Usage: posts <keyword>")).toBeInTheDocument();
      expect(screen.getByText("Example: posts react")).toBeInTheDocument();
    });

    it("lists title matches and opens a post on click", async () => {
      mockPostsResponse([
        {
          title: "React Basics",
          slug: "react-basics",
          content: "Unrelated content",
        },
      ]);
      await renderLoaded();

      run("posts react");

      expect(screen.getByText("Found 1 post for \"react\":")).toBeInTheDocument();

      const match = screen.getByRole("button", { name: /React Basics/ });

      expect(match).not.toHaveTextContent("[content match]");
      expect(screen.getByText("React")).toHaveClass("text-yellow-300");

      fireEvent.click(match);

      expect(mockPush).toHaveBeenCalledWith("/blog/react-basics");
    });

    it("lists content matches with a snippet", async () => {
      mockPostsResponse([
        {
          title: "Server Components",
          slug: "server-components",
          content: "A guide to react server components.",
        },
      ]);
      await renderLoaded();

      run("posts react");

      const match = screen.getByRole("button", { name: /Server Components/ });

      expect(match).toHaveTextContent("[content match]");
      expect(match.parentElement).toHaveTextContent(
        "A guide to react server components.",
      );
      expect(screen.getByText("react")).toHaveClass("text-yellow-300");
    });

    it("reports when no posts match", async () => {
      await renderLoaded();

      run("posts svelte");

      expect(screen.getByText("No posts found for \"svelte\"")).toBeInTheDocument();
    });

    it("asks the user to retry while posts are loading", () => {
      fetchMock.mockReturnValue(new Promise(() => {}));
      renderTerminal();

      run("posts react");

      expect(screen.getAllByText("Loading posts...").length).toBeGreaterThan(0);
      expect(screen.getByText("Try again in a moment")).toBeInTheDocument();
    });
  });

  describe("open command", () => {
    it("opens a post by slug and closes the terminal", async () => {
      const { onClose } = await renderLoaded();

      run("open react-basics");

      expect(mockPush).toHaveBeenCalledWith("/blog/react-basics");
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("opens a post by title", async () => {
      const { onClose } = await renderLoaded();

      run("open react basics");

      expect(mockPush).toHaveBeenCalledWith("/blog/react-basics");
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("reports a missing post without closing", async () => {
      const { onClose } = await renderLoaded();

      run("open svelte");

      expect(screen.getByText("Post not found")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });

    it("asks for a slug or title when none is provided", async () => {
      await renderLoaded();

      run("open");

      expect(screen.getByText("Usage: open <slug|title>")).toBeInTheDocument();
      expect(
        screen.getByText("Example: open react-server-components"),
      ).toBeInTheDocument();
    });
  });

  describe("changelog command", () => {
    it("asks for a keyword when none is provided", () => {
      renderTerminal();

      run("changelog");

      expect(screen.getByText("Usage: changelog <keyword>")).toBeInTheDocument();
    });

    it("lists matching entries with highlights", () => {
      renderTerminal({ changelog: ["Added a dark mode feature"] });

      run("changelog feature");

      expect(screen.getByText("Found 1 entry:")).toBeInTheDocument();
      expect(screen.getByText("feature")).toHaveClass("text-yellow-300");
    });

    it("pluralises the match count", () => {
      renderTerminal({ changelog: ["Added a feature", "Fixed the feature"] });

      run("changelog feature");

      expect(screen.getByText("Found 2 entries:")).toBeInTheDocument();
    });

    it("reports when no entries match", () => {
      renderTerminal();

      run("changelog zzz");

      expect(
        screen.getByText("No changelog entries found for \"zzz\""),
      ).toBeInTheDocument();
    });
  });

  describe("auto search", () => {
    it("searches posts when the input is not a command", async () => {
      await renderLoaded();

      run("react basics");

      expect(
        screen.getByText("Found 1 post for \"react basics\":"),
      ).toBeInTheDocument();
    });

    it("reports when nothing matches", async () => {
      await renderLoaded();

      run("svelte");

      expect(screen.getByText("No posts found for \"svelte\"")).toBeInTheDocument();
    });
  });

  describe("history", () => {
    it("persists executed commands to localStorage", () => {
      renderTerminal();

      run("help");

      expect(
        JSON.parse(localStorage.getItem("terminal-history") as string),
      ).toEqual(["help"]);
    });

    it("restores history from localStorage", () => {
      localStorage.setItem("terminal-history", JSON.stringify(["clear"]));
      renderTerminal();

      fireEvent.keyDown(getInput(), { key: "ArrowUp" });

      expect(getInput()).toHaveValue("clear");
    });

    it("keeps the last 50 commands", async () => {
      const seeded = Array.from({ length: 60 }, (_, i) => `command-${i}`);
      localStorage.setItem("terminal-history", JSON.stringify(seeded));

      renderTerminal();

      await waitFor(() => {
        const stored = JSON.parse(
          localStorage.getItem("terminal-history") as string,
        ) as string[];

        expect(stored).toHaveLength(50);
        expect(stored[0]).toBe("command-10");
        expect(stored[49]).toBe("command-59");
      });
    });

    it("cycles through history with the arrow keys", () => {
      renderTerminal();

      run("help");
      run("posts");

      const input = getInput();

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input).toHaveValue("posts");

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input).toHaveValue("help");

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input).toHaveValue("help");

      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input).toHaveValue("posts");

      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input).toHaveValue("");

      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input).toHaveValue("");
    });

    it("ignores ArrowUp when there is no history", () => {
      renderTerminal();

      fireEvent.keyDown(getInput(), { key: "ArrowUp" });

      expect(getInput()).toHaveValue("");
    });
  });

  describe("suggestions", () => {
    it("suggests commands matching the typed prefix", () => {
      renderTerminal();

      type("ch");

      expect(screen.getByText("changelog")).toBeInTheDocument();
      expect(screen.queryByText("posts")).not.toBeInTheDocument();
    });

    it("fills the input when a suggestion is clicked", () => {
      renderTerminal();

      type("op");
      fireEvent.click(screen.getByText("open"));

      expect(getInput()).toHaveValue("open ");
    });

    it("hides suggestions when the input is emptied", () => {
      renderTerminal();

      type("ch");
      expect(screen.getByText("changelog")).toBeInTheDocument();

      type("");

      expect(screen.queryByText("changelog")).not.toBeInTheDocument();
    });

    it("shows no suggestions for unknown input", () => {
      renderTerminal();

      type("zzz");

      expect(screen.queryByText("posts")).not.toBeInTheDocument();
      expect(screen.queryByText("changelog")).not.toBeInTheDocument();
    });
  });
});
