"use client";

import Image from "next/image";

const achievements = [
  {
    id: "01",
    title: "Certificate of Graduation",
    issuer: "Superchain Eco",
    program: "Superchain Engineering Program",
    year: "2024",
    description:
      "Awarded upon completion of the rigorous Superchain Ecosystem engineering track. Demonstrates mastery of Layer 2 architecture, OP Stack development, and cross-chain interoperability patterns.",
    credential: "Blockchain · Layer 2 · OP Stack",
    badge: "◈",
    rarity: "Elite Certification",
  },
  {
    id: "02",
    title: "Contributor Essentials",
    issuer: "Optimism",
    program: "Season 6 — Governance & Protocol",
    year: "2024",
    description:
      "Recognized as an active contributor to the Optimism protocol ecosystem in Season 6. Contributed to governance processes, tooling development, and the collective mission of decentralized public goods infrastructure.",
    credential: "Optimism · Governance · Open Source",
    badge: "◉",
    rarity: "Protocol Contributor",
  },
];

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative bg-obsidian section-padding overflow-hidden"
    >
      {/* Roman numeral */}
      <div className="roman-number top-0 left-0 -translate-x-1/4 -translate-y-1/4">
        V
      </div>

      {/* Background statue */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&q=70&auto=format&fit=crop"
            alt="Classical marble statue"
            fill
            className="object-cover object-left"
            style={{
              filter: "brightness(0.12) contrast(1.4) sepia(0.3)",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 100%)",
            }}
            sizes="33vw"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section V — Achievements</span>
        </div>

        <div className="mb-20 reveal-up delay-100">
          <h2 className="headline-large text-ivory">
            Seals of
            <br />
            <span className="text-gold italic">Recognition</span>
          </h2>
          <p className="font-body text-stone/60 text-base mt-6 max-w-lg">
            Not collected for vanity. Earned through discipline, contribution,
            and the willingness to operate at the frontier of emerging
            technology.
          </p>
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, i) => (
            <div
              key={achievement.id}
              className="museum-card p-10 md:p-12 relative overflow-hidden reveal-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* BG number */}
              <span
                className="absolute bottom-4 right-6 font-display font-light text-gold/[0.035]"
                style={{ fontSize: "10rem", lineHeight: 1 }}
              >
                {achievement.id}
              </span>

              {/* Top row */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center border border-gold/30"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(198,167,106,0.1) 0%, transparent 100%)",
                    }}
                  >
                    <span className="text-gold text-xl font-display">
                      {achievement.badge}
                    </span>
                  </div>
                  <div>
                    <p
                      className="label-small"
                      style={{ fontSize: "0.58rem" }}
                    >
                      {achievement.rarity}
                    </p>
                    <p
                      className="font-body text-gold text-sm font-medium mt-0.5"
                    >
                      {achievement.issuer}
                    </p>
                  </div>
                </div>
                <span
                  className="font-mono text-stone/30"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.65rem",
                  }}
                >
                  {achievement.year}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl text-ivory font-light mb-2">
                  {achievement.title}
                </h3>
                <p className="font-display italic text-gold/70 text-sm mb-4">
                  {achievement.program}
                </p>
                <div className="gold-line-left w-8 mb-6" />
                <p className="font-body text-stone/60 text-sm leading-relaxed mb-8">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span
                    className="label-small"
                    style={{ fontSize: "0.6rem", color: "var(--bronze)" }}
                  >
                    {achievement.credential}
                  </span>
                </div>
              </div>

              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-32 h-32 rotate-45 translate-x-16 -translate-y-16"
                  style={{ background: "rgba(198,167,106,0.05)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative horizontal rule */}
        <div className="mt-20 flex items-center gap-6 reveal-up">
          <div className="flex-1 h-px bg-gold/10" />
          <span className="font-display italic text-gold/30 text-sm">
            Continually expanding the record
          </span>
          <div className="flex-1 h-px bg-gold/10" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
