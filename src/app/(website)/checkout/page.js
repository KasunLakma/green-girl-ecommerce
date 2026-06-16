"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Lock, 
  UserPlus, 
  ShoppingBag 
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all the required delivery fields.");
      return;
    }
    setIsSubmitted(true);
  };

  const paymentOptions = [
    {
      id: "cod",
      title: "Cash On Delivery (COD) - Pay upon receipt",
      description: "Pay with cash when your luxury parcel is safely delivered to your doorstep. Free and mandatory for custom arrangements.",
      badge: "RECOMMENDED",
      disabled: false
    },
    {
      id: "card",
      title: "Visa / Mastercard Credit Card",
      description: "Secure electronic payment. Credit card authorization gateway is currently undergoing security compliance validation.",
      badge: "TEMPORARILY OFFLINE",
      disabled: true
    },
    {
      id: "koko",
      title: "Koko - Split into 3 interest-free payments",
      description: "Buy now and split the invoice total into 3 monthly interest-free payments.",
      badge: "TEMPORARILY OFFLINE",
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0D110D] text-white pt-32 pb-20 px-4 relative overflow-x-hidden">
      
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-neutral-450 hover:text-[#B2C4AC] transition-colors flex items-center gap-1.5 uppercase font-bold tracking-widest">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400 uppercase tracking-widest font-bold">Checkout Summary</span>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="checkout-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Customer Information & Delivery Form */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="hype-glass p-6 sm:p-8 border border-white/0.05 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase">Delivery Details</h1>
                    <p className="text-xs text-neutral-400">Complete the form below to initiate your boutique packaging shipment.</p>
                  </div>

                  <form id="checkout-delivery-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kasun Lakmal"
                        className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all"
                      />
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. user@domain.com"
                          className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all"
                        />
                      </div>

                      {/* Contact Number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Contact Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +94 77 123 4567"
                          className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all"
                        />
                      </div>
                    </div>

                    {/* Delivery Shipping Address */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Delivery Shipping Address *</label>
                      <textarea 
                        required
                        rows="3"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. 12/3 Park Avenue, Colombo 07"
                        className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all resize-none"
                      />
                    </div>
                  </form>
                </div>

                {/* Payment Method Selector */}
                <div className="hype-glass p-6 sm:p-8 border border-white/0.05 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold tracking-tight text-white uppercase">Payment Method</h2>
                    <p className="text-xs text-neutral-400">Select how you want to complete your invoice payment.</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {paymentOptions.map((option) => (
                      <div 
                        key={option.id}
                        onClick={() => {
                          if (!option.disabled) setPaymentMethod(option.id);
                        }}
                        className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 relative overflow-hidden ${
                          option.disabled 
                            ? "bg-white/[0.01] border-white/0.02 opacity-40 cursor-not-allowed" 
                            : paymentMethod === option.id 
                              ? "bg-[#B2C4AC]/5 border-[#B2C4AC] shadow-[0_0_15px_rgba(178,196,172,0.1)] cursor-pointer" 
                              : "bg-white/[0.02] border-white/0.05 hover:border-white/10 cursor-pointer"
                        }`}
                      >
                        {/* Selector Indicator */}
                        <div className="mt-1 flex items-center justify-center flex-shrink-0">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            paymentMethod === option.id && !option.disabled
                              ? "border-[#B2C4AC]" 
                              : "border-neutral-600"
                          }`}>
                            {paymentMethod === option.id && !option.disabled && (
                              <div className="w-2 h-2 rounded-full bg-[#B2C4AC]" />
                            )}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-1 pr-16">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white tracking-tight">{option.title}</span>
                            {option.badge && (
                              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                                option.id === "cod"
                                  ? "bg-[#B2C4AC]/10 border-[#B2C4AC]/20 text-[#B2C4AC]" 
                                  : "bg-neutral-800 border-neutral-700 text-neutral-500"
                              }`}>
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-neutral-400 leading-relaxed">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Invoice Breakdown */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
                <div className="bg-[#0B0E0B]/50 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase text-white pb-3 border-b border-white/0.05">Order Summary</h2>
                  
                  {/* Order items stack list */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/0.05 flex-shrink-0">
                        <img 
                          src="/images/stitch_toy.png" 
                          alt="Stitch Cute Plush Toy" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[8px] font-bold tracking-widest text-[#B2C4AC] uppercase">Toys & Teddies</span>
                        <h4 className="text-[11px] font-bold text-white truncate">Stitch Cute Plush Toy</h4>
                        <span className="text-[10px] text-neutral-400">Qty: 1</span>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-white">Rs. 2,400</span>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="flex flex-col gap-3 border-t border-white/0.05 pt-4 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span>Rs. 2,400</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#B2C4AC]" /> Islandwide Premium Delivery
                      </span>
                      <span>Rs. 350</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/0.05 pt-4 text-sm font-bold text-white">
                      <span>Grand Total</span>
                      <span className="text-base text-[#B2C4AC] font-black">Rs. 2,750</span>
                    </div>
                  </div>

                  {/* Bottom Action Notification Alert Badge */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex gap-2">
                    <span className="text-[10px] text-[#B2C4AC] leading-relaxed">
                      💡 <strong>Note:</strong> An automated customer secure account profile will be instantly generated using your email upon completing this checkout process.
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    type="submit"
                    form="checkout-delivery-form"
                    className="w-full py-4 bg-[#B2C4AC] text-[#0D110D] hover:bg-[#A1B399] rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(178,196,172,0.2)] hover:shadow-[0_0_35px_rgba(178,196,172,0.5)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    PLACE ORDER VIA CASH ON DELIVERY
                  </button>
                </div>

                {/* Verification security badges */}
                <div className="flex items-center justify-center gap-6 text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#B2C4AC]" /> Secure SSL Gateway</span>
                  <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#B2C4AC]" /> Privacy Certified</span>
                </div>
              </div>

            </motion.div>
          ) : (
            
            /* Order Success State Panel */
            <motion.div 
              key="success-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="hype-glass p-8 sm:p-12 border border-white/0.08 max-w-xl mx-auto text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-[#B2C4AC]/10 border border-[#B2C4AC]/20 flex items-center justify-center shadow-[0_0_20px_rgba(178,196,172,0.25)]">
                <CheckCircle className="w-8 h-8 text-[#B2C4AC]" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#B2C4AC] uppercase">Invoice Initiated</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">Order Placed Successfully!</h2>
                <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your premium order was registered in our system and sent to the administrator panel for delivery scheduling.
                </p>
              </div>

              {/* Order Info & Profile Details */}
              <div className="w-full flex flex-col gap-3 bg-black/35 border border-white/0.02 p-4 rounded-2xl text-left text-xs text-neutral-300">
                <div className="flex items-center justify-between border-b border-white/0.05 pb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">Order ID Reference</span>
                  <span className="font-mono font-bold text-white">ORD-9285</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/0.05 pb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">Method selected</span>
                  <span className="text-[#B2C4AC] font-bold">Cash On Delivery (COD)</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/0.05 pb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">Auto Generated User</span>
                  <span className="text-white truncate max-w-[200px]">{formData.email}</span>
                </div>

                <div className="flex items-start gap-2 pt-1 text-[10px] text-neutral-450 leading-relaxed">
                  <UserPlus className="w-4 h-4 text-[#B2C4AC] flex-shrink-0 mt-0.5" />
                  <span>
                    An automatic profile has been initialized for this email. Check your inbox for security credentials and tracking links.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
                <Link 
                  href="/"
                  className="flex-1 py-3.5 bg-[#B2C4AC] text-[#0D110D] hover:bg-[#A1B399] rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 text-center cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
