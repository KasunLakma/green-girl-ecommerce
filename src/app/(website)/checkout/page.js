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
  ShoppingBag,
  Banknote
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../layout";
import { db, auth } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { clearCart } = useCart();
  if (cartItems) {
    cartItems.forEach((item) => {
      if (typeof item.price === "string") {
        item.price = item.priceNum || parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
      }
    });
  }
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    district: "Colombo"
  });

  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", 
    "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", 
    "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", 
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", 
    "Moneragala", "Ratnapura", "Kegalle"
  ];

  const shipping = 350;
  const grandTotal = cartTotal + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          address: formData.address,
          district: formData.district,
          totalAmount: grandTotal,
          paymentMethod: paymentMethod,
          userId: auth.currentUser?.uid || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout submission failed");
      }

      const result = await response.json();
      
      localStorage.removeItem("cart");
      if (clearCart) {
        clearCart();
      }
      
      // Redirect to thank-you success page
      const orderRef = result.orderReference || "ORD-" + Math.floor(1000 + Math.random() * 9000);
      window.location.href = `/thank-you?orderId=${encodeURIComponent(orderRef)}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&paymentMethod=${encodeURIComponent(paymentMethod)}`;
    } catch (err) {
      console.error(err);
      alert("Failed to process transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-x-hidden">
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
            >
              
              {/* Left Column: Customer Information & Delivery Form */}
              <div className="w-full lg:col-span-7 flex flex-col gap-6">
                <div className="hype-glass p-6 sm:p-8 border border-white/0.05 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase">Delivery Details</h1>
                    <p className="text-xs text-neutral-400">Complete the form below to initiate your boutique packaging shipment.</p>
                  </div>

                  <form id="checkout-delivery-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kasun Lakmal"
                        className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] focus:ring-2 focus:ring-[#B2C4AC]/50 transition-all"
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
                          className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] focus:ring-2 focus:ring-[#B2C4AC]/50 transition-all"
                        />
                      </div>

                      {/* Contact Number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Contact Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          placeholder="e.g. +94 77 123 4567"
                          className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] focus:ring-2 focus:ring-[#B2C4AC]/50 transition-all"
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
                        className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] focus:ring-2 focus:ring-[#B2C4AC]/50 transition-all resize-none"
                      />
                    </div>

                    {/* District Selector Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">District *</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B2C4AC] focus:ring-2 focus:ring-[#B2C4AC]/50 transition-all cursor-pointer [&>option]:bg-[#0D110D] [&>option]:text-white"
                      >
                        {districts.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="hype-glass p-6 sm:p-8 border border-white/0.05 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold tracking-tight text-white uppercase">Payment Method</h2>
                    <p className="text-xs text-neutral-400">Select how you want to complete your invoice payment.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Cash On Delivery (COD) */}
                    <div 
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden h-full ${
                        paymentMethod === "cod" 
                          ? "bg-[#B2C4AC]/10 border-[#B2C4AC] shadow-[0_0_15px_rgba(178,196,172,0.15)]" 
                          : "bg-white/[0.02] border-white/0.05 hover:border-white/15"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white tracking-tight uppercase">Cash On Delivery</span>
                          <Banknote className={`w-5 h-5 ${paymentMethod === "cod" ? "text-[#B2C4AC]" : "text-neutral-400"}`} />
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">
                          Pay with cash upon package receipt. <span className="text-[#B2C4AC] font-bold">(Recommended)</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === "cod" ? "border-[#B2C4AC]" : "border-neutral-600"}`}>
                          {paymentMethod === "cod" && <div className="w-1.5 h-1.5 rounded-full bg-[#B2C4AC]" />}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Select</span>
                      </div>
                    </div>

                    {/* Card 2: Visa / Mastercard */}
                    <div 
                      onClick={() => setPaymentMethod("card")}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden h-full ${
                        paymentMethod === "card" 
                          ? "bg-[#B2C4AC]/10 border-[#B2C4AC] shadow-[0_0_15px_rgba(178,196,172,0.15)]" 
                          : "bg-white/[0.02] border-white/0.05 hover:border-white/15"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white tracking-tight uppercase">Visa / Mastercard</span>
                          <CreditCard className={`w-5 h-5 ${paymentMethod === "card" ? "text-[#B2C4AC]" : "text-neutral-400"}`} />
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">
                          Secure online payment via credit or debit cards.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === "card" ? "border-[#B2C4AC]" : "border-neutral-600"}`}>
                          {paymentMethod === "card" && <div className="w-1.5 h-1.5 rounded-full bg-[#B2C4AC]" />}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Select</span>
                      </div>
                    </div>

                    {/* Card 3: Koko - Split Payment */}
                    <div 
                      onClick={() => setPaymentMethod("koko")}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden h-full ${
                        paymentMethod === "koko" 
                          ? "bg-[#B2C4AC]/10 border-[#B2C4AC] shadow-[0_0_15px_rgba(178,196,172,0.15)]" 
                          : "bg-white/[0.02] border-white/0.05 hover:border-white/15"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white tracking-tight uppercase">Koko - Split Payment</span>
                          <span className={`text-[10px] font-black tracking-widest ${paymentMethod === "koko" ? "text-emerald-400" : "text-neutral-400"}`}>KOKO</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">
                          Split your order into 3 interest-free payments.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === "koko" ? "border-[#B2C4AC]" : "border-neutral-600"}`}>
                          {paymentMethod === "koko" && <div className="w-1.5 h-1.5 rounded-full bg-[#B2C4AC]" />}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Select</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Invoice Breakdown */}
              <div className="w-full static lg:sticky lg:top-32 flex flex-col gap-6 lg:col-span-5 mt-6 lg:mt-0">
                <div className="bg-[#0B0E0B]/50 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase text-white pb-3 border-b border-white/0.05">Order Summary</h2>
                  
                  {/* Order items stack list */}
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-zinc-800/50">
                        <div className="flex items-center gap-3">
                          <img src={item.image || item.imageImg} alt={item.name} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="text-sm font-medium text-white">{item.name}</p>
                            <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))
                  ) : null}

                  {/* Calculations breakdown */}
                  <div className="flex flex-col gap-3 border-t border-white/0.05 pt-4 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span>Rs. {cartTotal ? cartTotal.toLocaleString() : "0"}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#B2C4AC]" /> Islandwide Premium Delivery
                      </span>
                      <span>Rs. {shipping.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/0.05 pt-4 text-sm font-bold text-white">
                      <span>Grand Total</span>
                      <span className="text-base text-[#B2C4AC] font-black">Rs. {cartTotal ? (cartTotal + 350).toLocaleString() : "350"}</span>
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
                    disabled={isSubmitting || isProcessing}
                    className="w-full py-4 bg-[#B2C4AC] disabled:opacity-50 text-[#0D110D] hover:bg-[#A1B399] rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(178,196,172,0.2)] hover:shadow-[0_0_35px_rgba(178,196,172,0.5)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting || isProcessing ? "PROCESSING TRANSACTION..." : (
                      <>
                        {paymentMethod === "cod" && "PLACE ORDER VIA CASH ON DELIVERY"}
                        {paymentMethod === "card" && "PAY VIA VISA / MASTERCARD"}
                        {paymentMethod === "koko" && "SPLIT PAY VIA KOKO"}
                      </>
                    )}
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
                  <span className="font-mono font-bold text-white">{orderId}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/0.05 pb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">Method selected</span>
                  <span className="text-[#B2C4AC] font-bold">
                    {paymentMethod === "cod" && "Cash On Delivery (COD)"}
                    {paymentMethod === "card" && "Visa / Mastercard"}
                    {paymentMethod === "koko" && "Koko - Split Payment"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/0.05 pb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">Auto Generated User</span>
                  <span className="text-white truncate max-w-[200px]">{formData.email}</span>
                </div>

                <div className="flex items-start gap-2 pt-1 text-[10px] text-neutral-450 leading-relaxed">
                  <UserPlus className="w-4 h-4 text-[#B2C4AC] flex-shrink-0 mt-0.5" />
                  <span>
                    An automatic profile has been initialized for this email. You can check your orders in the Customer Profile page.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
                <Link 
                  href="/profile"
                  className="flex-1 py-3.5 bg-[#B2C4AC] text-[#0D110D] hover:bg-[#A1B399] rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 text-center cursor-pointer"
                >
                  View Profile & Track Order
                </Link>
                <Link 
                  href="/"
                  className="flex-1 py-3.5 border border-white/10 hover:bg-white/5 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 text-center cursor-pointer"
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
