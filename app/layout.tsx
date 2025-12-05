// import type { Metadata } from "next";

// import localFont from "next/font/local";

// import "./globals.css";

// // Load custom fonts
// const fontH = localFont({
//   src: "./fonts/h.woff",
//   variable: "--font-h",
// });

// const fontR = localFont({
//   src: "./fonts/r.woff2",
//   variable: "--font-r",
// });

// const fontY = localFont({
//   src: "./fonts/y.woff",
//   variable: "--font-y",
// });

// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Welcome to my corner of the internet",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (

//     <html className={`${fontH.variable} ${fontR.variable} ${fontY.variable}`} lang="en">
//       <body className="antialiased">

//         <main>{children}</main>

//       </body>
//     </html>

//   );
// }

import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
