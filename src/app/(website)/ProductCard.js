"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useCart } from "./layout";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, index }) {
  const { addToCart, setQuickViewProduct } = useCart();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const productName = product.name || product.title || "Luxury Gift Item";
  const productPrice = typeof product.price === "number" ? `Rs. ${product.price.toLocaleString()}` : (product.price || "Rs. 0");
  
  // Resolve correct images for database items
  let productImage = product.image || "/images/placeholder.jpg";
  if (!productImage.startsWith("data:") && !productImage.startsWith("http://") && !productImage.startsWith("https://") && !productImage.startsWith("/")) {
    if (productName.includes("Stitch")) {
      productImage = "/images/stitch_toy.png";
    } else if (productName.includes("Ceramic Mug")) {
      productImage = "/images/custom_mug.png";
    } else if (productName.includes("Rose Bouquet")) {
      productImage = "/images/rose_hamper.png";
    } else if (productName.includes("Gel Pen")) {
      productImage = "https://images.unsplash.com/photo-1585336261022-675929945037?w=500";
    } else {
      productImage = "/images/placeholder.jpg";
    }
  }

  const productAlt = product.imageAlt || product.alt || `${productName} - Luxury Gift Box wrapping by Greengirl Sri Lanka`;
  const productCategory = product.category || "Customized Gifts";
  const productTag = product.stock > 0 ? "IN STOCK" : (product.stock === 0 ? "OUT OF STOCK" : "PREMIUM");
  const productRating = 4.8 + (index % 3) * 0.1; // generated rating or fallback
  const productDescription = product.description || "Bespoke custom-crafted luxury gift item.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => router.push(`/product/${product.id}`)}
      className="hype-glass p-4 rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:border-white/15 hover:shadow-[0_24px_50px_rgba(0,0,0,0.7)] border border-white/0.05"
    >
      <div className="flex flex-col gap-4">
        {/* Image visual wrapper */}
        <div className="overflow-hidden rounded-2xl relative aspect-[4/3] bg-black/40 border border-white/[0.04]">
          <img 
            src={productImage} 
            alt={productAlt} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Tag overlay */}
          <div className="absolute top-3 left-3 bg-[#0D110D]/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-[#B2C4AC] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            {productTag}
          </div>
          {/* Liked state */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-[#0D110D]/70 hover:bg-[#0D110D]/90 border border-white/10 text-white hover:text-rose-400 active:scale-90 transition-all cursor-pointer z-20"
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-all ${isLiked ? "fill-rose-500 text-rose-500" : "text-white"}`} 
            />
          </button>
          
          {/* Hover details action buttons */}
          <div className="absolute inset-0 bg-[#0D110D]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct({
                  ...product,
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  alt: productAlt,
                  category: productCategory,
                  tag: productTag,
                  rating: productRating,
                  description: productDescription
                });
              }}
              className="px-4 py-2 rounded-full bg-white text-[#0D110D] font-bold text-[9px] tracking-wider uppercase hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
            >
              Quick View
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  category: productCategory
                });
              }}
              className="px-4 py-2 rounded-full bg-[#B2C4AC] text-[#0D110D] font-bold text-[9px] tracking-wider uppercase hover:bg-[#A1B399] active:scale-95 transition-all cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 px-1">
          <span className="text-[9px] font-bold tracking-widest text-[#B2C4AC] uppercase">
            {productCategory}
          </span>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#B2C4AC] transition-colors duration-300">
            {productName}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(productRating) ? "fill-amber-400 text-amber-400" : "text-neutral-700"}`} 
                />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400 font-bold ml-1">{productRating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Footer inside card */}
      <div className="flex items-center justify-between border-t border-white/0.05 pt-4 mt-4 px-1">
        <div className="text-base font-black text-white tracking-tight">{productPrice}</div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: product.id,
              name: productName,
              price: productPrice,
              image: productImage,
              category: productCategory
            });
          }}
          className="text-[9px] font-bold tracking-widest text-[#B2C4AC] uppercase group-hover:text-white transition-colors flex items-center gap-1 hover:underline cursor-pointer"
        >
          Add +
        </button>
      </div>
    </motion.div>
  );
}
