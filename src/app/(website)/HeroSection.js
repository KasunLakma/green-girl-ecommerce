"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  useEffect(() => {
    gsap.fromTo(".hero-badge",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(".hero-animate", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

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
        <div className="flex flex-col items-center gap-6">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] tracking-[0.25em] text-[#B2C4AC] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B2C4AC] animate-pulse" /> Established Curator of Rare Objects
          </div>

          <h1 className="hero-animate hero-title-text text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
            Crafted with Love, <br />
            <span className="bg-gradient-to-r from-white via-[#B2C4AC] to-[#B2C4AC] bg-clip-text text-transparent">Styled for You</span>
          </h1>

          <div className="hero-animate hero-desc-text hype-glass px-6 py-4 max-w-2xl mx-auto border border-white/0.08 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-sm sm:text-base text-neutral-350 font-medium tracking-wide leading-relaxed">
            Discover a curated selection of luxury boutique gift items, matte ceramics, rare flora, and custom-crafted hampers made for the discerning collector.
          </div>

          <div className="hero-animate hero-btn mt-4">
            <a 
              href="#collections"
              className="group relative px-8 py-4 bg-[#B2C4AC] text-[#0D110D] rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-[0_0_20px_rgba(178,196,172,0.3)] hover:shadow-[0_0_35px_rgba(178,196,172,0.65)] hover:bg-[#A1B399] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              Explore Boutique
              <ArrowRight className="w-4 h-4 text-[#0D110D] group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
