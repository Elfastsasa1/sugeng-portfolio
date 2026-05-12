"use client";

const networkLinks = [
  {
    label: "GitHub",
    handle: "@Elfastsasa1",
    href: "https://github.com/Elfastsasa1",
    description: "Open source · Code archive · Repositories",
    icon: "◈",
    index: "01",
  },
  {
    label: "Twitter / X",
    handle: "@gulatebuuu",
    href: "https://twitter.com/gulatebuuu",
    description: "Engineering thoughts · Tech discourse",
    icon: "◉",
    index: "02",
  },
  {
    label: "LinkedIn",
    handle: "elfast-sasa-128a80275",
    href: "https://linkedin.com/in/elfast-sasa-128a80275",
    description: "Professional network · Career profile",
    icon: "◎",
    index: "03",
  },
  {
    label: "Telegram",
    handle: "@cavendisx",
    href: "https://t.me/cavendisx",
    description: "Direct channel · Instant connect",
    icon: "◆",
    index: "04",
  },
  {
    label: "Email",
    handle: "elfastsasa8@gmail.com",
    href: "mailto:elfastsasa8@gmail.com",
    description: "Project proposals · Collaboration",
    icon: "◇",
    index: "05",
  },
];

export function FootprintSection() {
  return (
    <section
      id="footprint"
      className="relative bg-vault section-padding overflow-hidden"
    >
      {/* Roman numeral */}
      <div className="roman-number top-0 right-0 translate-x-1/4 -translate-y-1/4">
        VI
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 reveal-up">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-small">Section VI — Digital Footprint</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 reveal-up delay-100">
          <h2 className="headline-large text-ivory">
            Enter The
            <br />
            <span className="text-gold italic">Network</span>
          </h2>
          <div className="max-w-xs">
            <p className="font-body text-stone/60 text-sm leading-relaxed">
              Every channel is a gateway into the empire. Choose your entry
              point and initiate contact.
            </p>
            <div className="gold-line-left w-12 mt-4" />
          </div>
        </div>

        {/* Network links — full-width rows */}
        <div className="flex flex-col border-t border-gold/10">
          {networkLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-7 px-0 border-b border-gold/10 reveal-up transition-all duration-500 hover:px-4 hover:bg-obsidian/40"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-6 md:gap-10">
                {/* Index */}
                <span
                  className="font-mono text-gold/20 group-hover:text-gold/50 transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    minWidth: "24px",
                  }}
                >
                  {link.index}
                </span>

                {/* Icon */}
                <span className="text-gold/40 group-hover:text-gold text-lg font-display transition-colors duration-300">
                  {link.icon}
                </span>

                {/* Info */}
                <div>
                  <p className="label-small mb-1" style={{ fontSize: "0.58rem" }}>
                    {link.label}
                  </p>
                  <p className="font-display text-ivory text-base md:text-xl font-light group-hover:text-gold transition-colors duration-300">
                    {link.handle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p className="hidden md:block font-body text-stone/40 text-xs group-hover:text-stone/60 transition-colors duration-300">
                  {link.description}
                </p>
                {/* Arrow */}
                <div className="w-8 h-8 border border-gold/20 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300">
                  <span className="text-gold/40 group-hover:text-gold text-xs transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Availability indicator */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-up">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400/80 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-green-400/40 rounded-full animate-ping" />
            </div>
            <div>
              <p className="font-body text-ivory text-sm">
                Currently Available for Projects
              </p>
              <p className="font-mono text-stone/40 text-xs mt-0.5">
                Response within 24 hours
              </p>
            </div>
          </div>

          <a href="mailto:elfastsasa8@gmail.com" className="btn-gold">
            <span>Initiate Collaboration</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
