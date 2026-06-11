import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Girl — Premium Gifting Concept",
  description: "A dark luxury showcase of volcanic clay, matte ceramics, rare flora, and custom black wood crates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-[#090B0E]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
