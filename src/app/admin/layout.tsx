import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#0B0F12] text-white selection:bg-[#10B981]/20 selection:text-[#10B981]">
      {/* Sleek top ambient boundary line for admin workspace */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
      
      {/* Structural Workspace Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
