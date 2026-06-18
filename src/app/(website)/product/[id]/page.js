import React from "react";
import { prisma } from "../../../../lib/prisma";
import ProductCard from "../../ProductCard";
import ProductActions from "./ProductActions";
import QuickViewModal from "../../QuickViewModal";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Truck, Lock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const staticProducts = [
    {
      id: "1",
      name: "Stitch Cute Plush Toy",
      category: "Toys & Teddies",
      price: 2400,
      image: "/images/stitch_toy.png",
      tag: "TRENDING",
      rating: 4.9,
      colors: "Blue,Pink",
      sizes: "Small,Medium,Large",
      description: "A super soft, premium quality Stitch plush toy. Crafted with extra plush materials and fine detailed stitching, making it the perfect luxury gift for Disney collectors and children alike."
    },
    {
      id: "2",
      name: "Customized Ceramic Mug + Gift Box",
      category: "Customized Gifts",
      price: 1950,
      image: "/images/custom_mug.png",
      tag: "EXQUISITE",
      rating: 4.8,
      colors: "Matte Black,Matte Sage,Matte White",
      sizes: "Standard",
      description: "Matte-finished customized ceramic mug packaged in an elegant, signature dark gift box. Perfect for coffee lovers, workspace decor, or a high-quality personalized gift."
    },
    {
      id: "3",
      name: "Handmade Rose Bouquet Hamper",
      category: "Gift Hampers",
      price: 4500,
      image: "/images/rose_hamper.png",
      tag: "POPULAR",
      rating: 5.0,
      colors: "Crimson Red,Blush Pink",
      sizes: "Medium",
      description: "A premium floral arrangement featuring handmade, selected red and pink roses beautifully displayed inside a dark boutique gift box, accompanied by custom gift treats."
    }
  ];

  let product = null;
  try {
    product = await prisma.product.findUnique({ where: { id: id } });
  } catch (error) {
    console.warn("Prisma failed to retrieve single product. Using fallbacks.", error);
  }

  if (!product) {
    product = staticProducts.find(p => p.id === id);
  }

  // Final fallback if product still doesn't exist
  if (!product) {
    product = staticProducts[0];
  }

  const productName = product.name || "Luxury Gift Item";
  const productPriceNum = typeof product.price === "number" ? product.price : 0;
  const productPrice = `Rs. ${productPriceNum.toLocaleString()}`;
  let productImage = product.image || "/images/placeholder.jpg";
  
  if (!productImage.startsWith("data:") && !productImage.startsWith("http://") && !productImage.startsWith("https://") && !productImage.startsWith("/")) {
    if (productName.includes("Stitch")) {
      productImage = "/images/stitch_toy.png";
    } else if (productName.includes("Ceramic Mug")) {
      productImage = "/images/custom_mug.png";
    } else if (productName.includes("Rose Bouquet")) {
      productImage = "/images/rose_hamper.png";
    } else {
      productImage = "/images/placeholder.jpg";
    }
  }

  const productCategory = product.category || "Customized Gifts";
  const productRating = 4.8;
  const productDescription = product.description || "Bespoke custom-crafted luxury gift item.";

  // Fetch Related Products from Database or Fallbacks
  let relatedProducts = [];
  try {
    relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: id },
        category: productCategory
      },
      take: 4
    });
  } catch (error) {
    console.warn("Prisma failed to retrieve related products. Using fallbacks.", error);
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = staticProducts.filter(p => p.id !== id).slice(0, 4);
  }

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-neutral-450 hover:text-[#B2C4AC] transition-colors flex items-center gap-1.5 uppercase font-bold tracking-widest">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
          <span className="text-neutral-600">/</span>
          <Link href="/collections" className="text-neutral-450 hover:text-[#B2C4AC] transition-colors uppercase font-bold tracking-widest">
            Collections
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400 uppercase tracking-widest font-bold truncate max-w-[200px]">{productName}</span>
        </div>

        {/* Upper Viewport Detail Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Product Image Showcase */}
          <div className="lg:col-span-6 w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-black/40 border border-white/0.05 shadow-2xl">
            <img 
              src={productImage} 
              alt={productName} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>

          {/* Right Side: Product Details & Dynamic Attributes */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#B2C4AC] uppercase">{productCategory}</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">{productName}</h1>
              
              {/* Rating stars layout */}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(productRating) ? "fill-amber-400 text-amber-400" : "text-neutral-700"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-400 font-bold ml-1">{productRating.toFixed(1)} / 5.0 Rating</span>
              </div>
            </div>

            {/* Price section */}
            <div className="py-4 border-y border-white/0.05 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Boutique Retail Price</span>
              <span className="text-2xl sm:text-3xl font-black text-[#B2C4AC] tracking-tight">{productPrice}</span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Product Overview</span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">{productDescription}</p>
            </div>

            {/* Client product actions (Color/Size selection & Add to Cart) */}
            <ProductActions product={product} />

            {/* Security Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/0.05 pt-6 mt-2 text-[9px] text-neutral-500 uppercase tracking-wider font-bold text-center">
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#B2C4AC]" /> Secure Checkout</span>
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1.5"><Truck className="w-4 h-4 text-[#B2C4AC]" /> islandwide delivery</span>
              <span className="flex flex-col sm:flex-row items-center justify-center gap-1.5"><Lock className="w-4 h-4 text-[#B2C4AC]" /> boutique packaging</span>
            </div>

          </div>
        </div>

        {/* Divider line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        {/* Related Products Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-white/0.05 pb-3">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
              ✨ You May Also Like <span className="text-neutral-500 font-normal">(Related Products)</span>
            </h2>
            <p className="text-[10px] text-neutral-450 uppercase tracking-widest">Discover matching collections to bundle your boutique gift package</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {relatedProducts.map((alternativeProd, idx) => (
              <ProductCard key={alternativeProd.id} product={alternativeProd} index={idx} />
            ))}
          </div>
        </section>

      </div>

      <QuickViewModal />
    </div>
  );
}
