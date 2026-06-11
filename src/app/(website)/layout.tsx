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

  // Smooth scroll progression matching approved HYPE settings (stiffness: 120, damping: 20)
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#080B0D] text-white overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-450"
    >
      {/* Top progress indicator with high-stiffness scroll spring */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 origin-left z-50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-500/[0.01] blur-[180px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
