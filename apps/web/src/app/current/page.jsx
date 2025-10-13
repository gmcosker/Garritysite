export default function CurrentPage() {
  return (
    <div className="min-h-screen bg-black font-inter">
      {/* Subtle dot pattern background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-12 py-20">
        {/* Header with back link */}
        <div className="mb-20">
          <a
            href="/"
            className="text-white/60 hover:text-white transition-all duration-300 text-xl font-medium tracking-wide"
          >
            ← Garrity McOsker
          </a>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <h1 className="text-white text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            Current
          </h1>

          <div className="space-y-12 max-w-4xl">
            <section>
              <h2 className="text-white text-3xl font-medium mb-6 tracking-wide">
                What I'm Working On
              </h2>
              <p className="text-white/70 text-xl leading-relaxed font-light">
                Currently exploring the intersection of minimal design and
                maximum impact. Building tools that respect both the user's time
                and attention while solving real problems with elegant
                simplicity.
              </p>
            </section>

            <section>
              <h2 className="text-white text-3xl font-medium mb-6 tracking-wide">
                Reading
              </h2>
              <p className="text-white/70 text-xl leading-relaxed font-light">
                Revisiting "The Design of Everyday Things" by Don Norman and
                thinking about how its principles apply to digital experiences.
                Also deep in "A Pattern Language" by Christopher Alexander.
              </p>
            </section>

            <section>
              <h2 className="text-white text-3xl font-medium mb-6 tracking-wide">
                Thinking About
              </h2>
              <p className="text-white/70 text-xl leading-relaxed font-light">
                The paradox of choice in modern software. How can we build
                systems that are powerful yet simple, flexible yet opinionated?
                There's something beautiful about constraints that force
                creativity.
              </p>
            </section>

            <section>
              <h2 className="text-white text-3xl font-medium mb-6 tracking-wide">
                Recently Shipped
              </h2>
              <p className="text-white/70 text-xl leading-relaxed font-light">
                A small web app that helps teams make decisions without endless
                meetings. Sometimes the best solution is the one that gets out
                of your way.
              </p>
            </section>
          </div>

          <div className="pt-12">
            <p className="text-white/40 text-sm font-medium tracking-wider uppercase">
              Last updated: September 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
