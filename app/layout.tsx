import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const zalando = localFont({
  src: [
    { path: "./fonts/h.woff", weight: "400", style: "normal" },
    { path: "./fonts/y.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-zalando",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Likando Kayombo",
  description: "My personal blog.",
  alternates: { canonical: "/" },
};

export { useMDXComponents } from "@/mdx.components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={zalando.className}>
      <body className="bg-[#fefefe] text-black">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            <Navbar />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
