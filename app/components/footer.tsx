import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-gray-800 mt-auto border-t">
      <p>
        © {new Date().getFullYear()}.{" "}
        <span className="text-gray-600">Likando Kayombo</span> ·{" "}
        <Link
          href="/changelog"
          className="text-gray-700 underline decoration-dotted decoration-gray-400"
        >
          CHANGELOG
        </Link>{" "}
        ·{" "}
        <Link
          href="/moodboard"
          className="text-gray-700 underline decoration-dotted decoration-gray-400"
        >
          MOOD BOARD
        </Link>
      </p>
    </footer>
  );
}
