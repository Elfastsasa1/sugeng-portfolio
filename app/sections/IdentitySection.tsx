"use client";

import Image from "next/image";

const stats = [
  { number: "4+", label: "Years of Precision" },
  { number: "20+", label: "Systems Deployed" },
  { number: "3", label: "Domains Mastered" },
  { number: "∞", label: "Drive to Build" },
];

const attributes = [
  { label: "Role", value: "Fullstack Engineer" },
  { label: "Domains", value: "AI · Blockchain · Web3" },
  { label: "Location", value: "Jakarta, Indonesia" },
  { label: "Focus", value: "Scalable Digital Architecture" },
  { label: "Stack", value: "Next.js · Node · Solidity · TypeScript" },
  { label: "Status", value: "Available for Projects" },
];

export function IdentitySection() {
  return (
    <section
      id="identity"
      className="relative bg-obsidian section-padding overflow-hidden"
    >
      {/* Roman numeral bg */}
      <div className="roman-number top-0 right-0 translate-x-1/4 -translate-y-1/4">
        I
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section I — Digital Identity</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image with museum lighting */}
          <div className="relative reveal-up">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/50 z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/50 z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/50 z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/50 z-10" />

              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop"
                alt="Museum grade marble sculpture"
                fill
                className="object-cover"
                style={{
                  filter: "brightness(0.45) contrast(1.3) sepia(0.25)",
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              {/* Museum spot light */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(198,167,106,0.12) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-6 -right-6 bg-vault border border-gold/20 px-6 py-4">
              <p className="label-small mb-1">Code Philosophy</p>
              <p className="font-display italic text-stone/80 text-sm">
                &ldquo;Precision over speed.
                <br />
                Systems over shortcuts.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — Story */}
          <div className="flex flex-col gap-10">
            <div className="reveal-up">
              <h2 className="headline-large text-ivory mb-6">
                Sugeng
                <br />
                <span className="text-gold italic">Trianto</span>
              </h2>
              <div className="gold-line-left w-16 mb-8" />
            </div>

            <div className="reveal-up delay-200">
              <p className="font-body text-stone/80 text-base md:text-lg leading-relaxed mb-6">
                A builder of scalable digital realities. An engineer obsessed
                with intelligence, automation, and decentralized systems that
                outlive their creators.
              </p>
              <p className="font-body text-stone/60 text-sm md:text-base leading-relaxed">
                Not just writing code — architecting kingdoms. Every system
                deployed carries the weight of deliberate thought, disciplined
                execution, and the relentless pursuit of excellence. From
                smart contracts on Ethereum to AI-driven backends, Sugeng
                operates at the intersection of ancient engineering wisdom
                and future-facing technology.
              </p>
            </div>

            {/* Attributes grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-up delay-300">
              {attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="border-l border-gold/20 pl-4 py-1"
                >
                  <p className="label-small mb-1" style={{ fontSize: "0.6rem" }}>
                    {attr.label}
                  </p>
                  <p className="font-body text-ivory text-sm">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-24 border border-gold/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-10 px-6 reveal-up ${
                i < 3 ? "border-r border-gold/10" : ""
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="stat-number">{stat.number}</span>
              <span className="label-small mt-3 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
