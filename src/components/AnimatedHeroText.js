"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedHeroText() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".char-reveal", 
        { opacity: 0, y: 30, rotateX: -15 }, 
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power4.out", stagger: 0.15, delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6">
      <h1 className="char-reveal text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
        Crafted with Love, <br />
        <span className="bg-gradient-to-r from-white via-[#B2C4AC] to-[#B2C4AC] bg-clip-text text-transparent">Styled for You</span>
      </h1>
      <div className="char-reveal hype-glass px-6 py-4 max-w-2xl mx-auto border border-white/0.08 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-sm sm:text-base text-neutral-350 font-medium tracking-wide leading-relaxed">
        Discover a curated selection of luxury boutique gift items, matte ceramics, rare flora, and custom-crafted hampers made for the discerning collector.
      </div>
    </div>
  );
}
