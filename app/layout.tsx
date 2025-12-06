import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Likando kayombo",
    template: "%s | likandokayombo",
  },
  description: "My personal blog.",
};

export { useMDXComponents } from "@/mdx.components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="bg-[#121212]">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950  dark:text-zinc-200">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
