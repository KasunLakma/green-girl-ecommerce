"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles, ArrowRight, ShieldCheck, ShoppingBag, Gift } from "lucide-react";
import { SUPERHUMAN_SPRING } from "@/config/framer";

export default function StorefrontPage() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const navItems = ["HOME", "COLLECTIONS", "SPECIALS", "ABOUT"];

  const handleReserve = () => {
    setCartCount((prev) => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#080B0D] text-white flex flex-col items-center justify-center p-6 selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 z-50"
          >
            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] px-6 py-4 rounded-[20px] flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles size={14} className="animate-pulse" />
              </div>
              <p className="text-xs font-bold tracking-wide text-white">Item added to reservation list. 🖤</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Header Navigation */}
      <header className="fixed top-6 z-40 w-full max-w-lg px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SUPERHUMAN_SPRING}
          className="backdrop-blur-md bg-black/20 border border-white/[0.05] px-6 py-2.5 rounded-full flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Leaf size={14} className="text-emerald-400" />
            <span className="serif-heading text-[10px] font-black tracking-widest text-white uppercase">
              GG.
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className="hype-interactive relative py-1 text-[9px] font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-200 active:scale-[0.98] active:translate-y-px"
              >
                {item}
                {activeTab === item && (
                  <motion.span 
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart Status */}
          <button 
            onClick={handleReserve}
            className="hype-interactive relative p-1.5 rounded-full hover:bg-white/5 active:scale-[0.98] active:translate-y-px text-emerald-400"
          >
            <ShoppingBag size={13} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 text-[7px] font-black text-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </motion.div>
      </header>

      {/* Central Frosted-Glass Product Card */}
      <main className="w-full max-w-md mt-20 flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={SUPERHUMAN_SPRING}
          className="w-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 flex flex-col gap-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          {/* Header info */}
          <div className="flex flex-col gap-1 text-center">
            <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
              Curation — Batch 04
            </span>
            <h1 className="serif-heading text-2xl font-black text-white tracking-wide uppercase">
              GREEN GIRL CURATION
            </h1>
          </div>

          {/* Placeholder for Cinematic Product Luxury Container Asset */}
          <div className="w-full aspect-[16/10] bg-gradient-to-br from-neutral-900/60 via-neutral-950/80 to-neutral-900/60 border border-white/[0.04] rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Glowing outlines representing high-end glass container */}
            <div className="w-24 h-32 rounded-xl border border-white/[0.08] bg-white/[0.01] flex flex-col items-center justify-between p-3 relative shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="w-8 h-2 rounded-t bg-white/[0.08] border border-white/[0.1] absolute -top-2 left-1/2 -translate-x-1/2" />
              
              <div className="text-[7px] font-bold tracking-widest text-slate-500 uppercase">
                GG-04
              </div>

              {/* Floating Leaf Symbol */}
              <motion.div 
                animate={{ y: [0, -4, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-emerald-400/90 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              >
                <Leaf size={24} />
              </motion.div>

              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[6px] font-bold text-emerald-400/80 uppercase tracking-widest">Hydrated</span>
              </div>
            </div>

            {/* Micro-glowing border highlight on card hover */}
            <div className="absolute bottom-3 text-[8px] font-bold tracking-widest text-slate-500 uppercase">
              Obsidian Clay & Volcanic Pumice Vessel
            </div>
          </div>

          {/* Minimalist product description layout */}
          <div className="flex flex-col gap-2">
            <p className="sans-body text-xs text-slate-400 text-center leading-relaxed px-2">
              A limited-run botanical assembly. Merges a rare hand-grown velvet foliage slice potted inside a porous charcoal volcanic vessel, complete with double kiln-fired stoneware cups.
            </p>
          </div>

          {/* Bottom Interactive Actions */}
          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => alert("Learn More: Redirecting to Obsidian Clay specifications...")}
              className="hype-interactive flex-1 bg-white text-[#080B0D] font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-full hover:bg-neutral-200 transition-colors duration-200 active:scale-[0.98] active:translate-y-px"
            >
              Learn More
            </button>
            <button 
              onClick={handleReserve}
              className="hype-interactive flex-1 backdrop-blur-md bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-full transition-colors duration-200 active:scale-[0.98] active:translate-y-px"
            >
              Quick Reserve
            </button>
          </div>
        </motion.div>
      </main>

      {/* Sleek Minimalist Footer */}
      <footer className="mt-16 text-center">
        <p className="text-[8px] font-bold tracking-widest text-slate-600 uppercase">
          GG. — Premium Gifting Concept © 2026
        </p>
      </footer>
    </div>
  );
}
