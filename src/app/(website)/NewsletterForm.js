"use client";

import React from "react";

export default function NewsletterForm() {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our private list!");
        e.target.reset();
      }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2 z-10"
    >
      <input 
        type="email" 
        required
        placeholder="Enter your email address" 
        className="flex-1 px-5 py-3 rounded-full bg-black/45 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B2C4AC] transition-all"
      />
      <button 
        type="submit" 
        className="px-6 py-3 bg-[#B2C4AC] text-[#0D110D] rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#A1B399] transition-all whitespace-nowrap active:scale-95 cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
