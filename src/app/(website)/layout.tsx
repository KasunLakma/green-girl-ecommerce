"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the layout viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a smooth spring-based progression for scroll-driven animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0B0F12] text-white overflow-x-hidden selection:bg-[#10B981]/20 selection:text-[#10B981]"
    >
      {/* Superhuman-inspired top-aligned smooth scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Minimal background ambient glow elements (non-intrusive) */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#10B981]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-500/[0.01] blur-[180px] pointer-events-none" />

      {/* Main Structural Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
