'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Save } from 'lucide-react';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading">Add New Product</h1>
          <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Save size={18} /> Save & Publish
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                  <input type="text" placeholder="e.g. Oversized Heavyweight Tee" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={4} placeholder="Premium quality details..." className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input type="number" placeholder="1299" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input type="number" placeholder="1999" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Variants & Inventory</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                  <div className="flex gap-3">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-black w-4 h-4" />
                        <span className="text-sm font-medium">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Stock Quantity</label>
                  <input type="number" placeholder="100" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Media</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                <Upload size={32} className="mb-2" />
                <span className="text-sm font-medium text-center">Click to upload images<br/>(Max 5MB each)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black bg-white">
                    <option>T-Shirts</option>
                    <option>Hoodies</option>
                    <option>Jeans</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black bg-white">
                    <option>Men</option>
                    <option>Women</option>
                    <option>Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input type="text" placeholder="Summer, Oversized..." className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
