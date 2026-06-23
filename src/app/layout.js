import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Green Girl — Premium Storefront",
  description: "A dark luxury showcase of volcanic clay, matte ceramics, rare flora, and custom black wood crates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

