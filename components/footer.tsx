import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-6 text-center text-sm text-white">
      <p>
        © {new Date().getFullYear()} All rights reserved. Made by{" "}
        <span className="text-red-500 underline">Likando Kayombo</span>
      </p>

      <p className="mt-2">
        <Link
          href="/changelog"
          className="text-white underline hover:text-blue-300"
        >
          Changelog
        </Link>
      </p>
    </footer>
  );
}
