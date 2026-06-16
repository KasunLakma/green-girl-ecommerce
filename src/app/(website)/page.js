"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StorefrontPage() {
  const [activeTab, setActiveTab] = useState("HOME");
  const navItems = ["HOME", "COLLECTIONS", "SPECIALS", "ABOUT"];

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center select-none overflow-hidden">
      
      {/* Floating Navigation Overlay */}
      <header className="fixed top-6 z-50 w-full max-w-md px-4">
        <div className="backdrop-blur-md bg-black/20 border border-white/[0.04] px-6 py-1.5 rounded-full flex items-center justify-center gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className="relative py-2.5 text-[10px] font-bold tracking-widest uppercase text-neutral-450 hover:text-white transition-colors duration-200 cursor-pointer active:scale-[0.98] active:translate-y-px transition-transform duration-100 group"
            >
              <span className="relative z-10 transition-colors duration-200 group-hover:text-white">{item}</span>
              {activeTab === item ? (
                <motion.span 
                  layoutId="activeNavLine"
                  className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#A2B997] shadow-[0_0_10px_rgba(162,185,151,0.7)]"
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              ) : (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#A2B997]/50 shadow-[0_0_6px_rgba(162,185,151,0.3)] group-hover:w-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </header>

    </div>
  );
}
