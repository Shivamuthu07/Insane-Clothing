'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Placeholder data until we connect to Express/MongoDB
  const mockProducts = [
    { id: 1, name: 'Oversized Heavyweight Tee', price: 1299, category: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
    { id: 2, name: 'Vintage Wash Denim', price: 2499, category: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80' },
    { id: 3, name: 'Signature Zip Hoodie', price: 2999, category: 'Hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
    { id: 4, name: 'Boxy Fit Linen Shirt', price: 1899, category: 'Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e13?w=800&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12">
      {/* Advanced Filter Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-lg mb-8 border-b pb-4">
          <Filter size={20} /> Filters
        </div>
        
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer">
              Categories <ChevronDown size={16} />
            </h3>
            <div className="space-y-3 text-gray-600">
              {['All', 'T-Shirts', 'Hoodies', 'Shirts', 'Jeans', 'Accessories'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="category" className="accent-black w-4 h-4" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} />
                  <span className="group-hover:text-black transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer">
              Size <ChevronDown size={16} />
            </h3>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button key={size} className="w-12 h-12 border border-gray-200 rounded-md flex items-center justify-center text-sm hover:border-black hover:bg-black hover:text-white transition-colors">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center justify-between cursor-pointer">
              Price Range <ChevronDown size={16} />
            </h3>
            <input type="range" min="0" max="10000" className="w-full accent-black" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹0</span>
              <span>₹10,000+</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold">New Arrivals</h1>
          <select className="border border-gray-200 rounded-lg px-4 py-2 bg-transparent text-sm font-medium outline-none cursor-pointer">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <Link href={`/shop/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-black py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-black hover:text-white">
                  <ShoppingBag size={18} /> Quick Add
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
                <span className="font-bold">₹{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Infinite Scroll Loader Placeholder */}
        <div className="mt-16 text-center">
          <button className="border-2 border-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-colors">
            Load More Products
          </button>
        </div>
      </main>
    </div>
  );
}
