import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";

import { ConvexClientProvider } from "@app/convex-client-provider";
import Footer from "@components/footer";
import Navbar from "@components/navbar";

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

export { useMDXComponents } from "@lib/mdx.components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={zalando.className}>
      <body className="bg-[#fefefe] antialiased mb-0 min-h-screen">
        {/* Content-driven layout */}
        <div className="flex flex-col">
          <Navbar />

          <main className="w-full max-w-[60ch] mx-auto px-4 py-8">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
