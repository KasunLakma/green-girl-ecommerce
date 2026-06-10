"use client";

import React, { useState } from "react";
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

// Mock products database for storefront showcase
const CATEGORIES = [
  { id: "all", name: "All Gifts" },
  { id: "boxes", name: "Curated Boxes" },
  { id: "plants", name: "Botanicals" },
  { id: "ceramics", name: "Ceramics" },
];

const PRODUCTS = [
  {
    id: "1",
    name: "The Sage Retreat Box",
    category: "boxes",
    price: 68.0,
    rating: 4.9,
    tag: "Best Seller",
    color: "bg-accent-mint",
    description: "Curated gift set including a soy candle, eucalyptus bath salts, organic green tea, and a handmade clay cup.",
  },
  {
    id: "2",
    name: "Spotted Pilea Peperomioides",
    category: "plants",
    price: 24.0,
    rating: 4.8,
    tag: "Easy Care",
    color: "bg-accent-blush",
    description: "Thriving Chinese Money Plant housed in a minimalist pastel clay pot, ready to brighten any desk.",
  },
  {
    id: "3",
    name: "Speckled Oat Ceramic Mug",
    category: "ceramics",
    price: 32.0,
    rating: 5.0,
    tag: "Unique Batch",
    color: "bg-accent-gold",
    description: "Individually thrown stoneware mug featuring a matte white glaze and textured iron speckles.",
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
    setToastMessage(`Added "${productName}" to your gift bag!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Dynamic light gradient background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-mint/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-blush/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] rounded-full bg-accent-gold/25 blur-[90px] pointer-events-none" />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-3 border-emerald-500/20 shadow-lg max-w-sm">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto glass-panel px-6 py-3 rounded-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Leaf size={16} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              green girl<span className="text-primary font-normal">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">Boutique Story</a>
            <a href="#bento" className="text-foreground/80 hover:text-foreground transition-colors">Curated Bento</a>
            <a href="#shop" className="text-foreground/80 hover:text-foreground transition-colors">Products</a>
            <Link href="/admin/dashboard" className="text-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors">
              Admin Portal <ExternalLink size={12} />
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setToastMessage(cartCount > 0 ? `Opening checkout with ${cartCount} items...` : "Your gift bag is empty!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              }}
              className="glass-button px-4 py-2 flex items-center gap-2 text-sm select-none"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline font-medium">Gift Bag</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-foreground hover:bg-white/20 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 mx-2 p-6 rounded-3xl glass-panel md:hidden animate-fadeIn flex flex-col gap-4">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-1 text-foreground/80 hover:text-foreground"
            >
              Boutique Story
            </a>
            <a 
              href="#bento" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-1 text-foreground/80 hover:text-foreground"
            >
              Curated Bento
            </a>
            <a 
              href="#shop" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-1 text-foreground/80 hover:text-foreground"
            >
              Products
            </a>
            <hr className="border-foreground/10 my-2" />
            <Link 
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold py-1 text-primary flex items-center gap-2"
            >
              Admin Dashboard <ExternalLink size={16} />
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-16">
        
        {/* Hero Banner Section */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-16">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-mint text-primary text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="animate-pulse" />
              Est. 2026 Boutique Gift Shop
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Thoughtful Gifts.<br />
              <span className="text-primary">Hand-Crafted</span> Stories.
            </h1>
            
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-2xl">
              At Green Girl, we design exquisite botanical packages, artisan ceramics, and bespoke care boxes. Every piece is sourced ethically, wrapped sustainably, and delivered with standard-setting love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a href="#bento" className="tactile-btn-primary select-none flex items-center justify-center gap-2 text-base">
                Explore Curated Gifts <ArrowRight size={18} />
              </a>
              <a href="#shop" className="glass-button select-none flex items-center justify-center gap-2 text-base">
                Browse Collection
              </a>
            </div>
          </div>

          {/* Interactive Hero Graphic Frame */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-[2.5rem] p-8 glass-panel flex flex-col justify-between border-2 border-white/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/40 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-accent-mint flex items-center justify-center text-primary border border-white/50">
                  <Gift size={22} />
                </div>
                <div className="glass-panel px-3 py-1 rounded-full text-xs font-bold text-primary">
                  100% Organic Content
                </div>
              </div>

              <div className="my-6">
                <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">Featured Package</p>
                <h3 className="text-2xl font-bold text-foreground mb-2">The Emerald Comfort Box</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Relaxing wild sage bundle, a ceramic incense plate, organic matches, and eucalyptus mist.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-foreground/5">
                <span className="text-2xl font-bold text-primary">$72.00</span>
                <button 
                  onClick={() => handleAddToCart("The Emerald Comfort Box")}
                  className="glass-button px-4 py-2 text-xs font-bold tracking-wide uppercase"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Showcase Section */}
        <section id="bento" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Hand-Crafted Curation</h2>
            <p className="text-foreground/70 text-sm sm:text-base">Explore our Bento module designed layout showcasing signature collections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: Large Signature Box (span-2 cols, span-2 rows on large screens) */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl p-8 bento-card border-white/40 flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-mint/40 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                  <Sparkles size={12} /> Seasonal Release
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4 max-w-md text-foreground">
                  The Deluxe Forest Botanical Gift Set
                </h3>
                <p className="text-foreground/80 text-base leading-relaxed max-w-lg mb-6">
                  Our masterpiece collection. Contains three varieties of nursery-grown baby ferns, organic potting media, a solid copper watering sprayer, and an instruction journal bound in handmade mulberry paper.
                </p>
                
                <ul className="flex flex-wrap gap-2 mb-6 max-w-md">
                  <li className="px-3 py-1 rounded-lg bg-white/30 text-xs font-medium border border-white/20">Hand-harvested in Oregon</li>
                  <li className="px-3 py-1 rounded-lg bg-white/30 text-xs font-medium border border-white/20">Biodegradable custom carton</li>
                  <li className="px-3 py-1 rounded-lg bg-white/30 text-xs font-medium border border-white/20">Includes hand-written note</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-foreground/5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-foreground">$120.00</span>
                  <span className="text-sm line-through text-foreground/50">$145.00</span>
                </div>
                <button 
                  onClick={() => handleAddToCart("The Deluxe Forest Botanical Gift Set")}
                  className="tactile-btn-primary w-full sm:w-auto select-none"
                >
                  Secure Botanical Package
                </button>
              </div>
            </div>

            {/* Bento 2: Botanical Category (Blush background) */}
            <div className="rounded-3xl p-8 bento-card bg-accent-blush/40 border-white/40 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center text-primary mb-6 shadow-sm border border-white/50">
                  <Leaf size={18} />
                </div>
                <h4 className="text-xl font-bold mb-2">Thriving Greens</h4>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  Carefully packed rooted houseplants designed to bring tranquility to any space.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-foreground/60">3 items available</span>
                <a href="#shop" className="text-primary hover:text-primary-hover flex items-center gap-1 text-sm font-semibold">
                  View <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Bento 3: Ceramics (Gold background) */}
            <div className="rounded-3xl p-8 bento-card bg-accent-gold/40 border-white/40 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center text-primary mb-6 shadow-sm border border-white/50">
                  <Gift size={18} />
                </div>
                <h4 className="text-xl font-bold mb-2">Artisan Pottery</h4>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  Individually thrown stoneware dishes, incense dishes, and speckled bud vases.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-foreground/60">100% Unique Batches</span>
                <a href="#shop" className="text-primary hover:text-primary-hover flex items-center gap-1 text-sm font-semibold">
                  View <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Bento 4: Custom tags (Mint background) */}
            <div className="md:col-span-3 rounded-3xl p-8 bento-card bg-accent-mint/30 border-white/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-white/50 shrink-0">
                  <Smile size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Personalized Hand-Written Gift Messages</h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Leave a custom greeting at checkout. We write each envelope with calligraphy and real botanical ink.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setToastMessage("Premium greeting option will be configurable during checkout.");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="glass-button py-2.5 px-5 text-sm shrink-0 w-full md:w-auto"
              >
                Learn More
              </button>
            </div>

          </div>
        </section>

        {/* Catalog Showcase Section */}
        <section id="shop" className="flex flex-col gap-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight">The Boutique Catalog</h2>
              <p className="text-foreground/70 text-sm sm:text-base">Filter by category to explore our small-batch curated offerings.</p>
            </div>

            {/* Filtering tab bar */}
            <div className="glass-panel p-1.5 rounded-full inline-flex self-start gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="glass-panel rounded-[2rem] p-6 flex flex-col justify-between border-2 border-white/70 relative overflow-hidden group hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  {/* Decorative pastel banner inside card */}
                  <div className={`w-full aspect-[4/3] rounded-2xl ${product.color} mb-6 flex items-center justify-center p-8 border border-white/30 relative overflow-hidden`}>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {product.tag}
                    </div>
                    
                    {/* SVG representation of product */}
                    <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center text-primary transform group-hover:scale-110 transition-transform duration-300">
                      {product.category === "boxes" ? <Gift size={28} /> : product.category === "plants" ? <Leaf size={28} /> : <Sparkles size={28} />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
                    <span className="text-xs text-foreground/60 flex items-center gap-0.5">★ {product.rating}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-6">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                  <span className="text-xl font-extrabold text-foreground">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product.name)}
                    className="glass-button px-4 py-2 text-xs font-bold uppercase select-none"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Boutique Core Values banner */}
        <section className="glass-panel p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 border-2 border-white/60">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-mint flex items-center justify-center text-primary font-semibold">
              <Leaf size={22} />
            </div>
            <h4 className="text-lg font-bold text-foreground">Sustainably Crafted</h4>
            <p className="text-xs text-foreground/75 leading-relaxed max-w-xs">
              Everything in our store is made from organic, biodegradable, or recyclable materials. No plastic.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-blush flex items-center justify-center text-primary font-semibold">
              <Heart size={22} />
            </div>
            <h4 className="text-lg font-bold text-foreground">Ethical Small-Batch</h4>
            <p className="text-xs text-foreground/75 leading-relaxed max-w-xs">
              We collaborate with indie ceramicists and nurseries to provide fair compensation and support small crafts.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center text-primary font-semibold">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-lg font-bold text-foreground">Secure Packaging</h4>
            <p className="text-xs text-foreground/75 leading-relaxed max-w-xs">
              Specialized insulation and soil-protection layers ensure your botanicals arrive fresh, hydrated, and ready.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 py-12 px-6 border-t border-foreground/5 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
              <Leaf size={12} />
            </div>
            <span className="font-bold text-sm tracking-tight text-foreground">Green Girl Gift Co.</span>
          </div>

          <p className="text-xs text-foreground/50">
            © 2026 Green Girl boutique. Crafted for aesthetic, modern living. Secure admin panel gateway is located at /admin/login.
          </p>

          <div className="flex gap-6 text-xs font-semibold text-foreground/60">
            <a href="#about" className="hover:text-primary transition-colors">Story</a>
            <a href="#shop" className="hover:text-primary transition-colors">Catalog</a>
            <Link href="/admin/login" className="hover:text-primary transition-colors">Admin Gateway</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
