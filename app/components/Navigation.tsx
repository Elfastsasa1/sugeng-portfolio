"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Identity", href: "#identity" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Empire", href: "#projects" },
  { label: "Contact", href: "#footprint" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-700 ${
          scrolled
            ? "bg-obsidian/90 backdrop-blur-xl border-b border-gold/10"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col"
          >
            <span
              className="font-display text-ivory text-lg md:text-xl font-light tracking-widest"
              style={{ letterSpacing: "0.15em" }}
            >
              S.T
            </span>
            <span className="label-small" style={{ fontSize: "0.55rem" }}>
              Software Engineer
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="mailto:elfastsasa8@gmail.com"
              className="btn-gold text-xs"
            >
              <span>Initiate Contact</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ cursor: "none" }}
          >
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-[9989] bg-obsidian flex flex-col items-center justify-center md:hidden"
        initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
        animate={
          menuOpen
            ? { opacity: 1, clipPath: "circle(150% at 95% 5%)" }
            : { opacity: 0, clipPath: "circle(0% at 95% 5%)" }
        }
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-4xl font-light text-ivory hover:text-gold transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={
                menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ delay: i * 0.07 + 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
        <div className="gold-line mt-12 w-24 mx-auto" />
        <p className="label-small mt-8">elfastsasa8@gmail.com</p>
      </motion.div>
    </>
  );
}
