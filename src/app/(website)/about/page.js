import React from "react";
import { Sparkles, Heart, Star, Shield } from "lucide-react";

export const metadata = {
  title: "About Us — Green Girl Ceylon",
  description: "Learn about the heritage, philosophy, and curated gift boxes of Green Girl Ceylon, led by Creative Director Nisha Ranasinghe.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-16">
        {/* Page Header */}
        <div className="flex flex-col gap-3 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Our Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">About Green Girl</h1>
          <div className="w-12 h-[2px] bg-[#B2C4AC] mx-auto mt-2 shadow-[0_0_8px_rgba(178,196,172,0.8)]" />
        </div>

        {/* Narrative Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">A Philosophy of Care & Curation</h2>
            <p>
              Green Girl Ceylon Boutique was born out of a desire to redefine gifting. We believe that gifts are more than material exchanges; they are tactile manifestations of care, selection, and style.
            </p>
            <p>
              Every element in our collection is handpicked and customized. From individually vetted plush crafts that evoke nostalgia, to organic roses, and hand-molded bespoke ceramics, we prioritize quality and design excellence above all.
            </p>
            <p>
              We package every boutique order inside our signature dark wooden crates and customized gift boxes, ensuring that the first impression is as unforgettable as the sentiment inside.
            </p>
          </div>
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-black/40 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
            <img 
              src="/images/hero_banner.png" 
              alt="Premium dark studio setting representing Green Girl Sri Lanka" 
              className="w-full h-full object-cover saturate-[0.6] hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Editorial Quote */}
        <div className="hype-glass p-8 md:p-12 border border-white/0.05 relative overflow-hidden flex flex-col items-center text-center gap-6">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          <blockquote className="text-lg md:text-xl font-light italic text-[#B2C4AC] leading-relaxed tracking-wide">
            "We curated Green Girl to honor the philosophy of thoughtful giving—designing bespoke ceramic packaging, selecting plush crafts that feel nostalgic, and wrapping them in premium dark aesthetic values."
          </blockquote>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Nisha Ranasinghe</span>
            <span className="text-[10px] text-neutral-450 uppercase tracking-widest">Creative Director & Founder</span>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <Heart className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Thoughtful Curation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We carefully source and handpick every single item, ensuring they meet our strict aesthetic standards.
            </p>
          </div>
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <Star className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Luxury Packaging</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Wrapped in our signature black boutique crates, adding a touch of prestige and surprise to every box.
            </p>
          </div>
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <Shield className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Artisanal Trust</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Crafted in collaboration with boutique local ceramists and floral designers in Colombo, Sri Lanka.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
