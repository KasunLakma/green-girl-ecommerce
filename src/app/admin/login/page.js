"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Direct mockup bypass to immediately route into the admin core space
    router.push("/admin");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#050705] via-[#111611] to-[#1A231A] relative overflow-hidden select-none">
      {/* Decorative Brand Light Glow Effect */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#A1B399]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#A1B399]/5 blur-[120px] pointer-events-none" />

      <div className="bg-[#0B0E0B]/50 backdrop-blur-xl border border-white/0.05 p-10 rounded-3xl shadow-2xl max-w-md w-full mx-4 relative z-10 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-base font-bold tracking-[0.25em] uppercase text-[#B2C4AC]">
            Greengirl Admin Portal
          </h1>
          <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-semibold">
            Secure Top-Tier Administrator Authentication
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300 px-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@greengirl.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0D110D]/60 border border-white/0.08 rounded-xl px-4 py-3.5 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-300 px-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#0D110D]/60 border border-white/0.08 rounded-xl px-4 py-3.5 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] font-bold text-xs tracking-widest py-4 rounded-xl transition-all duration-200 uppercase shadow-[0_4px_25px_rgba(161,179,153,0.18)]"
          >
            Authenticate Securely
          </button>
        </form>
      </div>
    </div>
  );
}
