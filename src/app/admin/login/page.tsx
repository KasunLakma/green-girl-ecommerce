"use client";

import React, { useState, Suspense } from "react";
import { Leaf, Lock, Mail, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mimic secure login delay
    setTimeout(() => {
      // Allow demo credentials: admin@greengirl.com / greengirl2026
      if (email === "admin@greengirl.com" && password === "greengirl2026") {
        setSuccess(true);
        // Set the admin_token cookie so proxy.ts allows access
        document.cookie = "admin_token=gg_admin_mock_session_2026; path=/; max-age=86400; SameSite=Lax";
        
        const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
        
        setTimeout(() => {
          router.push(redirectTo);
          router.refresh();
        }, 1000);
      } else {
        setError("Invalid administrative credentials. Use admin@greengirl.com and greengirl2026.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md hype-glass p-8 md:p-10 rounded-[28px] border border-white/[0.08] relative z-10 flex flex-col gap-6 shadow-2xl bg-white/[0.02] backdrop-blur-md">
      
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-emerald-400">
          <Leaf size={22} />
        </div>
        <h1 className="serif-heading text-2xl font-black tracking-widest text-white uppercase mt-2">
          GREEN GIRL<span className="text-emerald-450">.</span>
        </h1>
        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          Authorized Admin Gateway
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-4.5 py-3.5 rounded-2xl flex items-center gap-3">
          <ShieldAlert size={16} className="shrink-0 text-red-400" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-4.5 py-3.5 rounded-2xl flex items-center gap-3">
          <Sparkles size={16} className="shrink-0 text-emerald-400 animate-spin" />
          <span className="font-semibold">Security passed. Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-1">
            Admin Identifier
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-600">
              <Mail size={14} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@greengirl.com"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-xs text-white font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.04] transition-all placeholder-slate-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-1">
            Secret Keyphrase
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-600">
              <Lock size={14} />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-xs text-white font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.04] transition-all placeholder-slate-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="hype-interactive cute-btn-primary w-full select-none py-3.5 mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50 text-[#090B0E]"
        >
          {isLoading ? "Consulting Auth Server..." : "Unlock Dashboard"}
          {!isLoading && <ArrowRight size={14} />}
        </button>
      </form>

      <div className="border-t border-white/5 pt-4 text-center">
        <p className="text-[9px] text-slate-550 leading-relaxed font-semibold">
          Strict authorized personnel bounds. Sandbox credentials for evaluation:<br />
          <span className="font-mono text-emerald-450 select-all font-bold">admin@greengirl.com</span> / <span className="font-mono text-emerald-450 select-all font-bold">greengirl2026</span>
        </p>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#0B0F12]">
      {/* Background soft ambient radial elements (no heavy patterns) */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-500/[0.01] blur-[150px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="w-full max-w-md hype-glass p-8 rounded-[28px] border border-white/[0.08] relative z-10 flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <Leaf className="text-emerald-400 animate-bounce" size={28} />
          <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Loading secure gateway...</p>
        </div>
      }>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
