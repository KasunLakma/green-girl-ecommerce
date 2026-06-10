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
    <div className="w-full max-w-md glass-panel p-8 rounded-[2.5rem] border-2 border-white/60 relative z-10 flex flex-col gap-6 shadow-2xl">
      
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md">
          <Leaf size={24} />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-foreground mt-2">
          Green Girl Admin
        </h1>
        <p className="text-xs font-medium text-foreground/60 max-w-xs">
          Restricted access portal. Please log in using your authorized boutique credentials.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-800 text-xs px-4 py-3 rounded-2xl flex items-center gap-2.5">
          <ShieldAlert size={16} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs px-4 py-3 rounded-2xl flex items-center gap-2.5">
          <Sparkles size={16} className="shrink-0 text-emerald-600 animate-spin" />
          <span>Success! Redirecting you to the workspace dashboard...</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground/70 tracking-wide uppercase px-1">
            Admin Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/40">
              <Mail size={16} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@greengirl.com"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md text-sm text-foreground focus:outline-none focus:border-primary focus:bg-white/40 transition-all placeholder-foreground/30"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-foreground/70 tracking-wide uppercase px-1">
            Secret Keyphrase
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/40">
              <Lock size={16} />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading || success}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md text-sm text-foreground focus:outline-none focus:border-primary focus:bg-white/40 transition-all placeholder-foreground/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="tactile-btn-primary w-full select-none py-3.5 mt-2 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide disabled:opacity-50"
        >
          {isLoading ? "Authenticating Node..." : "Enter Admin Dashboard"}
          {!isLoading && <ArrowRight size={16} />}
        </button>
      </form>

      <div className="border-t border-foreground/5 pt-4 text-center">
        <p className="text-[10px] text-foreground/40 leading-relaxed">
          Authorized administrative personnel only. Credentials for evaluation are:<br />
          <span className="font-mono text-foreground/60 font-semibold select-all">admin@greengirl.com</span> / <span className="font-mono text-foreground/60 font-semibold select-all">greengirl2026</span>
        </p>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background soft pastel radial elements */}
      <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent-mint/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-accent-blush/30 blur-[120px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="w-full max-w-md glass-panel p-8 rounded-[2.5rem] border-2 border-white/60 relative z-10 flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <Leaf className="text-primary animate-bounce" size={32} />
          <p className="text-xs font-semibold text-foreground/60">Loading credentials portal...</p>
        </div>
      }>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
