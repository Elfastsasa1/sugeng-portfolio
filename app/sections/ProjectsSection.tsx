"use client";

import Image from "next/image";

const projects = [
  {
    index: "01",
    roman: "I",
    title: "Nasi Tumpeng",
    subtitle: "Platform",
    tagline: "Where culture meets digital commerce.",
    description:
      "A premium digital marketplace for traditional Indonesian culinary experiences. Built on a foundation of performance-first architecture, real-time ordering systems, and a seamless cross-device experience that bridges heritage with modernity.",
    stack: ["Next.js 14", "PostgreSQL", "Prisma", "Stripe", "TypeScript"],
    metrics: ["99.9% Uptime", "< 200ms API", "Mobile First"],
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=85&auto=format&fit=crop",
    accentColor: "#C6A76A",
    type: "Full Stack Platform",
  },
  {
    index: "02",
    roman: "II",
    title: "Smart Contract",
    subtitle: "Suite",
    tagline: "Trust encoded. Autonomy deployed.",
    description:
      "A suite of battle-tested Solidity smart contracts for decentralized finance operations. Engineered with security-first architecture, gas optimization, and formal verification patterns that make financial logic immutable and trustless.",
    stack: ["Solidity", "Hardhat", "Ethers.js", "OpenZeppelin", "TypeScript"],
    metrics: ["Gas Optimized", "Audit Ready", "Multi-chain"],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=85&auto=format&fit=crop",
    accentColor: "#8A7B62",
    type: "Blockchain · Web3",
  },
  {
    index: "03",
    roman: "III",
    title: "AI-Driven",
    subtitle: "REST API",
    tagline: "Intelligence as infrastructure.",
    description:
      "A production-grade REST API engine powered by large language models and vector embeddings. Built to handle intelligent query processing, semantic search, and autonomous data transformation at enterprise scale.",
    stack: ["Node.js", "OpenAI", "LangChain", "Pinecone", "PostgreSQL"],
    metrics: ["LLM Powered", "RAG Architecture", "< 500ms Response"],
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85&auto=format&fit=crop",
    accentColor: "#D4C4A8",
    type: "AI Engineering",
  },
  {
    index: "04",
    roman: "IV",
    title: "Web3 DApp",
    subtitle: "Interface",
    tagline: "Decentralized. Borderless. Unstoppable.",
    description:
      "A cinematic Web3 decentralized application interface with wallet integration, real-time blockchain event streaming, and a UI system that makes the complexity of DeFi feel elegant and approachable.",
    stack: ["React", "Wagmi", "RainbowKit", "Viem", "TailwindCSS"],
    metrics: ["Multi-Wallet", "Real-time Events", "EVM Compatible"],
    image:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=900&q=85&auto=format&fit=crop",
    accentColor: "#C6A76A",
    type: "Web3 · DeFi",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-vault section-padding overflow-hidden"
    >
      {/* Roman numeral */}
      <div className="roman-number bottom-0 right-0 translate-x-1/4 translate-y-1/4">
        IV
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section IV — Project Empire</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 reveal-up delay-100">
          <h2 className="headline-large text-ivory">
            The
            <br />
            <span className="text-gold italic">Empire</span>
          </h2>
          <p className="font-body text-stone/60 text-base max-w-sm md:text-right">
            Each project is a kingdom built from first principles. Not just
            features — systems with purpose, precision, and lasting impact.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-2">
          {projects.map((project, i) => (
            <div
              key={project.index}
              className="reveal-up"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group museum-card overflow-hidden">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "" : "lg:grid-flow-col-dense"}`}
      >
        {/* Image */}
        <div
          className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${isEven ? "" : "lg:col-start-2"}`}
        >
          <Image
            src={project.image}
            alt={`${project.title} project`}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            style={{
              filter: "brightness(0.5) contrast(1.2) saturate(0.7)",
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(to right, rgba(20,20,20,0.4) 0%, transparent 100%)"
                : "linear-gradient(to left, rgba(20,20,20,0.4) 0%, transparent 100%)",
            }}
          />
          {/* Museum spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${project.accentColor}18 0%, transparent 100%)`,
            }}
          />
          {/* Index */}
          <div className="absolute top-6 left-6">
            <span
              className="font-display font-light"
              style={{
                fontSize: "4rem",
                color: `${project.accentColor}25`,
                lineHeight: 1,
              }}
            >
              {project.index}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col justify-center p-10 md:p-14 lg:p-16 ${isEven ? "" : "lg:col-start-1"}`}
        >
          <div className="mb-6">
            <p className="label-small mb-3">{project.type}</p>
            <h3 className="font-display font-light text-ivory leading-tight">
              <span
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", display: "block" }}
              >
                {project.title}
              </span>
              <span
                className="italic"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  display: "block",
                  color: project.accentColor,
                }}
              >
                {project.subtitle}
              </span>
            </h3>
          </div>

          <p
            className="font-display italic text-stone/60 mb-4"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            {project.tagline}
          </p>

          <div className="gold-line-left w-10 mb-6" />

          <p className="font-body text-stone/60 text-sm leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="border border-gold/20 px-3 py-1"
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--stone)",
                }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-body text-xs text-bronze/70 bg-obsidian/50 px-2 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
