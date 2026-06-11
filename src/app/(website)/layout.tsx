import React from "react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#0B0F12] text-white">
      {children}
    </div>
  );
}
