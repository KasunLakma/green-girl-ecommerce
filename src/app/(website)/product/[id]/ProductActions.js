"use client";

import React, { useState } from "react";
import { useCart } from "../../layout";
import { ShoppingBag } from "lucide-react";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const colorsList = product.colors ? product.colors.split(",").map(c => c.trim()).filter(Boolean) : [];
  const sizesList = product.sizes ? product.sizes.split(",").map(s => s.trim()).filter(Boolean) : [];

  const [selectedColor, setSelectedColor] = useState(colorsList[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizesList[0] || "");

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === "number" ? `Rs. ${product.price.toLocaleString()}` : (product.price || "Rs. 0"),
      image: product.image || "/images/placeholder.jpg",
      category: product.category || "Customized Gifts",
      selectedVariantColor: selectedColor,
      selectedVariantSize: selectedSize
    });
  };

  return (
    <div className="flex flex-col gap-6 mt-4 w-full">
      {/* Colors Attribute */}
      {colorsList.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450">Available Colors</span>
          <div className="flex flex-wrap gap-2">
            {colorsList.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedColor === color
                    ? "bg-[#B2C4AC] text-[#0D110D] border-[#B2C4AC] shadow-[0_0_12px_rgba(178,196,172,0.2)]"
                    : "bg-white/5 text-white border-white/0.05 hover:bg-white/10"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes Attribute */}
      {sizesList.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450">Available Sizes</span>
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedSize === size
                    ? "bg-[#B2C4AC] text-[#0D110D] border-[#B2C4AC] shadow-[0_0_12px_rgba(178,196,172,0.2)]"
                    : "bg-white/5 text-white border-white/0.05 hover:bg-white/10"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Action */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-4 py-4 bg-[#B2C4AC] text-[#0D110D] hover:bg-[#A1B399] rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(178,196,172,0.2)] hover:shadow-[0_0_35px_rgba(178,196,172,0.5)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" /> Add to Cart
      </button>
    </div>
  );
}
