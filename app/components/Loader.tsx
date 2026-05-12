"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 30, speed: 40 },
      { target: 65, speed: 25 },
      { target: 85, speed: 50 },
      { target: 100, speed: 20 },
    ];

    let stepIndex = 0;

    const run = () => {
      const step = steps[stepIndex];
      if (!step) return;

      if (current < step.target) {
        current += 1;
        setProgress(current);
        setTimeout(run, step.speed);
      } else {
        stepIndex++;
        if (stepIndex < steps.length) {
          setTimeout(run, 200);
        } else {
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 900);
          }, 400);
        }
      }
    };

    setTimeout(run, 300);
  }, [onComplete]);

  const romanNumerals = ["I", "IV", "IX", "X", "XL", "C"];
  const displayRoman =
    romanNumerals[Math.floor((progress / 100) * (romanNumerals.length - 1))];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-obsidian"
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background Roman numeral */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.span
              className="font-display text-[30vw] font-light text-gold/[0.03] select-none"
              key={displayRoman}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {displayRoman}
            </motion.span>
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-12">
            {/* Logo / Name */}
            <div className="text-center">
              <motion.p
                className="label-small mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Est. MMXXIV
              </motion.p>
              <motion.h1
                className="font-display text-4xl md:text-6xl font-light text-ivory tracking-widest"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                SUGENG TRIANTO
              </motion.h1>
              <motion.div
                className="gold-line mt-4 mx-auto"
                style={{ width: "60px" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>

            {/* Progress */}
            <div className="w-64 md:w-80">
              <div className="flex justify-between mb-3">
                <span className="label-small">Initializing</span>
                <span
                  className="font-mono text-xs text-gold"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {String(progress).padStart(3, "0")}
                </span>
              </div>
              <div className="h-px bg-stone/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold/50"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0 }}
                />
              </div>
            </div>

            {/* Quote */}
            <motion.p
              className="font-display italic text-stone/60 text-sm md:text-base text-center max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              &ldquo;Those who master systems,
              <br />
              shape the future.&rdquo;
            </motion.p>
          </div>

          {/* Corner marks */}
          <div className="absolute top-8 left-8">
            <div className="w-6 h-6 border-t border-l border-gold/30" />
          </div>
          <div className="absolute top-8 right-8">
            <div className="w-6 h-6 border-t border-r border-gold/30" />
          </div>
          <div className="absolute bottom-8 left-8">
            <div className="w-6 h-6 border-b border-l border-gold/30" />
          </div>
          <div className="absolute bottom-8 right-8">
            <div className="w-6 h-6 border-b border-r border-gold/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
