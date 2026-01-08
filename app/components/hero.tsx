export default function Hero() {
  return (
    <section className="w-full flex justify-center py-12 px-4 bg-background">
      <div className="relative w-full max-w-3xl rounded-xl bg-orange-500 bg-gradient-to-r from-orange-500 to-red-500 p-6 sm:p-12 shadow-lg flex flex-col items-center text-center">
        {/* Welcome text */}
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-sm sm:text-base text-white/90">
          Explore posts, tutorials, and stories about web development and UI
          design.
        </p>
      </div>
    </section>
  );
}
