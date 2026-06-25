import React from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Green Girl Ceylon",
  description: "Read the Privacy Policy of Green Girl Ceylon to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-x-hidden">
      {/* Background radial gradient glow matching brand aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/30 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <div className="flex flex-col gap-3 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B2C4AC] uppercase flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#B2C4AC]" /> Security & Trust
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">Privacy Policy</h1>
          <div className="w-12 h-[2px] bg-[#B2C4AC] mx-auto mt-2 shadow-[0_0_8px_rgba(178,196,172,0.8)]" />
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">Last Updated: June 2026</span>
        </div>

        {/* Content Blocks */}
        <div className="hype-glass p-8 md:p-10 border border-white/0.05 flex flex-col gap-8 text-neutral-300 text-xs sm:text-sm leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#B2C4AC]" /> 1. Information We Collect
            </h2>
            <p>
              When you purchase a boutique crate or place an order through our website, we collect personal information you provide, such as your name, delivery address, phone number, email address, and transaction preferences.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#B2C4AC]" /> 2. Security of Data
            </h2>
            <p>
              We protect your data using industry-standard secure communication protocols. Your payment and contact information are encrypted. We never lease or sell your contact information to third parties.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B2C4AC]" /> 3. How We Use Information
            </h2>
            <p>
              We use the collected information to process and deliver your custom orders, respond to inquiries, send newsletter updates if you subscribe, and improve our digital storefront experience.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/0.05 pt-6">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Contact Information</h3>
            <p>
              For privacy-related questions or data removal requests, please contact us at{" "}
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
