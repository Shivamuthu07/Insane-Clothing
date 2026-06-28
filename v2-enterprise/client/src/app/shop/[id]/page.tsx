'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Box } from 'lucide-react';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [is360View, setIs360View] = useState(false);

  // Mock product data
  const product = {
    name: 'Oversized Heavyweight Tee',
    price: 1299,
    originalPrice: 1999,
    description: 'Crafted from premium 280 GSM cotton, this heavyweight tee features a dropped shoulder and a boxy fit for the ultimate modern streetwear silhouette. Pre-shrunk and garment-dyed for a vintage feel.',
    fabric: '100% Premium Cotton (280 GSM)',
    care: 'Machine wash cold. Do not tumble dry.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Product Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 group cursor-crosshair">
            {is360View ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500">
                <Box size={48} className="mb-4 animate-spin-slow" />
                <p className="font-semibold">Interactive 360° View Loaded</p>
                <p className="text-sm">Drag to rotate product</p>
              </div>
            ) : (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            )}
            
            <button 
              onClick={() => setIs360View(!is360View)}
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Box size={16} /> {is360View ? 'Exit 360°' : '360° View'}
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${i === 0 && !is360View ? 'border-black' : 'border-transparent'}`}>
                <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold font-heading mb-2">{product.name}</h1>
          <div className="flex items-end gap-4 mb-6">
            <span className="text-2xl font-bold">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.originalPrice}</span>
            <span className="text-green-600 font-semibold mb-1 text-sm bg-green-50 px-2 py-0.5 rounded">Save 35%</span>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Select Size</span>
              <button className="text-sm text-gray-500 underline hover:text-black">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg border font-medium transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Actions on Mobile, Normal on Desktop */}
          <div className="flex gap-4 mb-10 sticky bottom-6 z-20 bg-white p-2 -mx-2">
            <button className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <ShoppingBag size={20} /> Add To Bag
            </button>
            <button className="w-16 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          {/* Details Accodion / Info */}
          <div className="space-y-6 border-t pt-8">
            <div>
              <h3 className="font-bold mb-2">Fabric & Care</h3>
              <p className="text-gray-600 text-sm">{product.fabric}<br/>{product.care}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Authentic Product</h4>
                  <p className="text-xs text-gray-500">100% Genuine Quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={20} className="mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={20} className="mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">7 Day Returns</h4>
                  <p className="text-xs text-gray-500">Hassle-free exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold font-heading mb-2 text-center">Complete The Look</h2>
        <p className="text-gray-500 text-center mb-10">AI-curated pieces that perfectly match this item.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative cursor-pointer group">
             <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4 pt-12 text-white">
               <h4 className="font-bold">Vintage Wash Denim</h4>
               <p className="text-sm">₹2499</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
