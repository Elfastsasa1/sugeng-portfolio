"use client";

const weapons = [
  {
    category: "Frontend Forge",
    icon: "◈",
    items: [
      { name: "Next.js 14", level: 95, note: "App Router · SSR · RSC" },
      { name: "React", level: 95, note: "Hooks · Context · Performance" },
      { name: "TypeScript", level: 88, note: "Type safety at scale" },
      { name: "TailwindCSS", level: 92, note: "Utility-first precision" },
    ],
  },
  {
    category: "Backend Engine",
    icon: "◉",
    items: [
      { name: "Node.js", level: 90, note: "REST · GraphQL · WebSocket" },
      { name: "PostgreSQL", level: 85, note: "Query optimization · Schema" },
      { name: "Docker", level: 80, note: "Containerization · Compose" },
      { name: "DevOps", level: 78, note: "CI/CD · Vercel · Railway" },
    ],
  },
  {
    category: "Intelligence Layer",
    icon: "◎",
    items: [
      { name: "AI Integration", level: 85, note: "OpenAI · LangChain · RAG" },
      { name: "Solidity", level: 82, note: "Smart Contracts · DeFi" },
      { name: "Web3.js / Ethers", level: 80, note: "DApp · Wallet Connect" },
      { name: "REST API Design", level: 92, note: "Architecture · Auth · Scale" },
    ],
  },
];

const marqueeItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Solidity",
  "Docker",
  "TailwindCSS",
  "AI Integration",
  "Web3",
  "GraphQL",
  "Vercel",
  "OpenAI",
  "DevOps",
  "Prisma",
];

export function ArsenalSection() {
  return (
    <section
      id="arsenal"
      className="relative bg-vault section-padding overflow-hidden"
    >
      {/* Roman numeral */}
      <div className="roman-number top-0 left-0 -translate-x-1/4 -translate-y-1/4">
        II
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section II — The Arsenal</span>
        </div>

        {/* Title */}
        <div className="mb-20 reveal-up delay-100">
          <h2 className="headline-large text-ivory">
            Engineered
            <br />
            <span className="text-gold italic">Weapons</span>
          </h2>
          <p className="font-body text-stone/60 text-base mt-6 max-w-xl">
            Tools are not chosen. They are mastered. Each technology is a
            blade sharpened through deliberate practice and battle-tested
            deployment.
          </p>
        </div>

        {/* Weapon categories */}
        <div
          className="skill-section grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {weapons.map((category, ci) => (
            <div
              key={category.category}
              className="museum-card p-8 reveal-up"
              style={{ transitionDelay: `${ci * 0.12}s` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-gold text-xl font-display">
                  {category.icon}
                </span>
                <div>
                  <p className="label-small" style={{ fontSize: "0.6rem" }}>
                    Arsenal Category
                  </p>
                  <h3 className="font-display text-ivory text-xl font-light">
                    {category.category}
                  </h3>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-7">
                {category.items.map((item, ii) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="font-body text-ivory text-sm font-medium">
                          {item.name}
                        </p>
                        <p
                          className="font-mono text-stone/40 mt-0.5"
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: "0.6rem",
                          }}
                        >
                          {item.note}
                        </p>
                      </div>
                      <span
                        className="font-mono text-gold/70"
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: "0.65rem",
                        }}
                      >
                        {item.level}
                      </span>
                    </div>
                    {/* Bar */}
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${item.level}%`,
                          transitionDelay: `${ci * 0.1 + ii * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div className="mt-24 reveal-up">
          <div className="gold-line mb-8" />
          <p className="label-small mb-6 text-center">Full Technology Stack</p>
          <div className="overflow-hidden">
            <div
              className="marquee-track"
              style={{ gap: "5rem" }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="font-display text-2xl md:text-3xl font-light"
                  style={{
                    color:
                      i % 3 === 0
                        ? "var(--gold)"
                        : i % 3 === 1
                          ? "var(--stone)"
                          : "rgba(212,196,168,0.3)",
                    flexShrink: 0,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="gold-line mt-8" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
