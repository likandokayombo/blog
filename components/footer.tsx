import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-6 text-center text-sm text-white">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-500">Likando Kayombo</span> ·{" "}
        <Link
          href="/changelog"
          className="text-gray-600 underline hover:text-blue-300"
        >
          CHANGELOG
        </Link>
      </p>
    </footer>
  );
}
