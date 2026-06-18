import React from "react";
import { prisma } from "../../../lib/prisma";
import ProductCard from "../ProductCard";
import QuickViewModal from "../QuickViewModal";
import { Sparkles, Percent, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SpecialsPage() {
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
    const activeProducts = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    const dbProductsMapped = (activeProducts || []).map((p) => ({
      ...p,
      image: p.image && p.image.trim() !== "" ? p.image : "/images/placeholder.jpg"
    }));
    products = dbProductsMapped.length > 0 ? dbProductsMapped : staticProducts;
  } catch (error) {
    console.warn("Database fetch failed. Falling back to static mockup cards.", error);
    products = staticProducts;
  }

  // Filter dynamic specials items
  const specialsList = products.filter(p => {
    const category = (p.category || "").toLowerCase();
    const tag = (p.tag || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    return category.includes("specials") || category.includes("hampers") || tag.includes("popular") || tag.includes("exquisite") || name.includes("rose") || name.includes("hamper");
  });

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Boutique Deals
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">Specials & Offers</h1>
          <p className="text-xs text-neutral-400 max-w-lg mt-1">
            Access private limited-time prices, signature gift crate bundles, and seasonal floral hampers with custom packages.
          </p>
        </div>

        {/* Promotional Banner Block */}
        <div className="hype-glass border border-[#B2C4AC]/20 p-6 sm:p-8 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_40px_rgba(178,196,172,0.1)] relative overflow-hidden bg-gradient-to-r from-[#172017]/50 via-[#0C120C]/35 to-transparent">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B2C4AC]/10 border border-[#B2C4AC]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(178,196,172,0.15)]">
              <Percent className="w-6 h-6 text-[#B2C4AC]" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-extrabold uppercase text-white tracking-wide">Exclusive Deals - Up to 20% Off</h3>
              <p className="text-xs text-neutral-400">Save instantly on hand-crafted ceramic mugs and botanical arrangements.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[#B2C4AC] font-bold tracking-widest uppercase bg-[#B2C4AC]/10 px-4 py-2.5 rounded-full border border-[#B2C4AC]/15">
            <Calendar className="w-3.5 h-3.5" /> Limited Offer
          </div>
        </div>

        {/* Grid Catalog */}
        <section className="flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              🔥 Limited-Time Specials & Offers
            </h2>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {specialsList.length} Active Deals
            </span>
          </div>

          {specialsList.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500 italic">No promotional items currently available. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {specialsList.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </section>

      </div>

      <QuickViewModal />
    </div>
  );
}
