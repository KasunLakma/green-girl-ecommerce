"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import { useCart } from "./layout";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setQuickViewProduct(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="w-full max-w-3xl bg-[#0E120E]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto md:min-h-[400px] bg-black/20">
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0D110D]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase">
                {quickViewProduct.tag || "PREMIUM"}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase">
                    {quickViewProduct.category}
                  </span>
                  <button 
                    onClick={() => setQuickViewProduct(null)}
                    className="p-1.5 rounded-full bg-white/5 border border-white/0.05 text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all active:scale-90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                  {quickViewProduct.name}
                </h2>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating || 5) ? "fill-amber-400 text-amber-400" : "text-neutral-700"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-450 font-bold ml-1">{(quickViewProduct.rating || 5.0).toFixed(1)}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                  {quickViewProduct.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-y border-white/0.05 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Unit Price</span>
                    <span className="text-xl font-black text-white">{quickViewProduct.price}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-1.5 justify-end">
                    <span className="text-[9px] font-bold text-neutral-400 bg-white/[0.02] border border-white/0.05 px-2.5 py-1 rounded-full">COD Available</span>
                    <span className="text-[9px] font-bold text-neutral-400 bg-white/[0.02] border border-white/0.05 px-2.5 py-1 rounded-full">Visa / Master</span>
                    <span className="text-[9px] font-bold text-[#B2C4AC] bg-[#B2C4AC]/5 border border-[#B2C4AC]/10 px-2.5 py-1 rounded-full">Koko - 3 x Split</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      addToCart({
                        id: quickViewProduct.id,
                        name: quickViewProduct.name,
                        price: quickViewProduct.price,
                        image: quickViewProduct.image,
                        category: quickViewProduct.category
                      });
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3.5 bg-[#B2C4AC] text-[#0D110D] rounded-full font-black text-xs tracking-widest uppercase hover:bg-[#A1B399] transition-all active:scale-95 cursor-pointer text-center"
                  >
                    Add To Shopping Bag
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
