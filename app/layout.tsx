import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";

import Footer from "@components/footer";
import Navbar from "@components/navbar";

export const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Regular.ttf",
  variable: "--serif",
  display: "swap",
});

export const inter = localFont({
  src: "./fonts/Inter_18pt-Regular.ttf",
  variable: "--font-inter",
  display: "swap",
});

export const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.otf",
  variable: "--mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://blog.likandokayombo.com"),
  keywords: ["Raycast on windows", "UI/UX", "Frontend development", "Likando Kayombo Personal Blog"],
  title: "Likando Kayombo Personal Blog",
  description: "I explore posts and stories about web development, UI design, and other topics i find interesting",

  openGraph: {
    title: "Likando Kayombo Personal Blog",
    description: "I explore posts and stories about web development, UI design, and other topics I find interesting",
    images: ["/opengraph-image.png"],
  },
};

export { useMDXComponents } from "@lib/mdx.components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${departureMono.variable}`}
    >
      <body className="bg-[#181c20] antialiased mb-0 min-h-screen">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
            <Navbar changelog={[]} />
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
