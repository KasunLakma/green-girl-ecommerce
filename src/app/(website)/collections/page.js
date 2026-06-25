import React from "react";
import { prisma } from "../../../lib/prisma";
import ProductCard from "../ProductCard";
import QuickViewModal from "../QuickViewModal";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryQuery = resolvedSearchParams?.category;

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

  // Filter products by category if query param is set
  if (categoryQuery) {
    products = products.filter(p => {
      const c = (p.category || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      const d = (p.description || "").toLowerCase();
      if (categoryQuery === "custom-gifts") {
        return c.includes("custom") || n.includes("custom") || d.includes("custom");
      }
      if (categoryQuery === "gift-hampers") {
        return c.includes("hamper") || n.includes("hamper") || d.includes("hamper");
      }
      if (categoryQuery === "toys-and-teddies") {
        return c.includes("toy") || c.includes("teddy") || c.includes("merch") || n.includes("toy") || n.includes("teddy") || n.includes("stitch") || d.includes("toy") || d.includes("teddy");
      }
      return true;
    });
  }

  // Filter Premium vs Standard products
  const premiumProducts = products.filter(p => {
    const desc = (p.description || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    return desc.includes("premium") || desc.includes("luxury") || desc.includes("exquisite") || desc.includes("bespoke") ||
           name.includes("premium") || name.includes("luxury") || name.includes("custom") ||
           category.includes("specials") || category.includes("gift hampers");
  });

  const standardProducts = products.filter(p => !premiumProducts.includes(p));

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="flex flex-col gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase">
            {categoryQuery ? `${categoryQuery.replace("-", " ")} Catalog` : "Curated Catalog"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            {categoryQuery ? categoryQuery.replace("-", " ") : "Our Collections"}
          </h1>
          <p className="text-xs text-neutral-400 max-w-lg mt-1">
            {categoryQuery 
              ? `Browse through our exclusive selection of ${categoryQuery.replace("-", " ")} curated with premium quality.`
              : "Browse through our premium selection of luxury gift hampers, customized ceramic mugs, and bespoke collectibles."
            }
          </p>
        </div>

        {/* Premium Collection */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B2C4AC]">✨</span> Premium Collection
            </h2>
            <span className="text-[10px] text-[#B2C4AC] font-black uppercase tracking-widest bg-[#B2C4AC]/10 px-3 py-1 rounded-full">
              {premiumProducts.length} Exclusive Items
            </span>
          </div>

          {premiumProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500 italic">No premium items currently available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {premiumProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

        {/* Standard Collection */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B2C4AC]">🌿</span> Standard Collection
            </h2>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {standardProducts.length} Items
            </span>
          </div>

          {standardProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500 italic">No standard items currently available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {standardProducts.map((product, idx) => (
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
