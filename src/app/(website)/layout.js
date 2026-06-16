"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";

export const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default function WebsiteLayout({ children }) {
  const [activeTab, setActiveTab] = useState("HOME");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Stitch Cute Plush Toy",
      category: "Toys & Teddies",
      price: "Rs. 2,400",
      priceNum: 2400,
      image: "/images/stitch_toy.png",
      quantity: 1,
      alt: "Premium soft-stuffed Stitch cute plush toy"
    }
  ]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0;
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          priceNum: priceNum,
          image: product.image,
          quantity: 1,
          alt: product.alt
        }
      ];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);

  const navItems = ["HOME", "COLLECTIONS", "SPECIALS", "ABOUT"];

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart, cartOpen, setCartOpen }}>
      {/* Root layout container safely allowing pointer events to pass down */}
      <div className="relative min-h-screen w-full flex flex-col bg-[#0D110D] overflow-x-hidden pointer-events-auto">
        
        {/* Full-Width Fixed Header Overlay - z-[100] and w-full float */}
        <header className="fixed top-0 left-0 w-full z-[100] pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="w-full backdrop-blur-md bg-[#0D110D]/35 border border-white/[0.08] px-6 sm:px-8 py-3 rounded-full flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6E856A] to-[#B2C4AC] flex items-center justify-center shadow-[0_0_12px_rgba(178,196,172,0.4)]">
                  <span className="text-[#0D110D] font-extrabold text-sm tracking-tighter">GG</span>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">GREEN GIRL</span>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                      if (item === "HOME") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        const el = document.getElementById(item.toLowerCase());
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="relative py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-250 cursor-pointer active:scale-95 group"
                  >
                    <span className="relative z-10">{item}</span>
                    {activeTab === item ? (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B2C4AC] shadow-[0_0_10px_rgba(178,196,172,0.8)]"
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#B2C4AC]/40 group-hover:w-full transition-all duration-300" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Cart Trigger */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCartOpen(true)}
                  className="relative p-2.5 rounded-full hover:bg-white/5 border border-white/0.05 transition-colors cursor-pointer group active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-white group-hover:text-[#B2C4AC] transition-colors" />
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#B2C4AC] text-[#0D110D] text-[8px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(178,196,172,0.6)]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Children Render - Clean flexbox flow */}
        <main className="flex-1 w-full relative pointer-events-auto">
          {children}
        </main>

        {/* Cart Drawer - High-priority overlays z-[200] */}
        <AnimatePresence>
          {cartOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 z-[200] bg-black backdrop-blur-sm"
              />

              {/* Drawer Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0B0E0B] border-l border-white/0.05 p-6 backdrop-blur-xl z-[200] shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/0.05 pb-5">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#B2C4AC]" />
                    <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase text-white">Your Cart</h2>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-full bg-white/5 border border-white/0.05 text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
                  {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                      <ShoppingBag className="w-12 h-12 text-neutral-600 stroke-[1]" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Your cart is empty</span>
                        <span className="text-[10px] text-neutral-400">Discover custom pieces in our boutique.</span>
                      </div>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/0.05 flex-shrink-0">
                          <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                        </div>

                        {/* Info & Quantity controls */}
                        <div className="flex-1 flex flex-col justify-between h-16 py-0.5">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-bold tracking-widest text-[#B2C4AC] uppercase">{item.category}</span>
                            <span className="text-[11px] font-bold text-white tracking-tight truncate max-w-[180px]">{item.name}</span>
                            {(item.selectedVariantColor || item.selectedVariantSize) && (
                              <div className="flex gap-2 mt-0.5 text-[9px] text-neutral-450/70 font-medium">
                                {item.selectedVariantColor && <span>Color: {item.selectedVariantColor}</span>}
                                {item.selectedVariantSize && <span>Size: {item.selectedVariantSize}</span>}
                              </div>
                            )}
                          </div>
                          
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-md bg-white/5 border border-white/0.05 hover:bg-white/10 hover:text-white text-neutral-450 transition-colors cursor-pointer active:scale-90"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[10px] font-bold text-white w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-md bg-white/5 border border-white/0.05 hover:bg-white/10 hover:text-white text-neutral-450 transition-colors cursor-pointer active:scale-90"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end justify-between h-16 py-0.5">
                          <span className="text-[11px] font-black text-white">
                            Rs. {(item.priceNum * item.quantity).toLocaleString()}
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[9px] font-bold tracking-widest text-neutral-500 hover:text-rose-400 hover:underline cursor-pointer transition-colors"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Checkouts */}
                <div className="border-t border-white/0.05 pt-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-450">Estimated Total</span>
                    <span className="text-lg font-black text-white">Rs. {cartTotal.toLocaleString()}</span>
                  </div>

                  <button 
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = "/checkout";
                    }}
                    className={`w-full py-4 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      cartItems.length === 0 
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-55" 
                        : "bg-[#B2C4AC] text-[#0D110D] hover:bg-[#A1B399] shadow-[0_0_20px_rgba(178,196,172,0.25)] hover:shadow-[0_0_35px_rgba(178,196,172,0.55)] active:scale-98"
                    }`}
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </CartContext.Provider>
  );
}
