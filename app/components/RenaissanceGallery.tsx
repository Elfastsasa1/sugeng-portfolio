"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function RenaissanceGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%)",
      }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "#c6a76a",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <motion.div
        className="text-center mb-20 px-6"
        style={{ opacity }}
      >
        <motion.p
          className="text-[#c6a76a] tracking-[0.3em] text-xs mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          THE COLLECTION
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-light text-white/90"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Renaissance
        </motion.h2>
        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c6a76a] to-transparent mx-auto mt-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Full body statue */}
        <motion.div
          className="relative group"
          style={{
            y: y1,
            scale,
          }}
        >
          {/* Ornate frame */}
          <div className="relative p-4 md:p-6">
            {/* Frame border */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                border: "2px solid #8B7355",
                boxShadow: "inset 0 0 30px rgba(139,115,85,0.2), 0 0 60px rgba(0,0,0,0.5)",
              }}
            />
            {/* Inner gold border */}
            <div
              className="absolute inset-2 md:inset-3 rounded-sm"
              style={{
                border: "1px solid #c6a76a",
                boxShadow: "inset 0 0 20px rgba(198,167,106,0.1)",
              }}
            />

            {/* Image with mouse parallax */}
            <motion.div
              className="relative overflow-hidden bg-[#1a1410]"
              style={{
                aspectRatio: "3/4",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src="/renaissance/full_body.jpg"
                alt="Renaissance Full Body"
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
                  filter: "sepia(20%) contrast(1.1) brightness(0.95)",
                }}
              />
              {/* Vignette overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)",
                }}
              />
            </motion.div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="text-[#c6a76a]/70 text-xs tracking-[0.2em]">FULL BODY</p>
              <p className="text-white/40 text-[10px] mt-1 tracking-wider">CLASSICAL FORM</p>
            </div>
          </div>
        </motion.div>

        {/* Half body / bust */}
        <motion.div
          className="relative group md:mt-32"
          style={{
            y: y2,
            scale,
          }}
        >
          {/* Ornate frame */}
          <div className="relative p-4 md:p-6">
            {/* Frame border */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                border: "2px solid #8B7355",
                boxShadow: "inset 0 0 30px rgba(139,115,85,0.2), 0 0 60px rgba(0,0,0,0.5)",
              }}
            />
            {/* Inner gold border */}
            <div
              className="absolute inset-2 md:inset-3 rounded-sm"
              style={{
                border: "1px solid #c6a76a",
                boxShadow: "inset 0 0 20px rgba(198,167,106,0.1)",
              }}
            />

            {/* Image with mouse parallax */}
            <motion.div
              className="relative overflow-hidden bg-[#1a1410]"
              style={{
                aspectRatio: "1/1",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src="/renaissance/half_body.jpg"
                alt="Renaissance Bust"
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
                  filter: "sepia(25%) contrast(1.15) brightness(0.9)",
                }}
              />
              {/* Vignette overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)",
                }}
              />
            </motion.div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="text-[#c6a76a]/70 text-xs tracking-[0.2em]">BUST</p>
              <p className="text-white/40 text-[10px] mt-1 tracking-wider">TIMELESS ELEGANCE</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom quote */}
      <motion.div
        className="text-center mt-24 px-6"
        style={{ opacity }}
      >
        <motion.p
          className="text-white/30 text-sm italic max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          &ldquo;The noblest pleasure is the joy of understanding.&rdquo;
        </motion.p>
        <motion.p
          className="text-[#c6a76a]/40 text-xs mt-3 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          — LEONARDO DA VINCI
        </motion.p>
      </motion.div>

      {/* Scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(198,167,106,0.1) 2px, rgba(198,167,106,0.1) 4px)",
        }}
      />
    </div>
  );
}
