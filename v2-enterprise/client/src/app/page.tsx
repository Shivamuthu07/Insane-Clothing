'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Animated Hero Merged from Old Design */}
      <div className="-mt-16"> {/* Negative margin to push hero up under transparent header */}
        <Hero />
      </div>

      {/* Featured Collections Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold font-heading mb-12 text-center">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative h-[500px] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000" alt="Summer Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-bold mb-2">Summer 2026</h3>
              <p className="text-lg">Lightweight linens & essentials.</p>
            </div>
          </div>
          <div className="group relative h-[500px] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516826957135-700edeb5f9fa?q=80&w=1000" alt="Streetwear Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-bold mb-2">Urban Streetwear</h3>
              <p className="text-lg">Oversized fits & bold designs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
