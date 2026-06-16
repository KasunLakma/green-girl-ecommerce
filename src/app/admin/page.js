"use client";
import React, { useState, useEffect } from "react";

const CATEGORY_MAP = {
  Customized: "Customized Gifts",
  Bouquets: "Flower Bouquets",
  Toys: "Toys & Teddies",
  Hampers: "Gift Hampers"
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Customized",
    description: "",
    colors: "",
    sizes: "",
    imageAlt: ""
  });

  // 1. Fetch live products from backend API
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle form submission to POST API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const newProduct = await res.json();
        // Reset form and refresh table list immediately
        setFormData({
          name: "",
          price: "",
          category: "Customized",
          description: "",
          colors: "",
          sizes: "",
          imageAlt: ""
        });
        setProducts([newProduct, ...products]);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Products Management</h1>
        <p className="text-xs text-neutral-400">Create, edit, and organize your storefront catalog item offerings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Dynamic Input Product Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">+ New Product Form</h2>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Product Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Handmade Cute Diary Pack"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Price (Rs.)</label>
              <input
                type="number"
                required
                placeholder="e.g. 1800"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all [&>option]:bg-[#0D110D] [&>option]:text-white"
              >
                <option value="Customized">Customized Gifts</option>
                <option value="Bouquets">Flower Bouquets</option>
                <option value="Toys">Toys & Teddies</option>
                <option value="Hampers">Gift Hampers</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Description</label>
            <textarea
              rows={3}
              placeholder="Write a brief, compelling brand story..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Variations Section */}
          <div className="border-t border-white/0.05 pt-4 flex flex-col gap-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Variations / Attributes</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Available Colors</label>
                <input
                  type="text"
                  placeholder="e.g. Blue, Red, Black"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Available Sizes</label>
                <input
                  type="text"
                  placeholder="e.g. Small, Medium, Large"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Image SEO Alt Text Section */}
          <div className="border-t border-white/0.05 pt-4 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Image SEO Alt Text *</label>
            <input
              type="text"
              required
              placeholder="e.g. Handmade rose bouquet hamper with red roses"
              value={formData.imageAlt}
              onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] disabled:opacity-50 font-bold text-xs tracking-widest py-3.5 rounded-xl transition-all uppercase"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Real-time Connected Inventory Table */}
        <div className="lg:col-span-2 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">📦 Active Inventory</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Gift Title</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Category</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Price</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Variations (Colors/Sizes)</th>
                  <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">SEO Alt State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/0.02">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-neutral-400 italic">No products found. Add your first item.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/0.01 transition-colors">
                      <td className="py-3.5 text-xs font-semibold text-neutral-100">{product.name}</td>
                      <td className="py-3.5 text-xs text-neutral-300">
                        {CATEGORY_MAP[product.category] || product.category}
                      </td>
                      <td className="py-3.5 text-xs font-medium text-neutral-200">Rs. {product.price.toLocaleString()}</td>
                      <td className="py-3.5 text-xs text-neutral-300">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-neutral-400">Colors: {product.colors || "N/A"}</span>
                          <span className="text-[10px] text-neutral-400">Sizes: {product.sizes || "N/A"}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-xs">
                        {product.imageAlt ? (
                          <span className="bg-[#A1B399]/10 text-[#B2C4AC] px-2.5 py-1 rounded-full text-[9px] font-bold border border-[#A1B399]/10 max-w-[150px] inline-block truncate" title={product.imageAlt}>
                            {product.imageAlt}
                          </span>
                        ) : (
                          <span className="text-neutral-500 italic text-[10px]">Missing Alt</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
