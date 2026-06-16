"use client";

import React, { useState } from "react";
import { Plus, Trash2, ShoppingBag, Tag, Info } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Matcha Volcanic Clay Drink", category: "Drinks", price: 650, status: "Active" },
    { id: 2, name: "Ceramic Matte Sage Vase", category: "Specials", price: 2400, status: "Active" },
    { id: 3, name: "Brand Canvas Tote", category: "Merch", price: 1200, status: "Active" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Drinks",
    description: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      setErrorMessage("Please fill in both the Product Name and Price.");
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMessage("Price must be a valid positive number.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: priceNum,
      status: "Active"
    };

    setProducts((prev) => [newProduct, ...prev]);
    setFormData({
      name: "",
      price: "",
      category: "Drinks",
      description: ""
    });
    setErrorMessage("");
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Products Management</h1>
        <p className="text-sm text-neutral-400 mt-1.5">Create, edit, and organize your storefront catalog item offerings.</p>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Product Upload Form */}
        <div className="lg:col-span-1 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#A1B399]" />
              New Product Form
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">Publish a new luxury asset to your live storefront.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Form Fields */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Volcanic Clay Cleanser"
                className="bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs focus:border-[#A1B399]/40 focus:outline-none transition-all text-white placeholder-neutral-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Price (Rs.)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  className="bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs focus:border-[#A1B399]/40 focus:outline-none transition-all text-white placeholder-neutral-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs focus:border-[#A1B399]/40 focus:outline-none transition-all text-white [&>option]:bg-[#0D110D] [&>option]:text-white"
                >
                  <option value="Drinks">Drinks</option>
                  <option value="Specials">Specials</option>
                  <option value="Merch">Merch</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Write a brief, compelling brand story..."
                className="bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs focus:border-[#A1B399]/40 focus:outline-none transition-all text-white placeholder-neutral-600 resize-none"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-1.5 text-rose-400 text-[11px] bg-rose-950/20 border border-rose-900/30 rounded-lg p-3">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] font-bold text-xs tracking-widest py-3 rounded-xl transition-all uppercase mt-2 select-none cursor-pointer"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Right Side: Live Products List Table */}
        <div className="lg:col-span-2 bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#A1B399]" />
              Active Inventory
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">Review, audit, or delete active items currently exposed to the web.</p>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-neutral-450 pb-3">
                  <th className="py-3 px-4 font-semibold text-neutral-500">Product Title</th>
                  <th className="py-3 px-4 font-semibold text-neutral-500">Category</th>
                  <th className="py-3 px-4 font-semibold text-neutral-500">Price</th>
                  <th className="py-3 px-4 font-semibold text-neutral-500">Status</th>
                  <th className="py-3 px-4 font-semibold text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] text-xs">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-500 tracking-wider font-medium uppercase text-[10px]">
                      No active items found in database
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-white/0.01 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-medium text-white">{product.name}</td>
                      <td className="py-3.5 px-4 text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#A1B399]/70" />
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#B2C4AC]">
                        Rs. {product.price.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#A1B399]/10 text-[#B2C4AC] border border-[#A1B399]/20">
                          <span className="w-1 h-1 rounded-full bg-[#A1B399]" />
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-950/10 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
