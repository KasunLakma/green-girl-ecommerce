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
  AlertCircle,
  PlusCircle,
  Save,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock products database for admin CRUD demo
const INITIAL_PRODUCTS = [
  { id: "1", name: "The Picnic & Clay Crate 🧺", price: 68.0, stock: 24, category: "Curated Boxes" },
  { id: "2", name: "Potted Chinese Money Plant 🌿", price: 24.0, stock: 42, category: "Botanicals" },
  { id: "3", name: "Speckled Oatmeal Clay Mug ☕", price: 32.0, stock: 9, category: "Ceramics" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Curated Boxes");
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
    setCategory("Curated Boxes");
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
    <div className="relative min-h-screen flex flex-col p-6 gap-8">
      {/* Background soft pastel radial elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#dbece2] opacity-35 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#fcefe9] opacity-30 blur-[150px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto glass-panel px-8 py-4 rounded-full flex items-center justify-between border-2 border-white/60 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#4e6b5c] flex items-center justify-center text-white">
            <Leaf size={16} />
          </div>
          <div>
            <h1 className="serif-heading text-sm font-black tracking-widest text-[#21352b] uppercase">Green Girl 🌸</h1>
            <p className="text-[9px] font-bold tracking-widest text-[#4e6b5c] uppercase">Admin Workspace Board</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider bg-white/50 border border-white/80 px-3.5 py-1.5 rounded-full text-[#4e6b5c]">
            ● Active Secured Session
          </span>
          <button 
            onClick={handleLogout}
            className="glass-button px-4.5 py-2 text-[10px] flex items-center gap-2 select-none"
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </header>

      {/* Main layout: Bento Grid layout */}
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Stat Cards - Bento Grid Row 1 */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-[#dbece2] flex items-center justify-center text-[#21352b] border border-white/50 shadow-sm">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#21352b]/50 uppercase tracking-widest">Total Sales</p>
              <h3 className="serif-heading text-xl font-bold">$12,490.00</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fcefe9] flex items-center justify-center text-[#21352b] border border-white/50 shadow-sm">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#21352b]/50 uppercase tracking-widest">Active Orders</p>
              <h3 className="serif-heading text-xl font-bold">42 Transacted</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fcf2e3] flex items-center justify-center text-[#21352b] border border-white/50 shadow-sm">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#21352b]/50 uppercase tracking-widest">Inventory Nodes</p>
              <h3 className="serif-heading text-xl font-bold">{totalStock} Units</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4.5">
            <div className="w-11 h-11 rounded-2xl bg-[#4e6b5c]/10 flex items-center justify-center text-[#4e6b5c] border border-white/50 shadow-sm">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#21352b]/50 uppercase tracking-widest">Valuation Sum</p>
              <h3 className="serif-heading text-xl font-bold">${totalValue.toFixed(2)}</h3>
            </div>
          </div>

        </section>

        {/* Action center and Inventory list - Bento Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Inventory Manager (Table Layout inside Glass panel, col-span-8) */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-[32px] border-2 border-white/60 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="serif-heading text-xl text-[#21352b]">Physical Catalog CRUD</h3>
                <p className="sans-body text-xs text-[#21352b]/60">Review, modify, or terminate physical inventory assets.</p>
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/40 border border-white/70">
                {products.length} Items Listed
              </span>
            </div>

            <div className="overflow-x-auto w-full mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#21352b]/5 text-[10px] font-bold text-[#21352b]/50 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-center">Stock</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-[#21352b]/5 hover:bg-white/10 transition-colors">
                      <td className="py-4 pl-2 font-bold text-[#21352b]">{product.name}</td>
                      <td className="py-4 text-[#21352b]/70 text-[10px] uppercase tracking-wide">
                        <span className="px-2.5 py-1.5 rounded-lg bg-white/50 border border-white/60">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 text-right text-[#21352b] font-black">${product.price.toFixed(2)}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          product.stock < 10 
                            ? "bg-red-500/10 text-red-800 border border-red-500/20" 
                            : "bg-emerald-500/10 text-emerald-800 border border-emerald-500/20"
                        }`}>
                          {product.stock} pieces
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2.5 rounded-xl bg-white/60 border border-white/80 text-[#21352b]/70 hover:text-[#4e6b5c] hover:border-[#4e6b5c]/20 transition-all active:scale-90"
                            title="Edit Product"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 hover:bg-red-500/20 transition-all active:scale-90"
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
                      <td colSpan={5} className="py-8 text-center text-[#21352b]/40 text-xs font-semibold">
                        No product assets currently online.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form to Add / Edit product (col-span-4) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 rounded-[32px] border-2 border-white/60 flex flex-col gap-6">
            <div>
              <h3 className="serif-heading text-lg text-[#21352b]">
                {editingId ? "Update Product Record" : "Append Product Node"}
              </h3>
              <p className="sans-body text-xs text-[#21352b]/60">
                {editingId ? "Update specific details for the catalog node." : "Add a new seasonal boutique item details."}
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6b5c] tracking-widest uppercase pl-1">
                  Product Label
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Handmade terracotta vase"
                  className="w-full px-4.5 py-3 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all text-[#21352b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#4e6b5c] tracking-widest uppercase pl-1">
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
                    className="w-full px-4.5 py-3 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all text-[#21352b]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#4e6b5c] tracking-widest uppercase pl-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="25"
                    className="w-full px-4.5 py-3 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all text-[#21352b]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6b5c] tracking-widest uppercase pl-1">
                  Boutique Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all text-[#21352b]"
                >
                  <option value="Curated Boxes">Curated Boxes</option>
                  <option value="Botanicals">Living Botanicals</option>
                  <option value="Ceramics">Artisan Ceramics</option>
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
                    className="glass-button w-1/3 flex items-center justify-center gap-1 py-3.5 text-[10px] font-bold text-red-700 border-red-500/20"
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
        <section className="glass-panel p-6 md:p-8 rounded-[32px] border border-white/40 flex flex-col gap-5">
          <div>
            <h3 className="serif-heading text-base text-[#21352b] uppercase tracking-wider">Live Checkout Intents Log</h3>
            <p className="sans-body text-xs text-[#21352b]/60">Recent customer interactions routed through /api/website/checkout</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#21352b]">Order #gg_web_2012</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-[#21352b]/80 mt-1">Jane Doe (Deluxe Fern Set)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-[#21352b]/50 border-t border-[#21352b]/5 pt-2 mt-1">
                <span>10 minutes ago</span>
                <span className="font-black text-[#21352b]">$120.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#21352b]">Order #gg_web_2011</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-[#21352b]/80 mt-1">Alex Miller (Chinese Pilea Plant)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-[#21352b]/50 border-t border-[#21352b]/5 pt-2 mt-1">
                <span>1 hour ago</span>
                <span className="font-black text-[#21352b]">$24.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#21352b]">Order #gg_web_2010</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-semibold text-[#21352b]/80 mt-1">Sarah Connor (Speckled Oat Mug)</p>
              <div className="flex justify-between items-center text-[9px] font-bold tracking-wider text-[#21352b]/50 border-t border-[#21352b]/5 pt-2 mt-1">
                <span>3 hours ago</span>
                <span className="font-black text-[#21352b]">$32.00</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer bar */}
      <footer className="mt-8 py-6 text-center text-[9px] font-bold tracking-widest text-[#21352b]/45 border-t border-[#21352b]/5 max-w-7xl mx-auto w-full uppercase">
        © 2026 Green Girl Admin Console. Cozy hand-made gift platforms. Unrestricted admin workspace bounds active.
      </footer>
    </div>
  );
}
