import Link from "next/link";

// Inline your local open_in_new.svg
function OpenInNewIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" // <-- makes Tailwind color work
      className={`h-3.5 w-3.5 ${className}`}
      aria-hidden="true"
    >
      {/* Copy the paths from your open_in_new.svg */}
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
      <path d="M5 5h6V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6h-2v6H5V5z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Home", href: "/" },
    { label: "Changelog", href: "/changelog" },
    {
      label: "Source Code",
      href: "https://github.com/likandokayombo",
      external: true,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      external: true,
    },
  ];

  return (
    <footer className="mt-auto w-full border-t border-gray-800 px-6 py-12 text-gray-400">
      <div className="mx-auto max-w-6xl">
        <h3 className="text-lg font-bold text-white">Links</h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {links.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              className="group"
            >
              <h4 className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white">
                {label}

                {(external || label === "Changelog") && (
                  <OpenInNewIcon className="ml-1 text-gray-400 opacity-70 group-hover:text-white group-hover:opacity-100" />
                )}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 mr-50 text-xs text-gray-500">
        © {year}. <span className="text-gray-400">Likando Kayombo</span>
      </div>
    </footer>
  );
}
