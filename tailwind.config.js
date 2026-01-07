/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-instrument-serif)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-departure-mono)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
