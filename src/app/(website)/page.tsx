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
  ExternalLink,
  Info
} from "lucide-react";
import Link from "next/link";

// Animation settings
const SCROLL_TRANSITION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 }
} as const;

const STAGGER_CONTAINER = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: true, margin: "-80px" }
};

const STAGGER_ITEM = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.7 }
  }
} as const;

const CATEGORIES = [
  { id: "all", name: "All Offerings" },
  { id: "boxes", name: "Curated Boxes" },
  { id: "plants", name: "Living Botanicals" },
  { id: "ceramics", name: "Artisan Ceramics" },
];

const PRODUCTS = [
  {
    id: "1",
    name: "The Sage Retreat Box",
    category: "boxes",
    price: 68.0,
    rating: 4.9,
    tag: "Signature Curation",
    color: "bg-accent-mint/30",
    description: "Cold-pressed tea leaves, wild sage bundle, a clay dish, hand-dipped matches, and a textured ceramic mug.",
  },
  {
    id: "2",
    name: "Spotted Pilea Peperomioides",
    category: "plants",
    price: 24.0,
    rating: 4.8,
    tag: "Nursery Grown",
    color: "bg-accent-blush/30",
    description: "Thriving Chinese Money Plant potted in a matte-finish organic terra cotta basin.",
  },
  {
    id: "3",
    name: "Speckled Oat Ceramic Mug",
    category: "ceramics",
    price: 32.0,
    rating: 5.0,
    tag: "Limited Batch",
    color: "bg-accent-gold/30",
    description: "Individually thrown stoneware mug featuring a rich speckled glaze and tactile textured base.",
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
    setToastMessage(`Added "${productName}" to your gift bag.`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF6F0] text-[#121815] selection:bg-[#374b3f]/10 selection:text-[#374b3f]">
      {/* Editorial aesthetic ambient light maps */}
      <div className="absolute top-0 left-0 w-[45vw] h-[45vw] rounded-full bg-[#e3ebe6] opacity-35 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#ebded9] opacity-30 blur-[150px] pointer-events-none" />
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="glass-panel px-6 py-4 rounded-[20px] flex items-center gap-3 border-emerald-800/10 shadow-xl max-w-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
                <Sparkles size={14} className="animate-pulse" />
              </div>
              <p className="text-xs font-semibold tracking-wide">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-6 py-5">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
          className="max-w-7xl mx-auto glass-panel px-8 py-3 rounded-full flex items-center justify-between border-white/40"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#374b3f] flex items-center justify-center text-white">
              <Leaf size={14} />
            </div>
            <span className="serif-heading text-lg font-black tracking-widest text-[#121815] uppercase">
              Green Girl
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-[#121815]/70">
            <a href="#story" className="hover:text-[#121815] transition-colors relative group py-1">
              Boutique Story
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#374b3f] transition-all group-hover:w-full" />
            </a>
            <a href="#curations" className="hover:text-[#121815] transition-colors relative group py-1">
              Curations
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#374b3f] transition-all group-hover:w-full" />
            </a>
            <a href="#boutique" className="hover:text-[#121815] transition-colors relative group py-1">
              Catalog
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#374b3f] transition-all group-hover:w-full" />
            </a>
            <Link href="/admin/dashboard" className="text-[#374b3f] hover:text-[#121815] flex items-center gap-1 transition-colors py-1">
              Admin Workspace <ExternalLink size={12} />
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setToastMessage(cartCount > 0 ? `Redirecting to premium secure payment portal with ${cartCount} items...` : "Select an item to add to your gift bag.");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3500);
              }}
              className="glass-button px-5 py-2.5 flex items-center gap-2 select-none"
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline">Gift Bag</span>
              {cartCount > 0 && (
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#374b3f] text-[10px] font-black text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden hover:bg-white/20 rounded-full transition-colors text-[#121815]"
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
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="mt-3 mx-2 p-8 rounded-[2rem] glass-panel md:hidden overflow-hidden flex flex-col gap-5 border-white/50"
            >
              <a 
                href="#story" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#121815]/80 hover:text-[#121815]"
              >
                Boutique Story
              </a>
              <a 
                href="#curations" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#121815]/80 hover:text-[#121815]"
              >
                Curations
              </a>
              <a 
                href="#boutique" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#121815]/80 hover:text-[#121815]"
              >
                Catalog
              </a>
              <hr className="border-white/20 my-1" />
              <Link 
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#374b3f] flex items-center gap-2"
              >
                Admin Panel <ExternalLink size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-24">
        
        {/* Luxury Hero Banner Section */}
        <motion.section 
          id="story"
          {...SCROLL_TRANSITION}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 md:pt-16"
        >
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3ebe6] border border-[#374b3f]/10 text-[#374b3f] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles size={12} className="animate-spin" />
              Est. 2026 Collection
            </div>
            
            <h1 className="serif-heading text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.08] text-[#121815]">
              Bespoke Gift Boxes. <br />
              <span className="italic text-[#374b3f] font-normal">Living Stories.</span>
            </h1>
            
            <p className="sans-body text-sm sm:text-base text-[#121815]/80 leading-relaxed max-w-2xl">
              We shape modern, organic retail ecosystems. Hand-crafting delicate planters, curated botanical bundles, and stoneware clay ceramics, sourced sustainably in small seasonal releases.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a href="#curations" className="luxury-btn-primary select-none flex items-center justify-center gap-2">
                Explore Bento Sets <ArrowRight size={14} />
              </a>
              <a href="#boutique" className="glass-button select-none">
                Browse Goods
              </a>
            </div>
          </div>

          {/* Interactive Luxurious Hero Graphic Frame */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="w-full max-w-md aspect-[4/5] rounded-[32px] p-8 luxury-card border-white/60 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ebdcc9]/30 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-2xl bg-[#e3ebe6] flex items-center justify-center text-[#374b3f] border border-white/60">
                  <Gift size={18} />
                </div>
                <div className="glass-panel px-3.5 py-1 rounded-full text-[9px] font-bold tracking-widest text-[#374b3f] uppercase">
                  Small Batch No. 04
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#374b3f] uppercase mb-1.5">Editorial Selection</p>
                <h3 className="serif-heading text-2xl mb-3">The Earth & Oat Crate</h3>
                <p className="text-xs text-[#121815]/80 leading-relaxed">
                  Organic botanical sage bundle, stoneware ceramic dish, eucalyptus fragrance vial, and handmade cotton envelope.
                </p>
              </div>

              <div className="flex justify-between items-center pt-5 border-t border-[#121815]/5">
                <span className="serif-heading text-xl font-bold">$78.00</span>
                <button 
                  onClick={() => handleAddToCart("The Earth & Oat Crate")}
                  className="glass-button px-4.5 py-2 text-[10px] font-bold"
                >
                  Quick Reserve
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Bento Grid Showcase Section (Framer Motion Stagger Reveal) */}
        <motion.section 
          id="curations"
          variants={STAGGER_CONTAINER}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="serif-heading text-3xl sm:text-4xl text-[#121815]">Curated Bento Showcase</h2>
            <p className="text-[#121815]/65 text-xs sm:text-sm">Explore our custom non-uniform layout modules, featuring fluid hover transformations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento 1: Large Signature Box (span-8 col, span-2 row) */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="md:col-span-8 rounded-[36px] p-8 luxury-card border-white/50 flex flex-col justify-between min-h-[380px] relative overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#e3ebe6]/50 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#374b3f]/10 text-[#374b3f] text-[10px] font-bold tracking-wider uppercase mb-6">
                  <Sparkles size={10} /> Editorial Release
                </div>
                <h3 className="serif-heading text-3xl sm:text-4xl tracking-tight mb-4 max-w-lg">
                  Deluxe Botanical Fern Set
                </h3>
                <p className="sans-body text-xs sm:text-sm text-[#121815]/80 leading-relaxed max-w-xl mb-6">
                  Our flagship collection. Holds three nurseries-raised organic ferns, high-insulation soil nutrients, a solid brass atomizer sprayer, and a hand-stitched linen notebook containing nursery care logs.
                </p>
                
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/40 text-[10px] font-bold border border-white/30 text-[#121815]/70">Ethically Rooted</span>
                  <span className="px-3 py-1 rounded-full bg-white/40 text-[10px] font-bold border border-white/30 text-[#121815]/70">Zero-Plastic Cartons</span>
                  <span className="px-3 py-1 rounded-full bg-white/40 text-[10px] font-bold border border-white/30 text-[#121815]/70">Custom Hand-Ink Card</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-[#121815]/5">
                <div className="flex items-baseline gap-2">
                  <span className="serif-heading text-3xl font-black">$120.00</span>
                  <span className="text-xs line-through text-[#121815]/40 font-bold">$145.00</span>
                </div>
                <button 
                  onClick={() => handleAddToCart("Deluxe Botanical Fern Set")}
                  className="luxury-btn-primary w-full sm:w-auto"
                >
                  Acquire Botanical Set
                </button>
              </div>
            </motion.div>

            {/* Bento 2: Living Botanicals (span-4 col) */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="md:col-span-4 rounded-[36px] p-8 luxury-card bg-[#ebded9]/35 border-white/50 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-[#374b3f] mb-8 shadow-sm border border-white/60">
                  <Leaf size={18} />
                </div>
                <h4 className="serif-heading text-2xl mb-3">Living Greens</h4>
                <p className="sans-body text-xs text-[#121815]/80 leading-relaxed">
                  Carefully packed, thriving houseplants potted in clean, breathable clay bodies.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-[#121815]/5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#121815]/50">3 Botanical Types</span>
                <a href="#boutique" className="text-[#374b3f] hover:text-black flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  View <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Bento 3: Ceramics (span-4 col) */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="md:col-span-4 rounded-[36px] p-8 luxury-card bg-[#ebdcc9]/35 border-white/50 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-[#374b3f] mb-8 shadow-sm border border-white/60">
                  <Gift size={18} />
                </div>
                <h4 className="serif-heading text-2xl mb-3">Artisan Pottery</h4>
                <p className="sans-body text-xs text-[#121815]/80 leading-relaxed">
                  Individually thrown ceramics, bud vases, and raw textured clay plates.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center border-t border-[#121815]/5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#121815]/50">Unique Clay Kiln</span>
                <a href="#boutique" className="text-[#374b3f] hover:text-black flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  View <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Bento 4: Custom Ink Messages (span-8 col) */}
            <motion.div 
              variants={STAGGER_ITEM}
              whileHover={{ y: -6 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="md:col-span-8 rounded-[36px] p-8 luxury-card bg-[#e3ebe6]/30 border-white/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-h-[160px]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#374b3f] shadow-sm border border-white/60 shrink-0">
                  <Smile size={20} />
                </div>
                <div>
                  <h4 className="serif-heading text-xl mb-1.5">Hand-Inked Calligraphy Cards</h4>
                  <p className="sans-body text-xs text-[#121815]/75 leading-relaxed">
                    Personalized letters written with organic botanical walnut ink. Leave your message at checkout.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setToastMessage("Calligraphy options can be specified on checkout.");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3500);
                }}
                className="glass-button px-5 py-2.5 text-[10px] shrink-0 w-full md:w-auto"
              >
                Preview Card Styles
              </button>
            </motion.div>

          </div>
        </motion.section>

        {/* Premium Products Catalog Section */}
        <motion.section 
          id="boutique"
          {...SCROLL_TRANSITION}
          className="flex flex-col gap-10 pt-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="serif-heading text-3xl sm:text-4xl text-[#121815]">The Boutique Catalogue</h2>
              <p className="text-[#121815]/65 text-xs sm:text-sm">Filter our seasonal releases curated for slow-living environments.</p>
            </div>

            {/* Category tabs */}
            <div className="glass-panel p-1 rounded-full inline-flex self-start gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#374b3f] text-white shadow-sm"
                      : "text-[#121815]/70 hover:text-black hover:bg-white/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                className="glass-panel rounded-[28px] p-6 flex flex-col justify-between border-2 border-white/60 relative overflow-hidden group hover:border-[#374b3f]/10"
              >
                <div>
                  <div className={`w-full aspect-[4/3] rounded-2xl ${product.color} mb-6 flex items-center justify-center p-8 border border-white/30 relative overflow-hidden`}>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#374b3f] font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {product.tag}
                    </div>
                    
                    <div className="w-14 h-14 rounded-full bg-white/80 shadow-md flex items-center justify-center text-[#374b3f] transform group-hover:scale-110 transition-transform duration-300">
                      {product.category === "boxes" ? <Gift size={24} /> : product.category === "plants" ? <Leaf size={24} /> : <Sparkles size={24} />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#374b3f] uppercase tracking-widest">{product.category}</span>
                    <span className="text-[10px] text-[#121815]/60 flex items-center gap-0.5 font-bold">★ {product.rating}</span>
                  </div>

                  <h3 className="serif-heading text-xl text-[#121815] mb-2">{product.name}</h3>
                  <p className="text-xs text-[#121815]/70 leading-relaxed mb-6">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-[#121815]/5">
                  <span className="serif-heading text-xl font-bold text-[#121815]">${product.price.toFixed(2)}</span>
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

        {/* Brand Value Pillars */}
        <motion.section 
          {...SCROLL_TRANSITION}
          className="glass-panel p-10 rounded-[36px] grid grid-cols-1 md:grid-cols-3 gap-8 border-2 border-white/60"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e3ebe6] flex items-center justify-center text-[#374b3f] border border-white/80 shadow-sm">
              <Leaf size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#121815]">Sustainably Sourced</h4>
            <p className="sans-body text-xs text-[#121815]/75 leading-relaxed max-w-xs">
              Every botanical root, box carton, and ceramic clay is derived directly from eco-neutral origins. Zero plastic.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ebded9] flex items-center justify-center text-[#374b3f] border border-white/80 shadow-sm">
              <Heart size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#121815]">Fair-Craft Alliances</h4>
            <p className="sans-body text-xs text-[#121815]/75 leading-relaxed max-w-xs">
              We associate with small-batch indie potters and nursery growers, securing equitable income models for art.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ebdcc9] flex items-center justify-center text-[#374b3f] border border-white/80 shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <h4 className="serif-heading text-lg text-[#121815]">Premium Insulated Travel</h4>
            <p className="sans-body text-xs text-[#121815]/75 leading-relaxed max-w-xs">
              Each package features thermal soil blankets, preserving foliage hydration and root integrity throughout travel.
            </p>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="mt-24 py-16 px-6 border-t border-[#121815]/5 bg-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#374b3f] flex items-center justify-center text-white">
              <Leaf size={12} />
            </div>
            <span className="serif-heading text-sm font-bold tracking-widest text-[#121815] uppercase">
              Green Girl Gift Co.
            </span>
          </div>

          <p className="text-[11px] text-[#121815]/50 max-w-md leading-relaxed">
            © 2026 Green Girl boutique. Hand-crafted retail platforms. Unrestricted admin workspace login gate is mounted strictly at /admin/login.
          </p>

          <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-[#121815]/60">
            <a href="#story" className="hover:text-black transition-colors">Story</a>
            <a href="#curations" className="hover:text-black transition-colors">Curations</a>
            <Link href="/admin/login" className="hover:text-[#374b3f] transition-colors">Admin Gateway</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
