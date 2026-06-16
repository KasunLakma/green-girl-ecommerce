"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Gift, 
  Star, 
  Truck, 
  RefreshCw,
  Mail,
  X
} from "lucide-react";
import { useCart } from "./layout";

export default function StorefrontPage() {
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Stitch Cute Plush Toy",
      category: "Toys & Teddies",
      price: "Rs. 2,400",
      image: "/images/stitch_toy.png",
      alt: "Premium soft-stuffed Stitch cute plush toy displayed on a luxury boutique display shelf",
      tag: "TRENDING",
      rating: 4.9,
      description: "A super soft, premium quality Stitch plush toy. Crafted with extra plush materials and fine detailed stitching, making it the perfect luxury gift for Disney collectors and children alike."
    },
    {
      id: 2,
      name: "Customized Ceramic Mug + Gift Box",
      category: "Customized Gifts",
      price: "Rs. 1,950",
      image: "/images/custom_mug.png",
      alt: "Elegantly customized ceramic mug placed next to a luxury black gift box with gold foil lettering",
      tag: "EXQUISITE",
      rating: 4.8,
      description: "Matte-finished customized ceramic mug packaged in an elegant, signature dark gift box. Perfect for coffee lovers, workspace decor, or a high-quality personalized gift."
    },
    {
      id: 3,
      name: "Handmade Rose Bouquet Hamper",
      category: "Gift Hampers",
      price: "Rs. 4,500",
      image: "/images/rose_hamper.png",
      alt: "Luxury gift hamper featuring a handmade premium red and pink rose arrangement inside a dark boutique gift box",
      tag: "POPULAR",
      rating: 5.0,
      description: "A premium floral arrangement featuring handmade, selected red and pink roses beautifully displayed inside a dark boutique gift box, accompanied by custom gift treats."
    }
  ];

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col select-none overflow-x-hidden bg-[#0D110D]">
      
      {/* Interactive Hero Banner Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-28 px-4 overflow-hidden">
        {/* Ambient glowing canvas behind */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_banner.png" 
            alt="Green Girl Luxury Boutique Banner" 
            className="w-full h-full object-cover opacity-35 brightness-75 saturate-75 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D110D]/60 via-[#0D110D]/40 to-[#0D110D]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D110D]/80 via-transparent to-[#0D110D]/80" />
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
              className="hype-glass px-6 py-4 max-w-2xl mx-auto border border-white/0.08 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-sm sm:text-base text-neutral-300 font-medium tracking-wide leading-relaxed"
            >
              Discover a curated selection of luxury boutique gift items, matte ceramics, rare flora, and custom-crafted hampers made for the discerning collector.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4"
            >
              <button 
                onClick={() => {
                  const el = document.getElementById("featured-collection");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-4 bg-[#B2C4AC] text-[#0D110D] rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-[0_0_20px_rgba(178,196,172,0.3)] hover:shadow-[0_0_35px_rgba(178,196,172,0.65)] hover:bg-[#A1B399] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                Explore Boutique
                <ArrowRight className="w-4 h-4 text-[#0D110D] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Boutique Values Row */}
      <section className="relative w-full max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <Truck className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Islandwide Delivery</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Prompt, reliable, and secure cash-on-delivery shipping tailored to your custom timeline.
            </p>
          </div>
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <Gift className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Luxury Wrapping</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every boutique order is packaged in our signature dark wooden crates and customized gift boxes.
            </p>
          </div>
          <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B2C4AC]/10 group-hover:border-[#B2C4AC]/30 transition-all">
              <RefreshCw className="w-5 h-5 text-[#B2C4AC]" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Curator Quality</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Individually vetted toys, organic roses, and hand-molded ceramics guaranteed to impress.
            </p>
          </div>
        </div>
      </section>

      {/* Featured List / New Collection Grid */}
      <section id="featured-collection" className="relative w-full max-w-5xl mx-auto px-4 py-20 scroll-mt-24">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase">Featured Additions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">The Trendiest Collection</h2>
            <p className="text-xs text-neutral-400 max-w-md mt-1">
              Discover the most wanted custom gift pieces and luxury plush additions this season.
            </p>
          </div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold border-b border-white/10 pb-1 self-start md:self-auto">
            Showing 3 of 3 items
          </span>
        </div>

        {/* Grid Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="hype-glass p-4 rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:border-white/15 hover:shadow-[0_24px_50px_rgba(0,0,0,0.7)] border border-white/0.05"
            >
              {/* Card Body wrapper */}
              <div className="flex flex-col gap-4">
                {/* Image visual wrapper */}
                <div className="overflow-hidden rounded-2xl relative aspect-[4/3] bg-black/40 border border-white/[0.04]">
                  <img 
                    src={product.image} 
                    alt={product.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Tag overlay */}
                  <div className="absolute top-3 left-3 bg-[#0D110D]/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {product.tag}
                  </div>
                  {/* Liked state */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setLikedProducts(prev => ({ ...prev, [product.id]: !prev[product.id] }));
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#0D110D]/70 hover:bg-[#0D110D]/90 border border-white/10 text-white hover:text-rose-400 active:scale-90 transition-all cursor-pointer z-20"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 transition-all ${likedProducts[product.id] ? "fill-rose-500 text-rose-500" : "text-white"}`} 
                    />
                  </button>
                  
                  {/* Hover details action buttons */}
                  <div className="absolute inset-0 bg-[#0D110D]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="px-4 py-2 rounded-full bg-white text-[#0D110D] font-bold text-[9px] tracking-wider uppercase hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                    >
                      Quick View
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-4 py-2 rounded-full bg-[#B2C4AC] text-[#0D110D] font-bold text-[9px] tracking-wider uppercase hover:bg-[#A1B399] active:scale-95 transition-all cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 px-1">
                  <span className="text-[9px] font-bold tracking-widest text-[#B2C4AC] uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#B2C4AC] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-neutral-750"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-bold ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Footer inside card */}
              <div className="flex items-center justify-between border-t border-white/0.05 pt-4 mt-4 px-1">
                <div className="text-base font-black text-white tracking-tight">{product.price}</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="text-[9px] font-bold tracking-widest text-[#B2C4AC] uppercase group-hover:text-white transition-colors flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Add +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curator's Note Section */}
      <section className="relative w-full max-w-5xl mx-auto px-4 py-16">
        <div className="hype-glass p-8 md:p-12 border border-white/0.05 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          
          <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
            <img 
              src="/images/hero_banner.png" 
              alt="Curator details showing premium dark studio setting" 
              className="w-full h-full object-cover saturate-[0.5] hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div className="flex flex-col gap-6 w-full md:w-2/3">
            <div className="inline-flex text-[9px] font-bold tracking-[0.3em] uppercase text-[#B2C4AC]">
              Editorial & Curator Note
            </div>
            <blockquote className="text-lg md:text-xl font-light italic text-white leading-relaxed tracking-wide">
              "Gifts are more than material exchanges; they are tactile manifestations of care, selection, and style. We curated Green Girl to honor this philosophy—designing bespoke ceramic packaging, selecting plush crafts that feel nostalgic, and wrapping them in dark aesthetic values."
            </blockquote>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Nisha Ranasinghe</span>
              <span className="text-[10px] text-neutral-450 uppercase tracking-widest">Creative Director & Founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign-Up Section */}
      <section className="relative w-full max-w-5xl mx-auto px-4 py-16">
        <div className="hype-glass p-8 md:p-10 border border-white/0.05 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          <Mail className="w-8 h-8 text-[#B2C4AC] mb-2 animate-pulse" />
          <div className="flex flex-col gap-2 max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">Join The Inner Circle</h3>
            <p className="text-xs text-neutral-400">
              Subscribe to receive notification of private product drops, custom wooden crate arrivals, and private collections.
            </p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to our private list!");
              e.target.reset();
            }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2 z-10"
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-1 px-5 py-3 rounded-full bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#B2C4AC] text-[#0D110D] rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#A1B399] transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="relative w-full border-t border-white/0.05 bg-[#080B08]/90 py-12 px-4 mt-auto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6E856A] to-[#B2C4AC] flex items-center justify-center">
                <span className="text-[#0D110D] font-extrabold text-[11px] tracking-tighter">GG</span>
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">GREEN GIRL</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed max-w-sm">
              Premium dark luxury storefront. Curating ceramic art pieces, custom hampers, plush toys, and organic items. Built with passion and styled for your aesthetic satisfaction.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">Navigation</span>
            <div className="flex flex-col gap-2">
              {["Collections", "Custom Gifts", "Gift Hampers", "Toys & Teddies"].map(link => (
                <a key={link} href="#featured-collection" className="text-[10px] text-neutral-400 hover:text-[#B2C4AC] transition-colors">{link}</a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">Contact & Connect</span>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-neutral-400">Colombo, Sri Lanka</span>
              <span className="text-[10px] text-neutral-400">hello@greengirl.luxury</span>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B2C4AC]/10 text-neutral-400 hover:text-[#B2C4AC] transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B2C4AC]/10 text-neutral-400 hover:text-[#B2C4AC] transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B2C4AC]/10 text-neutral-400 hover:text-[#B2C4AC] transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto border-t border-white/0.05 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[9px] text-neutral-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Green Girl Luxury. All rights reserved.
          </span>
          <span className="text-[9px] text-neutral-500 uppercase tracking-widest flex items-center gap-1">
            Powered by <span className="text-[#B2C4AC] font-bold">Next.js 16 & Tailwind v4</span>
          </span>
        </div>
      </footer>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="w-full max-w-3xl bg-[#0E120E]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Image */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto md:min-h-[400px] bg-black/20">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0D110D]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase">
                  {quickViewProduct.tag}
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase">
                      {quickViewProduct.category}
                    </span>
                    <button 
                      onClick={() => setQuickViewProduct(null)}
                      className="p-1.5 rounded-full bg-white/5 border border-white/0.05 text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all active:scale-90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                    {quickViewProduct.name}
                  </h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? "fill-amber-400 text-amber-400" : "text-neutral-700"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-450 font-bold ml-1">{quickViewProduct.rating.toFixed(1)}</span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-y border-white/0.05 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Unit Price</span>
                      <span className="text-xl font-black text-white">{quickViewProduct.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 bg-black/20 border border-white/0.05 p-1 rounded-full">
                      <span className="text-[10px] font-bold text-neutral-400 px-3 py-1">COD Available</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-3.5 bg-[#B2C4AC] text-[#0D110D] rounded-full font-black text-xs tracking-widest uppercase hover:bg-[#A1B399] transition-all active:scale-95 cursor-pointer text-center"
                    >
                      Add To Shopping Bag
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
