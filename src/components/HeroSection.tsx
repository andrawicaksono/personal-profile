"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";

const containerVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.25, duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
};

export default function HeroSection() {
  // === Mouse interactivity ===
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Convert mouse position to a small translation
  const orbX = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const orbY = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  const lineX = useTransform(mouseX, [0, window.innerWidth], [15, -15]);
  const lineY = useTransform(mouseY, [0, window.innerHeight], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-200">
      {/* === Techy Animated Background === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing Orbs — now respond to mouse movement */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-blue-400/60 to-purple-400/80 dark:from-blue-500/80 dark:to-purple-500/30 rounded-full blur-3xl"
          style={{ top: "15%", left: "10%", x: orbX, y: orbY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/40 to-pink-400/40 dark:from-purple-500/30 dark:to-pink-500/30 rounded-full blur-3xl"
          style={{ bottom: "5%", right: "10%", x: lineX, y: lineY }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, -30, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glowing network lines that drift with the mouse */}
        <motion.svg
          className="absolute inset-0 w-full h-full opacity-50 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ x: lineX, y: lineY }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="url(#grad)"
              strokeWidth="1"
              animate={{
                opacity: [0.1, 0.5, 0.1],
                pathLength: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* === Main Content === */}
      <motion.div
        className="text-center px-4 relative z-10"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        {/* Profile */}
        <motion.div className="mb-8 relative" variants={itemVariants}>
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/profile-placeholder.jpg"
              alt="Andra Wicaksono"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          >
            Andra Wicaksono
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-800 dark:text-gray-300"
          >
            Software Engineer
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div className="space-x-4" variants={itemVariants}>
          <motion.a
            href="#portfolio"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-block px-6 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
            whileHover={{ scale: 1.08, y: -3, rotate: [-2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
