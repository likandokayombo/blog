import Link from "next/link";

export default function Footer() {
  return (
    <footer className="aboslute bottom-2 left-0 w-full py-6 text-center text-sm text-gray-800">
      <p>
        © {new Date().getFullYear()}.{" "}
        <span className="text-gray-600">Likando Kayombo</span>·{" "}
        <Link
          href="/changelog"
          className="text-gray-700 underline decoration-dotted decoration-gray-400"
        >
          CHANGELOG
        </Link>
      </p>
    </footer>
  );
}
