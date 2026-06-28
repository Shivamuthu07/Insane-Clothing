import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search, ShoppingBag, User, Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "INSANE CLOTHING | Premium Streetwear",
  description: "Redefining modern fashion with premium streetwear essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-6 md:px-12">
          <Link href="/" className="font-heading font-black text-2xl tracking-tighter">INSANE</Link>
          <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
            <Link href="/shop?category=New" className="hover:text-yellow-600 transition-colors">New Arrivals</Link>
            <Link href="/shop?category=Men" className="hover:text-yellow-600 transition-colors">Men</Link>
            <Link href="/shop?category=Women" className="hover:text-yellow-600 transition-colors">Women</Link>
            <Link href="/admin" className="text-gray-400 hover:text-black transition-colors">Admin</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Search size={18} className="cursor-pointer hover:opacity-70" />
            <Heart size={18} className="cursor-pointer hover:opacity-70" />
            <User size={18} className="cursor-pointer hover:opacity-70" />
            <ShoppingBag size={18} className="cursor-pointer hover:opacity-70" />
          </div>
        </header>
        
        <main className="min-h-screen pt-16">
          {children}
        </main>
        
        <footer className="bg-black text-white py-20 px-6 md:px-12 text-center">
          <h2 className="font-heading text-4xl mb-4 font-bold">INSANE</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">Premium essentials designed for everyday confidence. Elevate your wardrobe.</p>
          <p className="text-xs text-gray-600">© 2026 INSANE CLOTHING. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
