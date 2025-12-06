export default function Footer() {
  return (
    <footer className="w-full py-4 text-center">
      <span className="text-white">
        © {new Date().getFullYear()} All rights reserved. Made by{" "}
      </span>
      <span className="text-red-500 underline">Likando Kayombo</span>
    </footer>
  );
}
