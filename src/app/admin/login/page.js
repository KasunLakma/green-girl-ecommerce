"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Direct mockup bypass to immediately route into the admin core space
    router.push("/admin");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-sm bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-8 rounded-2xl flex flex-col gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="text-center flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-[0.25em] uppercase text-[#B2C4AC]">
            Admin Portal
          </h1>
          <p className="text-[10px] text-neutral-500 tracking-wider">
            Green Girl Curation Storefront
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 px-1">
              Username or Email
            </label>
            <input
              type="text"
              required
              placeholder="admin"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 px-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-black/40 border border-white/0.08 rounded-xl px-4 py-3 text-xs text-neutral-200 focus:border-[#A1B399]/40 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] font-bold text-xs tracking-widest py-3.5 rounded-xl transition-all duration-200 uppercase shadow-[0_4px_20px_rgba(161,179,153,0.15)]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
