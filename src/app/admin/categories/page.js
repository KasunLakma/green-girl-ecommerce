"use client";
import React, { useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { name: "Customized Gifts", slug: "customized-gifts", status: "Active", items: 4 },
    { name: "Flower Bouquets", slug: "flower-bouquets", status: "Active", items: 1 },
    { name: "Toys & Teddies", slug: "toys-teddies", status: "Active", items: 2 },
    { name: "Gift Hampers", slug: "gift-hampers", status: "Active", items: 3 }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    ogImage: ""
  });
  const [updatingSeo, setUpdatingSeo] = useState(false);
  const [seoSuccess, setSeoSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;
    
    setCategories((prev) => [
      ...prev,
      {
        name: formData.name,
        slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
        status: "Active",
        items: 0
      }
    ]);
    setFormData({ name: "", slug: "" });
  };

  const handleSeoSubmit = (e) => {
    e.preventDefault();
    setUpdatingSeo(true);
    setTimeout(() => {
      setUpdatingSeo(false);
      setSeoSuccess(true);
      setTimeout(() => setSeoSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn text-neutral-100">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Category Management</h1>
        <p className="text-xs text-neutral-400">Create, structure, and audit boutique product curation classifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Category Creation Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">+ New Category</h2>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Category Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Wooden Crafts"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Category Slug / Description</label>
            <input
              type="text"
              required
              placeholder="e.g. wooden-crafts"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] font-bold text-xs tracking-widest py-3.5 rounded-xl transition-all uppercase"
          >
            Create Category
          </button>
        </form>

        {/* Category Table List */}
        <div className="lg:col-span-2 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">🏷️ Active Classifications</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Category Name</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Slug</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Total Items</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/0.02">
                {categories.map((category) => (
                  <tr key={category.slug} className="hover:bg-white/0.01 transition-colors">
                    <td className="py-3.5 text-xs font-semibold text-neutral-100">{category.name}</td>
                    <td className="py-3.5 text-xs text-neutral-300 font-mono">{category.slug}</td>
                    <td className="py-3.5 text-xs font-medium text-neutral-200">{category.items} products</td>
                    <td className="py-3.5 text-xs">
                      <span className="bg-[#A1B399]/10 text-[#B2C4AC] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#A1B399]/10">
                        • {category.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Global Website SEO & Meta Tag Updates Control Panel */}
      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">🌐 Global Website SEO & Meta Tag Updates</h2>
          {seoSuccess && (
            <span className="text-[10px] text-emerald-400 font-bold animate-pulse">
              ✓ META CONFIGURATION UPDATED SUCCESSFULLY
            </span>
          )}
        </div>

        <form onSubmit={handleSeoSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Global Meta Title</label>
            <input
              type="text"
              required
              placeholder="Greengirl Boutique | Premium Customized Gifts & Hampers"
              value={seoData.title}
              onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Global Meta Description</label>
            <input
              type="text"
              required
              placeholder="Shop the trendiest Stitch plush toys, personalized ceramic mugs, and custom gifts in Sri Lanka."
              value={seoData.description}
              onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Social Share Thumbnail Image URL (OG Tag)</label>
            <input
              type="url"
              required
              placeholder="https://greengirl.com/og-thumbnail.jpg"
              value={seoData.ogImage}
              onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="md:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              disabled={updatingSeo}
              className="bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] disabled:opacity-50 font-bold text-xs tracking-widest px-6 py-3.5 rounded-xl transition-all uppercase whitespace-nowrap"
            >
              {updatingSeo ? "Updating..." : "UPDATE META CONFIGURATION"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
