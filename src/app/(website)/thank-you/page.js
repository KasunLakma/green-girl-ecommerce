"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, UserPlus } from "lucide-react";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const name = searchParams.get("name") || "Valued Customer";
  const email = searchParams.get("email") || "your email";
  const paymentMethod = searchParams.get("paymentMethod") || "cod";

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 relative overflow-x-hidden flex items-center justify-center">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="hype-glass p-8 sm:p-12 border border-white/0.08 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B2C4AC]/5 blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-[#B2C4AC]/10 border border-[#B2C4AC]/20 flex items-center justify-center shadow-[0_0_20px_rgba(178,196,172,0.25)]">
            <CheckCircle className="w-8 h-8 text-[#B2C4AC]" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#B2C4AC] uppercase">Invoice Initiated</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">Order Placed Successfully!</h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. Your premium order was registered in our system and sent to the administrator panel for delivery scheduling.
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
              <span className="text-white truncate max-w-[200px]">{email}</span>
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
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050705] text-white flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-neutral-500">Loading receipt details...</span>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
