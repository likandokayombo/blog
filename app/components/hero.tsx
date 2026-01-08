import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full relative bg-background">
      {/* Background Image */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src="/images/background-image.png"
          alt="Hero Background"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 sm:bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-5xl font-bold text-white mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-sm sm:text-lg text-white/90 max-w-xl">
            where I explore posts and stories about web development, UI design,
            and other interesting topics beyond tech.
          </p>
        </div>
      </div>
    </section>
  );
}
