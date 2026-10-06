import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import { Calendar, Search, Pause, Play, Trash2 } from 'lucide-react';

export const AdminSubscriptionsPage = () => {
  const { subscriptions, toggleSubscriptionStatus, cancelSubscription } = useAppData();
  const [search, setSearch] = useState('');

  const filtered = subscriptions.filter((s) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.customerName.toLowerCase().includes(q) ||
        s.productName.toLowerCase().includes(q) ||
        s.frequency.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
          Milk Subscriptions Operations ({subscriptions.length})
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage recurring morning milk mandates, pause requests, and delivery frequencies.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search subscriptions by subscriber name, product, or plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Sub ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Qty</th>
                <th className="py-3.5 px-4">Frequency</th>
                <th className="py-3.5 px-4">Price/Day</th>
                <th className="py-3.5 px-4">Next Delivery</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {sub.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-800 font-bold block">{sub.customerName}</strong>
                    <span className="text-[10px] text-slate-400">{sub.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {sub.productName}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    {sub.quantity} {sub.unit}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    {sub.frequency}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {brand.currency}{sub.pricePerDay}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {sub.nextDelivery}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={sub.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => toggleSubscriptionStatus(sub.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        sub.status === 'Active'
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {sub.status === 'Active' ? 'Pause' : 'Resume'}
                    </button>
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Cancel Subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;

