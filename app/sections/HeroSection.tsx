"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const statueRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      if (statueRef.current) {
        statueRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Radial museum light */}
        <div className="absolute inset-0 bg-museum-light opacity-60" />
        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-vault/50 to-obsidian" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(198,167,106,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,167,106,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Renaissance Statue Background */}
      <div
        ref={statueRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ pointerEvents: "none" }}
      >
        <div className="relative w-[420px] h-[620px] md:w-[600px] md:h-[820px]">
          <img
            src="/renaissance/full_body.jpg"
            alt="Renaissance Statue"
            className="w-full h-full object-contain"
            style={{
              filter: "sepia(30%) contrast(1.2) brightness(0.7) opacity(0.4)",
            }}
          />
          {/* Gold tint overlay on statue */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(198,167,106,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Left vertical text */}
      <motion.div
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div
          className="w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        />
        <span
          className="label-small"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
          }}
        >
          Fullstack · AI · Blockchain
        </span>
        <div
          className="w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        />
      </motion.div>

      {/* Right vertical text */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <div
          className="w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        />
        <span
          className="label-small"
          style={{
            writingMode: "vertical-rl",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
          }}
        >
          Est. MMXXIV · Jakarta
        </span>
        <div
          className="w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        />
      </motion.div>

      {/* Main Hero Text */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 flex flex-col items-center will-change-transform"
      >
        {/* Pre-label */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="w-8 h-px bg-gold/50" />
          <span className="label-small" style={{ fontSize: "0.6rem" }}>
            Software Engineer · Digital Kingdom
          </span>
          <div className="w-8 h-px bg-gold/50" />
        </motion.div>

        {/* Giant headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-display font-light text-ivory"
            style={{
              fontSize: "clamp(3.8rem, 11vw, 12rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            Crafting
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-display font-light"
            style={{
              fontSize: "clamp(3.8rem, 11vw, 12rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "var(--gold)",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.75, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            Digital
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-display font-light text-ivory"
            style={{
              fontSize: "clamp(3.8rem, 11vw, 12rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            Realities
          </motion.h1>
        </div>

        {/* Sub line */}
        <motion.p
          className="font-display italic text-stone/70 text-lg md:text-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9 }}
        >
          With Intelligence, Code, And Relentless Precision
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <a
            href="#identity"
            className="btn-gold"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#identity")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Explore The Kingdom</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <span className="label-small" style={{ fontSize: "0.55rem" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
