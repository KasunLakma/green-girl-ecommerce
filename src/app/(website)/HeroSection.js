"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-28 px-4 overflow-hidden">
      {/* Ambient glowing canvas behind */}
      <div className="absolute inset-0 z-0">
        <div 
          style={{ backgroundImage: "url('/hero-gift-shop.jpg')" }}
          className="w-full h-full bg-cover bg-center scale-105" 
        />
        <div className="absolute inset-0 bg-[#050705]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D110D]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] tracking-[0.25em] text-[#B2C4AC] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B2C4AC] animate-pulse" /> Established Curator of Rare Objects
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl">
            Crafted with Love, <br />
            <span className="bg-gradient-to-r from-white via-[#B2C4AC] to-[#B2C4AC] bg-clip-text text-transparent">Styled for You</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hype-glass px-6 py-4 max-w-2xl mx-auto border border-white/0.08 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-sm sm:text-base text-neutral-350 font-medium tracking-wide leading-relaxed"
          >
            Discover a curated selection of luxury boutique gift items, matte ceramics, rare flora, and custom-crafted hampers made for the discerning collector.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4"
          >
            <a 
              href="#collections"
              className="group relative px-8 py-4 bg-[#B2C4AC] text-[#0D110D] rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-[0_0_20px_rgba(178,196,172,0.3)] hover:shadow-[0_0_35px_rgba(178,196,172,0.65)] hover:bg-[#A1B399] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              Explore Boutique
              <ArrowRight className="w-4 h-4 text-[#0D110D] group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
