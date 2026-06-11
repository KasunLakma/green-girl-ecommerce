"use client";

import React, { useState } from "react";
import { 
  Leaf, 
  LogOut, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  CheckCircle,
  PlusCircle,
  Save,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock products database for admin CRUD demo matching luxury catalog
const INITIAL_PRODUCTS = [
  { id: "1", name: "The Obsidian & Moss Crate 🖤", price: 110.0, stock: 12, category: "Premium Crates" },
  { id: "2", name: "Volcanic Clay Potted Monstera 🌿", price: 64.0, stock: 25, category: "Volcanic Flora" },
  { id: "3", name: "Textured Stoneware Cocoa Cup ☕", price: 38.0, stock: 8, category: "Obsidian Clay" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Premium Crates");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Stats summary data
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);

  const handleLogout = () => {
    // Delete the token cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    if (editingId) {
      // Edit existing product
      setProducts(prev => prev.map(p => p.id === editingId ? {
        ...p,
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category
      } : p));
      setEditingId(null);
    } else {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category
      };
      setProducts(prev => [...prev, newProduct]);
    }

    // Reset input fields
    setName("");
    setPrice("");
    setStock("");
    setCategory("Premium Crates");
  };

  const handleEdit = (product: typeof INITIAL_PRODUCTS[0]) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="relative min-h-screen flex flex-col p-6 gap-8 bg-[#0B0F12] text-white">
      
      {/* Background ambient lighting overlays (matching the storefront) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#10B981]/[0.01] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/[0.01] blur-[150px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto glass-panel px-8 py-4 rounded-full flex items-center justify-between border border-white/[0.08] relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-450 border border-emerald-500/10">
            <Leaf size={16} />
          </div>
          <div>
            <h1 className="serif-heading text-sm font-black tracking-widest text-white uppercase">Green Girl<span className="text-emerald-400">.</span></h1>
            <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Supervisor Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-emerald-400">
            ● Secure Console Connection
          </span>
          <button 
            onClick={handleLogout}
            className="glass-button px-4.5 py-2 text-[10px] flex items-center gap-2 select-none"
          >
            <LogOut size={12} className="text-emerald-450" /> Log Out
          </button>
        </div>
      </header>

      {/* Main layout: Bento Grid structure */}
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Stat Cards - Bento Grid Row 1 */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/[0.08] flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-white/[0.05]">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Sales</p>
              <h3 className="serif-heading text-xl font-bold text-white">$14,290.00</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/[0.08] flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-white/[0.05]">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Orders</p>
              <h3 className="serif-heading text-xl font-bold text-white">58 Fulfilled</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/[0.08] flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-white/[0.05]">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Inventory Nodes</p>
              <h3 className="serif-heading text-xl font-bold text-white">{totalStock} Units</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/[0.08] flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-450 border border-white/[0.05]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Valuation Sum</p>
              <h3 className="serif-heading text-xl font-bold text-white">${totalValue.toFixed(2)}</h3>
            </div>
          </div>

        </section>

        {/* Action center and Inventory list - Bento Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Inventory Manager (Table Layout inside Glass panel, col-span-8) */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-[28px] border border-white/[0.08] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="serif-heading text-xl text-white">Physical Catalog CRUD</h3>
                <p className="sans-body text-xs text-slate-400">Review, modify, or terminate physical inventory assets.</p>
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] text-slate-300">
                {products.length} Items Listed
              </span>
            </div>

            <div className="overflow-x-auto w-full mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-center">Stock</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pl-2 font-bold text-white">{product.name}</td>
                      <td className="py-4 text-slate-300 text-[10px] uppercase tracking-wide">
                        <span className="px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 text-right text-white font-black">${product.price.toFixed(2)}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          product.stock < 10 
                            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                            : "bg-emerald-500/10 text-emerald-450 border border-emerald-500/20"
                        }`}>
                          {product.stock} items
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-emerald-450 hover:border-emerald-500/20 transition-all active:scale-[0.95]"
                            title="Edit Product"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all active:scale-[0.95]"
                            title="Delete Product"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-xs font-semibold">
                        No product assets currently online.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form to Add / Edit product (col-span-4) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 rounded-[28px] border border-white/[0.08] flex flex-col gap-6">
            <div>
              <h3 className="serif-heading text-lg text-white">
                {editingId ? "Update Product Record" : "Append Product Node"}
              </h3>
              <p className="sans-body text-xs text-slate-450">
                {editingId ? "Update specific details for the catalog node." : "Add a new seasonal boutique item details."}
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-550 tracking-widest uppercase pl-1">
                  Product Label
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Matte black tea vessel"
                  className="w-full px-4.5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.04] transition-all text-white placeholder-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-550 tracking-widest uppercase pl-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="45.00"
                    className="w-full px-4.5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.04] transition-all text-white placeholder-slate-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-550 tracking-widest uppercase pl-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="25"
                    className="w-full px-4.5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.04] transition-all text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-550 tracking-widest uppercase pl-1">
                  Boutique Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-[#0B0F12] text-xs font-semibold focus:outline-none focus:border-emerald-500 transition-all text-white"
                >
                  <option value="Premium Crates">Premium Crates</option>
                  <option value="Volcanic Flora">Volcanic Flora</option>
                  <option value="Obsidian Clay">Obsidian Clay</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setName("");
                      setPrice("");
                      setStock("");
                    }}
                    className="glass-button w-1/3 flex items-center justify-center gap-1 py-3.5 text-[10px] font-bold text-red-400 border-red-500/20"
                  >
                    <X size={12} /> Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="cute-btn-primary flex-1 select-none flex items-center justify-center gap-2 py-3.5 text-[10px] font-bold tracking-widest uppercase"
                >
                  {editingId ? <Save size={14} /> : <PlusCircle size={14} />}
                  {editingId ? "Save Changes" : "Commit Node"}
                </button>
              </div>
            </form>
          </div>

        </section>

        {/* Recent Checkout Activities - Bento Row 3 */}
        <section className="glass-panel p-6 md:p-8 rounded-[28px] border border-white/[0.08] flex flex-col gap-5">
          <div>
            <h3 className="serif-heading text-base text-white uppercase tracking-wider">Live Checkout Intents Log</h3>
            <p className="sans-body text-xs text-slate-400">Recent customer interactions processed through API gateways.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Order #gg_web_2512</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mt-1">Jane Doe (Obsidian Moss Box)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-slate-500 border-t border-white/5 pt-2 mt-1">
                <span>12 minutes ago</span>
                <span className="font-black text-white">$110.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Order #gg_web_2511</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mt-1">Alex Miller (Volcanic Monstera)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-slate-500 border-t border-white/5 pt-2 mt-1">
                <span>1 hour ago</span>
                <span className="font-black text-white">$64.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Order #gg_web_2510</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mt-1">Sarah Connor (Textured Clay Cup)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-slate-500 border-t border-white/5 pt-2 mt-1">
                <span>3 hours ago</span>
                <span className="font-black text-white">$38.00</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer bar */}
      <footer className="mt-8 py-6 text-center text-[9px] font-bold tracking-widest text-slate-550 border-t border-white/5 max-w-7xl mx-auto w-full uppercase">
        © 2026 Green Girl Admin Console. Restricted access environment.
      </footer>
    </div>
  );
}
