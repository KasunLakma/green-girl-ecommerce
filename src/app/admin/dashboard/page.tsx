"use client";

import React, { useState } from "react";
import { 
  Leaf, 
  LogOut, 
  Plus, 
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
  { id: "1", name: "The Sage Retreat Box", price: 68.0, stock: 24, category: "Curated Boxes" },
  { id: "2", name: "Spotted Pilea Peperomioides", price: 24.0, stock: 42, category: "Botanicals" },
  { id: "3", name: "Speckled Oat Ceramic Mug", price: 32.0, stock: 9, category: "Ceramics" },
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
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-mint/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blush/25 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto glass-panel px-6 py-4 rounded-full flex items-center justify-between border-2 border-white/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Leaf size={16} />
          </div>
          <div>
            <h1 className="text-sm font-black text-foreground">Green Girl Workspace</h1>
            <p className="text-[10px] text-foreground/50">Production-Ready Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs font-bold bg-white/50 border border-white/80 px-3 py-1.5 rounded-full text-primary">
            ● Active Admin Node
          </span>
          <button 
            onClick={handleLogout}
            className="glass-button px-4 py-2 text-xs font-bold uppercase flex items-center gap-2 select-none"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </header>

      {/* Main layout: Bento Grid layout */}
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Stat Cards - Bento Grid Row 1 */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-mint/50 flex items-center justify-center text-primary">
              <DollarSign size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wide">Total Sales</p>
              <h3 className="text-xl font-black text-foreground">$12,490.00</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-blush/50 flex items-center justify-center text-primary">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wide">Checkout Intents</p>
              <h3 className="text-xl font-black text-foreground">42 Active</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-gold/50 flex items-center justify-center text-primary">
              <Package size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wide">Total Inventory</p>
              <h3 className="text-xl font-black text-foreground">{totalStock} units</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wide">Assets Valuation</p>
              <h3 className="text-xl font-black text-foreground">${totalValue.toFixed(2)}</h3>
            </div>
          </div>

        </section>

        {/* Action center and Inventory list - Bento Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Inventory Manager (Table Layout inside Glass panel, col-span-8) */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-[2rem] border-2 border-white/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-foreground">Active Catalog CRUD</h3>
                <p className="text-xs text-foreground/60">Insert, update, or remove physical inventory nodes.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/40 border border-white/70">
                {products.length} Products
              </span>
            </div>

            <div className="overflow-x-auto w-full mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-foreground/5 text-xs font-bold text-foreground/50 uppercase">
                    <th className="pb-3 pl-2">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-center">Stock</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-foreground/5 hover:bg-white/10 transition-colors">
                      <td className="py-4 pl-2 font-bold text-foreground">{product.name}</td>
                      <td className="py-4 text-foreground/70 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-white/50 border border-white/60">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 text-right text-foreground font-black">${product.price.toFixed(2)}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          product.stock < 10 
                            ? "bg-red-500/10 text-red-700 border border-red-500/20" 
                            : "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                        }`}>
                          {product.stock} left
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-xl bg-white/60 border border-white/80 text-foreground/70 hover:text-primary hover:border-primary/20 transition-all active:scale-90"
                            title="Edit Product"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 hover:bg-red-500/20 transition-all active:scale-90"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-foreground/40 text-xs">
                        No products inside directory. Add one using the control form on the right.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form to Add / Edit product (col-span-4) */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-[2rem] border-2 border-white/60 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-black text-foreground">
                {editingId ? "Modify Product Node" : "Insert Product Node"}
              </h3>
              <p className="text-xs text-foreground/60">
                {editingId ? "Modify fields below to update existing record." : "Fill details below to update the live repository."}
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-foreground/60 tracking-wider uppercase pl-1">
                  Product Label
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lavender Aromatherapy spray"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs focus:outline-none focus:border-primary focus:bg-white/40 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground/60 tracking-wider uppercase pl-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="29.99"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs focus:outline-none focus:border-primary focus:bg-white/40 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground/60 tracking-wider uppercase pl-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="15"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs focus:outline-none focus:border-primary focus:bg-white/40 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-foreground/60 tracking-wider uppercase pl-1">
                  Boutique Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-xs focus:outline-none focus:border-primary focus:bg-white/40 transition-all"
                >
                  <option value="Curated Boxes">Curated Boxes</option>
                  <option value="Botanicals">Botanicals</option>
                  <option value="Ceramics">Ceramics</option>
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
                    className="glass-button w-1/3 flex items-center justify-center gap-1 py-3 text-xs font-bold uppercase text-red-700 border-red-500/20"
                  >
                    <X size={12} /> Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="tactile-btn-primary flex-1 select-none flex items-center justify-center gap-2 py-3 text-xs font-black tracking-wider uppercase"
                >
                  {editingId ? <Save size={14} /> : <PlusCircle size={14} />}
                  {editingId ? "Save Changes" : "Commit Node"}
                </button>
              </div>
            </form>
          </div>

        </section>

        {/* Recent Checkout Activities - Bento Row 3 */}
        <section className="glass-panel p-6 rounded-3xl border border-white/40 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-black text-foreground uppercase tracking-wide">Live Checkout Intents Log</h3>
            <p className="text-[11px] text-foreground/60">Recent customer interactions routed through /api/website/checkout</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">Order #9081</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-1 font-bold">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-bold text-foreground/80 mt-1">Jane Doe (Deluxe Forest Box)</p>
              <div className="flex justify-between items-center text-[10px] text-foreground/50 border-t border-foreground/5 pt-2 mt-1">
                <span>10 minutes ago</span>
                <span className="font-black text-foreground">$120.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">Order #9080</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-1 font-bold">
                  <CheckCircle size={8} /> Processed
                </span>
              </div>
              <p className="text-xs font-bold text-foreground/80 mt-1">Alex Miller (Spotted Pilea Plant)</p>
              <div className="flex justify-between items-center text-[10px] text-foreground/50 border-t border-foreground/5 pt-2 mt-1">
                <span>1 hour ago</span>
                <span className="font-black text-foreground">$24.00</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/30 border border-white/50 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">Order #9079</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 flex items-center gap-1 font-bold">
                  <AlertCircle size={8} /> Pending Auth
                </span>
              </div>
              <p className="text-xs font-bold text-foreground/80 mt-1">Sarah Connor (Speckled Ceramic Mug)</p>
              <div className="flex justify-between items-center text-[10px] text-foreground/50 border-t border-foreground/5 pt-2 mt-1">
                <span>3 hours ago</span>
                <span className="font-black text-foreground">$32.00</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer bar */}
      <footer className="mt-8 py-6 text-center text-[10px] text-foreground/45 border-t border-foreground/5 max-w-7xl mx-auto w-full">
        © 2026 Green Girl Admin Console. Strictly authorized use only. Safe Node.js runtime operations active.
      </footer>
    </div>
  );
}
