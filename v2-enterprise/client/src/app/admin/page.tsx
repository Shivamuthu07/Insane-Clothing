import Link from 'next/link';
import { Package, Users, DollarSign, Activity, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-xl font-bold font-heading mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg">
            <Activity size={18} /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Package size={18} /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <DollarSign size={18} /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Users size={18} /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading">Overview</h1>
          <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            + Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-sm font-semibold mb-2">Total Revenue</div>
            <div className="text-3xl font-bold">₹0.00</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-sm font-semibold mb-2">Total Orders</div>
            <div className="text-3xl font-bold">0</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-sm font-semibold mb-2">Active Products</div>
            <div className="text-3xl font-bold">0</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-sm font-semibold mb-2">Conversion Rate</div>
            <div className="text-3xl font-bold">0.0%</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold font-heading mb-4">Recent Activity</h3>
          <div className="text-gray-500 text-center py-12">
            No recent activity to display.
          </div>
        </div>
      </main>
    </div>
  );
}
