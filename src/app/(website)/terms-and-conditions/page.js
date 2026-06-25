import React from "react";
import { Scale, RefreshCw, ShoppingCart, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — Green Girl Ceylon",
  description: "Read the Terms and Conditions of Green Girl Ceylon governing product orders, custom wrappers, and delivery policies.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="flex flex-col gap-3 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase flex items-center justify-center gap-1.5">
            <Scale className="w-4 h-4 text-[#B2C4AC]" /> Agreement & Guidelines
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">Terms & Conditions</h1>
          <div className="w-12 h-[2px] bg-[#B2C4AC] mx-auto mt-2 shadow-[0_0_8px_rgba(178,196,172,0.8)]" />
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">Last Updated: June 2026</span>
        </div>

        {/* Content Blocks */}
        <div className="hype-glass p-8 md:p-10 border border-white/0.05 flex flex-col gap-8 text-neutral-300 text-xs sm:text-sm leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#B2C4AC]" /> 1. Ordering and Customized Goods
            </h2>
            <p>
              Many products offered by Green Girl, including ceramic pieces and gift boxes, are handmade or bespoke-crafted. Small variations in color, texture, and structure are parts of the artistic charm and are not considered defects.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#B2C4AC]" /> 2. Delivery and Cash on Delivery (COD)
            </h2>
            <p>
              We deliver islandwide in Sri Lanka. For Cash on Delivery orders, ensure a contact number is provided and active. Orders will only be handed over after complete payment is processed.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B2C4AC]" /> 3. Cancellations & Returns
            </h2>
            <p>
              Due to the perishable nature of floral hampers and the bespoke customization of ceramic items, custom orders cannot be cancelled once production or packaging begins. Please contact customer service immediately for concerns.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/0.05 pt-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Questions or Notices</h3>
            <p>
              If you have any questions regarding our terms, please email us directly at{" "}
              <a href="mailto:hello@greengirl.luxury" className="text-[#B2C4AC] hover:underline">
                hello@greengirl.luxury
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
