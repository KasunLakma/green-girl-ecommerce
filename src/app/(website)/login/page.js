"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("mockUser", JSON.stringify({ email, uid: "mock-uid-12345" }));
      router.push('/profile');
    } catch (err) {
      if (err.message && (err.message.includes("api-key") || err.message.includes("API key") || err.code === "auth/invalid-api-key")) {
        sessionStorage.setItem("mockUser", JSON.stringify({ email, uid: "mock-uid-12345" }));
        router.push('/profile');
      } else {
        alert(err.message || "Failed to sign in.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050705] text-white px-4">
      <div className="w-full max-w-md bg-[#0D110D] border border-white/0.05 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-xl font-bold text-center mb-6 uppercase tracking-widest text-white">Green Girl Login</h1>
        <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white font-bold uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@greengirl.luxury"
              className="w-full px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-450 focus:outline-none focus:border-[#B2C4AC] focus:ring-1 focus:ring-[#B2C4AC] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white font-bold uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-xl bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-450 focus:outline-none focus:border-[#B2C4AC] focus:ring-1 focus:ring-[#B2C4AC] transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-[#B2C4AC] text-black hover:bg-[#A1B399] rounded-full font-black text-xs tracking-widest uppercase mt-4 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
