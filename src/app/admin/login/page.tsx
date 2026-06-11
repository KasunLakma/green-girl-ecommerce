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

    // Mimic firebase auth call or backend verify
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
    <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded-[32px] border-2 border-white/60 relative z-10 flex flex-col gap-6 shadow-2xl">
      
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#4e6b5c] flex items-center justify-center text-white shadow-md">
          <Leaf size={22} />
        </div>
        <h1 className="serif-heading text-2xl font-black tracking-widest text-[#21352b] uppercase mt-2">
          GREEN GIRL🌸
        </h1>
        <p className="text-[10px] font-bold tracking-widest text-[#4e6b5c] uppercase">
          Authorized Admin Gateway
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-900 text-xs px-4.5 py-3.5 rounded-2xl flex items-center gap-3">
          <ShieldAlert size={16} className="shrink-0 text-red-700" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 text-xs px-4.5 py-3.5 rounded-2xl flex items-center gap-3">
          <Sparkles size={16} className="shrink-0 text-[#4e6b5c] animate-spin" />
          <span className="font-semibold">Security passed. Entering boutique control room...</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#4e6b5c] tracking-wider uppercase px-1">
            Admin Identifier
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#21352b]/40">
              <Mail size={14} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@greengirl.com"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md text-xs text-[#21352b] font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all placeholder-foreground/30"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#4e6b5c] tracking-wider uppercase px-1">
            Secret Keyphrase
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#21352b]/40">
              <Lock size={14} />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md text-xs text-[#21352b] font-semibold focus:outline-none focus:border-[#4e6b5c] focus:bg-white/40 transition-all placeholder-foreground/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="cute-btn-primary w-full select-none py-3.5 mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {isLoading ? "Consulting Firebase..." : "Unlock Dashboard"}
          {!isLoading && <ArrowRight size={14} />}
        </button>
      </form>

      <div className="border-t border-[#21352b]/5 pt-4 text-center">
        <p className="text-[9px] text-[#21352b]/50 leading-relaxed font-semibold">
          Strict authorized personnel bounds. Sandbox credentials for evaluation:<br />
          <span className="font-mono text-[#4e6b5c] select-all font-bold">admin@greengirl.com</span> / <span className="font-mono text-[#4e6b5c] select-all font-bold">greengirl2026</span>
        </p>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background soft pastel radial elements */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#dbece2] opacity-30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#fcefe9] opacity-25 blur-[130px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="w-full max-w-md glass-panel p-8 rounded-[32px] border-2 border-white/60 relative z-10 flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <Leaf className="text-[#4e6b5c] animate-bounce" size={28} />
          <p className="text-[10px] font-bold tracking-wider text-[#21352b]/50 uppercase">Loading portal...</p>
        </div>
      }>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
