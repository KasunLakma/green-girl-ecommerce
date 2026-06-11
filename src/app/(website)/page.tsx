"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Gift, 
  Leaf, 
  Smile, 
  ShieldCheck, 
  Menu, 
  X,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

// Staggered spring physics configuration matching luxury boutique web trends
const SPRING_TRANSITION = {
  initial: { opacity: 0, scale: 0.93, y: 45 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8
  }
} as const;

const STAGGER_CONTAINER = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12
    }
  },
  viewport: { once: true, margin: "-80px" }
};

const STAGGER_ITEM = {
  initial: { opacity: 0, scale: 0.9, y: 35 },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
} as const;

const CATEGORIES = [
  { id: "all", name: "🌸 All Gifties" },
  { id: "boxes", name: "🧺 Curated Crates" },
  { id: "plants", name: "🌿 Living Plants" },
  { id: "ceramics", name: "☕ Artisan Clay" },
];

const PRODUCTS = [
  {
    id: "1",
    name: "The Picnic & Clay Crate 🧺",
    category: "boxes",
    price: 68.0,
    rating: 5.0,
    tag: "Cozy Bestie Set",
    color: "bg-[#dbece2]/40",
    description: "Our signature box holding loose leaf chamomile tea, vanilla bean mist, a clay incense holder, and a floral matchbox.",
  },
  {
    id: "2",
    name: "Potted Chinese Money Plant 🌿",
    category: "plants",
    price: 24.0,
    rating: 4.9,
    tag: "Rooted With Love",
    color: "bg-[#fcefe9]/40",
    description: "Thriving nursery baby Pilea potted in a warm, hand-painted terra cotta cup.",
  },
  {
    id: "3",
    name: "Speckled Oatmeal Clay Mug ☕",
    category: "ceramics",
    price: 32.0,
    rating: 5.0,
    tag: "Hand-Thrown",
    color: "bg-[#fcf2e3]/40",
    description: "Individually thrown stoneware mug with speckled iron details, perfect for warm cocoa.",
  },
];

