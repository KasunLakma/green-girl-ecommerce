"use client";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-lg bg-zinc-900/50">
        <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input type="email" placeholder="user@domain.com" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-zinc-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" placeholder="Enter password" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-zinc-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-zinc-100 text-black font-semibold rounded hover:bg-zinc-200 transition">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}
