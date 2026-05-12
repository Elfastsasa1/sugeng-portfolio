"use client";

import Image from "next/image";

const philosophies = [
  {
    roman: "I",
    principle: "Systems Over Shortcuts",
    quote:
      "The quality of a system is not measured by its complexity, but by the elegance of its simplest decision.",
    author: "Engineering Doctrine",
  },
  {
    roman: "II",
    principle: "Precision Is Discipline",
    quote:
      "He who masters one thing completely, masters the principle behind all things. Precision is not perfectionism — it is respect for the craft.",
    author: "Code Philosophy",
  },
  {
    roman: "III",
    principle: "Build for Centuries",
    quote:
      "Do not write code for today's requirements. Write architecture for tomorrow's possibilities.",
    author: "System Architecture",
  },
  {
    roman: "IV",
    principle: "Intelligence Amplifies",
    quote:
      "Artificial intelligence is not a replacement for engineering wisdom. It is a weapon in the hands of those who understand systems.",
    author: "AI Engineering",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative bg-obsidian section-padding overflow-hidden"
    >
      {/* Roman numeral bg */}
      <div className="roman-number top-1/2 right-0 -translate-y-1/2 translate-x-1/4">
        III
      </div>

      {/* Background: Greek temple atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555116505-38ab61800975?w=1600&q=70&auto=format&fit=crop"
          alt="Ancient Greek temple columns"
          fill
          className="object-cover object-center"
          style={{
            filter: "brightness(0.06) contrast(1.4) sepia(0.3)",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian" />
        {/* Museum spot */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(198,167,106,0.04) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section III — The Philosophy</span>
        </div>

        <div className="mb-20 reveal-up delay-100">
          <h2 className="headline-large text-ivory">
            Ancient Wisdom,
            <br />
            <span className="text-gold italic">Future Code</span>
          </h2>
        </div>

        {/* Central philosopher image */}
        <div className="relative mb-24 reveal-fade">
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl aspect-[16/7] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=1200&q=85&auto=format&fit=crop"
                alt="Classical marble bust philosopher"
                fill
                className="object-cover object-top"
                style={{
                  filter: "brightness(0.35) contrast(1.3) sepia(0.3)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(198,167,106,0.07) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* Big central quote */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <p
                className="font-display text-ivory/90"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 3.5rem)",
                  lineHeight: 1.2,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                &ldquo;Those who master systems,
                <br />
                shape the future.&rdquo;
              </p>
              <div className="gold-line w-16 mx-auto mt-6" />
              <p className="label-small mt-4">Sugeng Trianto · Engineering Creed</p>
            </div>
          </div>
        </div>

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10">
          {philosophies.map((p, i) => (
            <div
              key={p.roman}
              className="bg-obsidian p-10 md:p-14 relative overflow-hidden reveal-up"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* BG numeral */}
              <span
                className="absolute top-4 right-6 font-display font-light text-gold/[0.04]"
                style={{ fontSize: "8rem", lineHeight: 1 }}
              >
                {p.roman}
              </span>

              <div className="relative z-10">
                <p className="label-small mb-4">{p.author}</p>
                <h3 className="font-display text-2xl md:text-3xl text-gold font-light mb-6">
                  {p.principle}
                </h3>
                <div className="gold-line-left w-8 mb-6" />
                <p className="font-display italic text-stone/70 text-base md:text-lg leading-relaxed">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pillars visual */}
        <div className="mt-24 flex justify-center reveal-up">
          <div className="flex items-end gap-4 md:gap-8">
            {[120, 160, 200, 220, 200, 160, 120].map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1"
              >
                {/* Capital */}
                <div
                  className="w-6 md:w-10 border-t-2 border-x-2 border-gold/20"
                  style={{ height: "8px" }}
                />
                {/* Shaft */}
                <div
                  className="w-3 md:w-5 border-x border-gold/10"
                  style={{ height: `${h * 0.5}px` }}
                />
                {/* Base */}
                <div
                  className="w-6 md:w-10 border-b-2 border-x-2 border-gold/20"
                  style={{ height: "6px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="text-center label-small mt-6 text-stone/30">
          Seven Pillars of Engineering Mastery
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