export default function StorefrontPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Added "${productName}" to your gift bag! 🌸`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#4e6b5c]/10 selection:text-[#4e6b5c]">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="glass-panel px-6 py-4 rounded-[24px] flex items-center gap-3 border-white/60 shadow-xl max-w-sm">
              <div className="w-8 h-8 rounded-full bg-[#dbece2] flex items-center justify-center text-[#21352b] shrink-0">
                <Sparkles size={14} className="animate-spin" />
              </div>
              <p className="text-xs font-bold tracking-wide text-[#21352b]">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-6 py-5">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="max-w-7xl mx-auto glass-panel px-8 py-3 rounded-full flex items-center justify-between border-white/50"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4e6b5c] flex items-center justify-center text-white">
              <Leaf size={14} />
            </div>
            <span className="serif-heading text-lg font-black tracking-widest text-[#21352b] uppercase">
              Green Girl<span className="text-[#4e6b5c]">🌸</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-widest uppercase text-[#21352b]/70">
            <a href="#about" className="hover:text-[#21352b] transition-colors relative group py-1">
              Boutique Vibe
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4e6b5c] transition-all group-hover:w-full" />
            </a>
            <a href="#curations" className="hover:text-[#21352b] transition-colors relative group py-1">
              Coziness Bento
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4e6b5c] transition-all group-hover:w-full" />
            </a>
            <a href="#shop" className="hover:text-[#21352b] transition-colors relative group py-1">
              Seasonal Catalog
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4e6b5c] transition-all group-hover:w-full" />
            </a>
            <Link href="/admin/dashboard" className="text-[#4e6b5c] hover:text-[#21352b] flex items-center gap-1 transition-colors py-1">
              Admin Node <ExternalLink size={12} />
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setToastMessage(cartCount > 0 ? `Opening checkout overlay with ${cartCount} goodies... 🧺` : "Your gift bag is empty!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3500);
              }}
              className="glass-button px-5 py-2.5 flex items-center gap-2 select-none"
            >
              <ShoppingBag size={14} />
              <span>Gift Bag</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4e6b5c] text-[10px] font-black text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden hover:bg-white/20 rounded-full transition-colors text-[#21352b]"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="mt-3 mx-2 p-8 rounded-[2.5rem] glass-panel md:hidden overflow-hidden flex flex-col gap-5 border-white/50"
            >
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#21352b]/80 hover:text-[#21352b]"
              >
                Boutique Vibe
              </a>
              <a 
                href="#curations" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#21352b]/80 hover:text-[#21352b]"
              >
                Coziness Bento
              </a>
              <a 
                href="#shop" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#21352b]/80 hover:text-[#21352b]"
              >
                Seasonal Catalog
              </a>
              <hr className="border-white/20 my-1" />
              <Link 
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#4e6b5c] flex items-center gap-2"
              >
                Admin Workspace <ExternalLink size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-24 relative z-10">
        
        {/* Cute Hero Banner Section */}
        <motion.section 
          id="about"
          {...SPRING_TRANSITION}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 md:pt-16"
        >
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#dbece2] border border-[#4e6b5c]/15 text-[#21352b] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles size={12} className="text-[#4e6b5c]" />
              🌸 Cozy Social-Inspired Boutique
            </div>
            
            <h1 className="serif-heading text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.08] text-[#21352b]">
              Aesthetic Gifts.<br />
              <span className="italic text-[#4e6b5c] font-normal">Cozy Vibes. ✨</span>
            </h1>
            
            <p className="sans-body text-sm sm:text-base text-[#21352b]/85 leading-relaxed max-w-2xl">
              Welcome to our pastel dream space. We wrap nursery-grown baby plant cuties, hand-crafted calligraphic tag sets, and organic pottery to make your besties smile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a href="#curations" className="cute-btn-primary select-none flex items-center justify-center gap-2">
                Browse Bento Crates <ArrowRight size={14} />
              </a>
              <a href="#shop" className="glass-button select-none">
                Seasonal Shop
              </a>
            </div>
          </div>

          {/* Interactive Cute Hero Graphic Frame */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-md aspect-[4/5] rounded-[36px] p-8 glass-panel border-white/60 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fcefe9]/50 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-2xl bg-[#dbece2] flex items-center justify-center text-[#21352b] border border-white/60">
                  <Gift size={18} />
                </div>
                <div className="glass-panel px-3.5 py-1 rounded-full text-[9px] font-bold tracking-widest text-[#4e6b5c] uppercase">
                  🌸 Hand-Wrapped
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#4e6b5c] uppercase mb-1.5">Bestie Favorite</p>
                <h3 className="serif-heading text-2xl text-[#21352b] mb-3">The Lavender Cozy Crate</h3>
                <p className="text-xs text-[#21352b]/80 leading-relaxed">
                  Includes soft lavender floral bundles, a raw clay incense burner, hand-rolled essential oil, and a custom typed greeting note.
                </p>
              </div>

              <div className="flex justify-between items-center pt-5 border-t border-[#21352b]/5">
                <span className="serif-heading text-xl font-bold text-[#21352b]">$72.00</span>
                <button 
                  onClick={() => handleAddToCart("The Lavender Cozy Crate")}
                  className="glass-button px-4.5 py-2 text-[10px] font-bold"
                >
                  Quick Send
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Bento Grid Showcase Section (Framer Motion Stagger Spring Reveal) */}
        <motion.section 
          id="curations"
          variants={STAGGER_CONTAINER}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="serif-heading text-3xl sm:text-4xl text-[#21352b]">Boutique Bento Curation</h2>
            <p className="text-[#21352b]/65 text-xs sm:text-sm">Click and hover our non-uniform pastel frames to experience cute layouts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento 1: Large Signature Crate */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              className="md:col-span-8 rounded-[36px] p-8 cute-bento-card border-white/60 flex flex-col justify-between min-h-[380px] relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#dbece2]/40 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4e6b5c]/10 text-[#21352b] text-[10px] font-bold tracking-wider uppercase mb-6">
                  <Sparkles size={10} className="text-[#4e6b5c]" /> TikTok Favorite
                </div>
                <h3 className="serif-heading text-3xl sm:text-4xl tracking-tight mb-4 max-w-lg">
                  The Matcha & Blossom Picnic Set 🧺
                </h3>
                <p className="sans-body text-xs sm:text-sm text-[#21352b]/80 leading-relaxed max-w-xl mb-6">
                  Unbox cozy tea time. Comes with stone-ground Japanese matcha, a bamboo whisk, two hand-shaped clay cups with soft mint glaze details, and pressed flower cards.
                </p>
                
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-white/50 text-[10px] font-bold border border-white/40 text-[#21352b]">🌸 Pure Matcha</span>
                  <span className="px-3.5 py-1 rounded-full bg-white/50 text-[10px] font-bold border border-white/40 text-[#21352b]">🌿 Clay Ware</span>
                  <span className="px-3.5 py-1 rounded-full bg-white/50 text-[10px] font-bold border border-white/40 text-[#21352b]">💌 Dried Petals</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-[#21352b]/5">
                <div className="flex items-baseline gap-2">
                  <span className="serif-heading text-3xl font-black text-[#21352b]">$94.00</span>
                  <span className="text-xs line-through text-[#21352b]/40 font-bold">$115.00</span>
                </div>
                <button 
                  onClick={() => handleAddToCart("Matcha & Blossom Picnic Set")}
                  className="cute-btn-primary w-full sm:w-auto"
                >
                  Adopt Crate 🧺
                </button>
              </div>
            </motion.div>

            {/* Bento 2: Living Plants */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              className="md:col-span-4 rounded-[36px] p-8 cute-bento-card bg-[#fcefe9]/50 border-white/60 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-[#21352b] mb-8 shadow-sm border border-white/60">
                  <Leaf size={18} />
                </div>
                <h4 className="serif-heading text-2xl text-[#21352b] mb-3">Thriving Greens</h4>
                <p className="sans-body text-xs text-[#21352b]/80 leading-relaxed">
                  Sweet, rooted baby houseplant cuties packed securely to land safely on your bestie's sill.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-[#21352b]/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#21352b]/50">3 Varieties</span>
                <a href="#shop" className="text-[#4e6b5c] hover:text-[#21352b] flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  Check Out <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Bento 3: Pottery */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              className="md:col-span-4 rounded-[36px] p-8 cute-bento-card bg-[#fcf2e3]/50 border-white/60 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-[#21352b] mb-8 shadow-sm border border-white/60">
                  <Gift size={18} />
                </div>
                <h4 className="serif-heading text-2xl text-[#21352b] mb-3">Speckled Clay</h4>
                <p className="sans-body text-xs text-[#21352b]/80 leading-relaxed">
                  Kiln-fired cups, incense holders, and floral vases crafted individually by hand.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-[#21352b]/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#21352b]/50">Hand-Thrown</span>
                <a href="#shop" className="text-[#4e6b5c] hover:text-[#21352b] flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  Check Out <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Bento 4: Typed greetings */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              className="md:col-span-8 rounded-[36px] p-8 cute-bento-card bg-[#dbece2]/30 border-white/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-h-[160px]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#21352b] shadow-sm border border-white/60 shrink-0">
                  <Smile size={20} />
                </div>
                <div>
                  <h4 className="serif-heading text-xl text-[#21352b] mb-1.5">Calligraphy Envelope Cards 💌</h4>
                  <p className="sans-body text-xs text-[#21352b]/75 leading-relaxed">
                    Leave your customized wishes at checkout. We calligraphy each one with real leaf ink.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setToastMessage("Premium calligraphy card options can be customized during checkout.");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3500);
                }}
                className="glass-button px-5 py-2.5 text-[10px] shrink-0 w-full md:w-auto"
              >
                Preview Styles
              </button>
            </motion.div>

          </div>
        </motion.section>

        {/* Catalog Section */}
        <motion.section 
          id="shop"
          {...SPRING_TRANSITION}
          className="flex flex-col gap-10 pt-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="serif-heading text-3xl sm:text-4xl text-[#21352b]">Boutique Catalogue 🌸</h2>
              <p className="text-[#21352b]/65 text-xs sm:text-sm">Filter our cozy seasonal gifts to find the perfect surprise.</p>
            </div>

            {/* Filtering tab bar */}
            <div className="glass-panel p-1 rounded-full inline-flex self-start gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#4e6b5c] text-white shadow-sm"
                      : "text-[#21352b]/70 hover:text-black hover:bg-white/25"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-[28px] p-6 flex flex-col justify-between border-2 border-white/60 relative overflow-hidden group hover:border-[#4e6b5c]/10"
              >
                <div>
                  <div className={`w-full aspect-[4/3] rounded-2xl ${product.color} mb-6 flex items-center justify-center p-8 border border-white/30 relative overflow-hidden`}>
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#4e6b5c] font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {product.tag}
                    </div>
                    
                    <div className="w-14 h-14 rounded-full bg-white/85 shadow-md flex items-center justify-center text-[#4e6b5c] transform group-hover:scale-110 transition-transform duration-300">
                      {product.category === "boxes" ? <Gift size={24} /> : product.category === "plants" ? <Leaf size={24} /> : <Sparkles size={24} />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#4e6b5c] uppercase tracking-widest">{product.category}</span>
                    <span className="text-[10px] text-[#21352b]/60 flex items-center gap-0.5 font-bold">★ {product.rating}</span>
                  </div>

                  <h3 className="serif-heading text-xl text-[#21352b] mb-2">{product.name}</h3>
                  <p className="text-xs text-[#21352b]/70 leading-relaxed mb-6">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-[#21352b]/5">
                  <span className="serif-heading text-xl font-bold text-[#21352b]">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product.name)}
                    className="glass-button px-4 py-2 text-[10px] font-bold"
                  >
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pillars Section */}
        <motion.section 
          {...SPRING_TRANSITION}
          className="glass-panel p-10 rounded-[36px] grid grid-cols-1 md:grid-cols-3 gap-8 border-2 border-white/60"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dbece2] flex items-center justify-center text-[#21352b] border border-white/80 shadow-sm">
              <Leaf size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#21352b]">Sustainably Hand-Crafted</h4>
            <p className="sans-body text-xs text-[#21352b]/75 leading-relaxed max-w-xs">
              All boxes and packing materials are fully compostable or recyclable. Zero plastic, 100% cozy love.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fcefe9] flex items-center justify-center text-[#21352b] border border-white/80 shadow-sm">
              <Heart size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#21352b]">Supporting Indie Crafters</h4>
            <p className="sans-body text-xs text-[#21352b]/75 leading-relaxed max-w-xs">
              We coordinate directly with local potters and nurseries to bring unique, batch-fired clay pieces.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fcf2e3] flex items-center justify-center text-[#21352b] border border-white/80 shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#21352b]">Safe Plant Delivery</h4>
            <p className="sans-body text-xs text-[#21352b]/75 leading-relaxed max-w-xs">
              Specialized insulation and soil-protection wrapping ensure plants arrive hydrated, fresh, and happy.
            </p>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="mt-24 py-16 px-6 border-t border-[#21352b]/5 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#4e6b5c] flex items-center justify-center text-white">
              <Leaf size={12} />
            </div>
            <span className="serif-heading text-sm font-bold tracking-widest text-[#21352b] uppercase">
              Green Girl Gift Co. 🌸
            </span>
          </div>

          <p className="text-[11px] text-[#21352b]/50 max-w-md leading-relaxed font-semibold">
            © 2026 Green Girl boutique. Cozy hand-made gift platforms. Admin workspace gateway is mounted strictly at /admin/login.
          </p>

          <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-[#21352b]/60">
            <a href="#about" className="hover:text-black transition-colors">Story</a>
            <a href="#curations" className="hover:text-black transition-colors">Curations</a>
            <Link href="/admin/login" className="hover:text-[#4e6b5c] transition-colors">Admin Gateway</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
