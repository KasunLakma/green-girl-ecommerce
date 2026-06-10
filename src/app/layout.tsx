import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Girl — Boutique Gift Shop",
  description: "A premium, hand-crafted collection of boutique gifts, organic plants, ceramics, and curated gift boxes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
