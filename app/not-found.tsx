import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full h-[60vh] flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-white text-6xl font-bold">404</h1>
        <h3 className="mt-4 text-xl text-white">Not Found</h3>
        <p className="mt-2 text-sm text-white">Could not find requested resource</p>
        <Link href="/" className="mt-6 inline-block text-gray-400 hover:text-blue-300">
          Return Home
        </Link>
      </div>
    </section>
  );
}
