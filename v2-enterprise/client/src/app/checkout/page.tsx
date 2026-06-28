'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold font-heading mb-2">Secure Checkout</h1>
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <Lock size={16} /> Encrypted & Secure Payment
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Customer Info & Shipping */}
        <div className="w-full lg:w-3/5 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-black w-4 h-4" defaultChecked />
                <span className="text-sm text-gray-600">Email me with news and offers</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <input type="text" placeholder="Last Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <input type="text" placeholder="Address" className="w-full md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <input type="text" placeholder="City" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <input type="text" placeholder="Pincode" className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
              <input type="text" placeholder="Phone Number" className="w-full md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-black" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Payment Integration</h2>
            <div className="space-y-4">
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="accent-black w-5 h-5" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                  <span className="font-semibold">Razorpay (UPI, Cards, NetBanking)</span>
                </div>
                <div className="font-bold text-blue-600 tracking-wider font-heading">RAZORPAY</div>
              </label>
              
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="accent-black w-5 h-5" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
                  <span className="font-semibold">Stripe (International Credit Cards)</span>
                </div>
                <div className="font-bold text-indigo-500 tracking-wider font-heading">STRIPE</div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-20 h-24 bg-white rounded-lg overflow-hidden border">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Oversized Heavyweight Tee</h3>
                <p className="text-sm text-gray-500 mb-2">Size: L</p>
                <p className="font-bold">₹1,299</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹1,299.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST 18%)</span>
                <span>₹233.82</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold font-heading">₹1,532.82</span>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4">
               {paymentMethod === 'razorpay' ? 'Pay via Razorpay' : 'Pay via Stripe'}
            </button>
            
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
               <ShieldCheck size={14} /> Secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
