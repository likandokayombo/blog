import type { Metadata } from "next";

import localFont from "next/font/local";

import "./globals.css";

// Load custom fonts
const fontH = localFont({
  src: "./fonts/h.woff",
  variable: "--font-h",
});

const fontR = localFont({
  src: "./fonts/r.woff2",
  variable: "--font-r",
});

const fontY = localFont({
  src: "./fonts/y.woff",
  variable: "--font-y",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Welcome to my corner of the internet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html className={`${fontH.variable} ${fontR.variable} ${fontY.variable}`} lang="en">
      <body className="antialiased">

        <main>{children}</main>

      </body>
    </html>

  );
}
