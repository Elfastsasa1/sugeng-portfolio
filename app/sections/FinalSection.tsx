"use client";

import Image from "next/image";

export function FinalSection() {
  return (
    <section
      id="final"
      className="relative bg-obsidian overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background statue — full bleed */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?w=1600&q=80&auto=format&fit=crop"
          alt="Majestic marble sculpture in museum"
          fill
          className="object-cover object-center"
          style={{
            filter: "brightness(0.15) contrast(1.3) sepia(0.25)",
          }}
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian" />
        {/* Museum spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(198,167,106,0.06) 0%, transparent 100%)",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette" />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen section-padding text-center">
        {/* Roman numeral */}
        <div className="mb-8 reveal-up">
          <span className="label-small">Section VII — Final Impact</span>
        </div>

        {/* Massive closing statement */}
        <div className="mb-12">
          <div className="overflow-hidden mb-1 reveal-up">
            <h2
              className="font-display font-light text-stone/40"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              Some build
            </h2>
          </div>
          <div className="overflow-hidden mb-1 reveal-up delay-100">
            <h2
              className="font-display font-light text-stone/60"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              websites.
            </h2>
          </div>
          <div className="overflow-hidden mb-1 reveal-up delay-200">
            <h2
              className="font-display font-light text-ivory/70"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              Others build
            </h2>
          </div>
          <div className="overflow-hidden mb-1 reveal-up delay-300">
            <h2
              className="font-display font-light text-ivory"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              systems.
            </h2>
          </div>
          <div className="overflow-hidden reveal-up delay-400">
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "var(--gold)",
              }}
            >
              A few build
            </h2>
          </div>
          <div className="overflow-hidden reveal-up delay-500">
            <h2
              className="font-display italic"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "var(--gold)",
                fontWeight: 300,
              }}
            >
              futures.
            </h2>
          </div>
        </div>

        {/* Gold separator */}
        <div className="gold-line w-24 mx-auto mb-10 reveal-up delay-500" />

        {/* Attribution */}
        <p className="font-display italic text-stone/50 text-lg mb-12 reveal-up delay-600">
          Sugeng Trianto belongs to the few.
        </p>

        {/* CTA */}
        <div className="reveal-up delay-700">
          <a
            href="mailto:elfastsasa8@gmail.com"
            className="btn-gold text-sm"
            style={{ padding: "1.2rem 3rem" }}
          >
            <span>Enter The Future</span>
          </a>
        </div>

        {/* Footer bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-4">
          <span className="label-small text-stone/30" style={{ fontSize: "0.55rem" }}>
            © 2024 Sugeng Trianto — All systems reserved
          </span>
          <span
            className="font-display italic text-stone/20 text-sm"
          >
            Designed with ancient wisdom.
            <br className="md:hidden" /> Built with future code.
          </span>
          <span className="label-small text-stone/30" style={{ fontSize: "0.55rem" }}>
            Jakarta, Indonesia
          </span>
        </div>
      </div>
    </section>
  );
}
