import React from "react";
import { 
  Gift, 
  Truck, 
  RefreshCw,
  Mail
} from "lucide-react";
import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import NewsletterForm from "./NewsletterForm";

export default async function Home() {
  const staticProducts = [
    {
      id: "1",
      name: "Stitch Cute Plush Toy",
      category: "Toys & Teddies",
      price: 2400,
      image: "/images/stitch_toy.png",
      tag: "TRENDING",
      rating: 4.9,
      description: "A super soft, premium quality Stitch plush toy. Crafted with extra plush materials and fine detailed stitching, making it the perfect luxury gift for Disney collectors and children alike."
    },
    {
      id: "2",
      name: "Customized Ceramic Mug + Gift Box",
      category: "Customized Gifts",
      price: 1950,
      image: "/images/custom_mug.png",
      tag: "EXQUISITE",
      rating: 4.8,
      description: "Matte-finished customized ceramic mug packaged in an elegant, signature dark gift box. Perfect for coffee lovers, workspace decor, or a high-quality personalized gift."
    },
    {
      id: "3",
      name: "Handmade Rose Bouquet Hamper",
      category: "Gift Hampers",
      price: 4500,
      image: "/images/rose_hamper.png",
      tag: "POPULAR",
      rating: 5.0,
      description: "A premium floral arrangement featuring handmade, selected red and pink roses beautifully displayed inside a dark boutique gift box, accompanied by custom gift treats."
    }
  ];

  let products = [];

  try {
    // Query dynamic database products and merge seamlessly with remaining fallback mock items
    const activeProducts = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

    const dbProductsMapped = (activeProducts || []).map((p) => ({
      ...p,
      image: p.image && p.image.trim() !== "" ? p.image : "/images/placeholder.jpg"
    }));

    products = [...dbProductsMapped, ...staticProducts];
  } catch (error) {
    console.warn("Database fetch failed or timed out. Falling back to static mockup cards.", error);
    products = staticProducts;
  }

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col select-none overflow-x-hidden bg-[#0D110D]">
      <head>
        <title>Green Girl — Luxury Gift Shop & Bespoke Hampers Sri Lanka</title>
        <meta name="description" content="Premium dark luxury storefront curating ceramic art, custom wooden crate gift hampers, and plush toys in Sri Lanka." />
        <meta name="keywords" content="luxury gifts, hampers, flowers, custom gifts, colombo, sri lanka, greengirl" />
        <meta property="og:title" content="Green Girl — Luxury Gift Shop & Bespoke Hampers Sri Lanka" />
        <meta property="og:description" content="Premium dark luxury storefront curating ceramic art, custom wooden crate gift hampers, and plush toys in Sri Lanka." />
        <meta property="og:image" content="/hero-gift-shop.jpg" />
      </head>
      
      {/* Interactive Hero Banner Section */}
      <HeroSection />

      {/* Boutique Values Row */}
      <section id="specials" className="relative w-full max-w-5xl mx-auto px-4 py-16 scroll-mt-24">
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
      <section id="collections" className="relative w-full max-w-[1400px] mx-auto px-4 py-20 scroll-mt-24">
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
            Showing {products.length} items
          </span>
        </div>

        {/* Grid Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Curator's Note Section */}
      <section id="about" className="relative w-full max-w-5xl mx-auto px-4 py-16 scroll-mt-24">
        <div className="hype-glass p-8 md:p-12 border border-white/0.05 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          
          <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
            <img 
              src="/images/hero_banner.png" 
              alt="Creative Director Nisha Ranasinghe details showing premium dark studio setting for Greengirl Sri Lanka" 
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
            <p className="text-xs text-neutral-450">
              Subscribe to receive notification of private product drops, custom wooden crate arrivals, and private collections.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal />
    </div>
  );
}
