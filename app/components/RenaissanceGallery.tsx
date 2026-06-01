"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function RenaissanceGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for mouse
  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.92, 1, 1, 0.95]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #12100e 30%, #1a1510 50%, #12100e 70%, #0a0a0a 100%)",
      }}
    >
      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              background: "#c6a76a",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 40), 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.1, 0.4 + Math.random() * 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient museum light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(198,167,106,0.04) 0%, transparent 100%)",
        }}
      />

      {/* Section header */}
      <motion.div
        className="text-center mb-16 md:mb-24 px-6 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c6a76a]/60" />
          <span className="text-[#c6a76a]/60 tracking-[0.3em] text-[0.65rem] uppercase">
            The Collection
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c6a76a]/60" />
        </motion.div>

        <motion.h2
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white/90 font-light tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Renaissance
        </motion.h2>

        <motion.p
          className="mt-4 text-white/30 text-sm italic font-display"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Where ancient form meets digital vision
        </motion.p>

        <motion.div
          className="w-20 h-[1px] mx-auto mt-8"
          style={{
            background: "linear-gradient(90deg, transparent, #c6a76a, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
      </motion.div>

      {/* Gallery — asymmetric layout with 3D depth */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* LEFT: Full body statue — tall, dominant */}
          <motion.div
            className="md:col-span-5 md:col-start-1 relative"
            style={{ y: y1, scale }}
          >
            <RenaissanceFrame
              src="/renaissance/hero_statue.jpg"
              alt="Classical Marble Statue — Full Form"
              label="CLASSICAL FORM"
              sublabel="Full Body"
              aspectRatio="3/4"
              mouseX={smoothX}
              mouseY={smoothY}
              parallaxIntensity={12}
              delay={0}
            />
          </motion.div>

          {/* RIGHT COLUMN: two stacked */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8 md:gap-12">

            {/* Top right: bust */}
            <motion.div
              className="relative"
              style={{ y: y2, scale }}
            >
              <RenaissanceFrame
                src="/renaissance/half_body.jpg"
                alt="Classical Marble Bust — Upper Form"
                label="ETERNAL GAZE"
                sublabel="Bust"
                aspectRatio="4/3"
                mouseX={smoothX}
                mouseY={smoothY}
                parallaxIntensity={18}
                delay={0.15}
              />
            </motion.div>

            {/* Bottom right: wide shot */}
            <motion.div
              className="relative"
              style={{ y: y3, scale }}
            >
              <RenaissanceFrame
                src="/renaissance/venus.jpg"
                alt="Renaissance Sculpture — Detail"
                label="TIMELESS"
                sublabel="Detail"
                aspectRatio="16/10"
                mouseX={smoothX}
                mouseY={smoothY}
                parallaxIntensity={10}
                delay={0.3}
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom quote */}
      <motion.div
        className="text-center mt-20 md:mt-28 px-6 relative z-10"
        style={{ opacity }}
      >
        <motion.blockquote
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-white/25 text-base md:text-lg italic font-display leading-relaxed">
            &ldquo;Simplicity is the ultimate sophistication — not the absence of complexity,
            but the mastery of it.&rdquo;
          </p>
          <div className="w-10 h-[1px] mx-auto mt-5 mb-3" style={{ background: "linear-gradient(90deg, transparent, #c6a76a50, transparent)" }} />
          <cite className="text-[#c6a76a]/30 text-xs tracking-[0.25em] uppercase not-italic">
            Engineering Philosophy
          </cite>
        </motion.blockquote>
      </motion.div>

      {/* Scan lines — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(198,167,106,0.08) 3px, rgba(198,167,106,0.08) 4px)",
        }}
      />

      {/* Top & bottom dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6a76a]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6a76a]/15 to-transparent" />
    </div>
  );
}

/* ============================================
   Individual framed artwork with 3D parallax
   ============================================ */
function RenaissanceFrame({
  src,
  alt,
  label,
  sublabel,
  aspectRatio,
  mouseX,
  mouseY,
  parallaxIntensity = 12,
  delay = 0,
}: {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  aspectRatio: string;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  parallaxIntensity?: number;
  delay?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt from mouse
  const rotateX = useSpring(0, { stiffness: 80, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const unsubX = mouseX.on("change", (v) => {
      rotateY.set(v * 3);
    });
    const unsubY = mouseY.on("change", (v) => {
      rotateX.set(-v * 2);
    });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <motion.div
      ref={frameRef}
      className="relative group cursor-default"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Outer ornate frame */}
      <div
        className="relative p-3 md:p-5 transition-all duration-500"
        style={{
          border: "2px solid #6b5d4a",
          boxShadow: isHovered
            ? "inset 0 0 40px rgba(198,167,106,0.12), 0 0 50px rgba(0,0,0,0.6), 0 20px 60px rgba(0,0,0,0.4)"
            : "inset 0 0 30px rgba(139,115,85,0.08), 0 0 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Inner gold border */}
        <div
          className="absolute inset-2 md:inset-3 pointer-events-none"
          style={{
            border: "1px solid rgba(198,167,106,0.3)",
            transition: "border-color 0.5s",
            borderColor: isHovered ? "rgba(198,167,106,0.5)" : "rgba(198,167,106,0.2)",
          }}
        />

        {/* Corner ornaments */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
          <div
            key={corner}
            className="absolute w-4 h-4 md:w-5 md:h-5 pointer-events-none"
            style={{
              [corner.includes("top") ? "top" : "bottom"]: "6px",
              [corner.includes("left") ? "left" : "right"]: "6px",
              borderTop: corner.includes("top") ? "2px solid #c6a76a40" : "none",
              borderBottom: corner.includes("bottom") ? "2px solid #c6a76a40" : "none",
              borderLeft: corner.includes("left") ? "2px solid #c6a76a40" : "none",
              borderRight: corner.includes("right") ? "2px solid #c6a76a40" : "none",
            }}
          />
        ))}

        {/* Image container with 3D transform */}
        <motion.div
          className="relative overflow-hidden bg-[#0f0d0a]"
          style={{
            aspectRatio,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* The actual image */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered
                ? "brightness(0.5) contrast(1.25) sepia(0.25) saturate(0.9)"
                : "brightness(0.35) contrast(1.3) sepia(0.35) saturate(0.8)",
              transform: `scale(${isHovered ? 1.05 : 1})`,
            }}
            loading="lazy"
          />

          {/* Gold vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, rgba(198,167,106,0.06) 0%, transparent 60%),
                radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)
              `,
            }}
          />

          {/* Hover glow line at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #c6a76a, transparent)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: isHovered ? 0.6 : 0,
              scaleX: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Label plate */}
        <div className="mt-3 md:mt-4 flex items-center justify-between px-1">
          <div>
            <p className="text-[#c6a76a]/50 text-[0.6rem] tracking-[0.25em] uppercase font-medium">
              {label}
            </p>
            <p className="text-white/20 text-[0.55rem] tracking-[0.15em] mt-0.5">
              {sublabel}
            </p>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: "#c6a76a",
                  opacity: 0.2 + i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
