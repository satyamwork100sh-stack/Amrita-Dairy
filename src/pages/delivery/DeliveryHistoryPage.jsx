import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import { History, Search, Calendar, Banknote } from 'lucide-react';

export const DeliveryHistoryPage = () => {
  const { orders } = useAppData();
  const [search, setSearch] = useState('');

  // Completed or historical deliveries
  const completedOrders = orders.filter(
    (o) => o.status === 'Delivered'
  );

  const totalEarnings = completedOrders.length * 80; // demo incentive ₹80/trip
  const totalCashCollected = completedOrders
    .filter((o) => o.paymentMethod === 'Cash on Delivery')
    .reduce((sum, o) => sum + o.total, 0);

  const filtered = completedOrders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.paymentMethod.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
          Delivery History & Trip Logs
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Archived successful morning dairy drops and collection settlements.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Completed Trips
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{completedOrders.length}</p>
          <span className="text-[11px] text-emerald-700 font-semibold">100% Verified Drops</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Estimated Trip Payout
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {brand.currency}{totalEarnings.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">₹80 per completed run</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search past order ID, customer, payment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Table / Cards List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
        {filtered.map((order) => (
          <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-sm">#{order.id}</span>
                <Badge status={order.status} size="sm" />
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{order.orderDate}</span>
              </div>
              <p className="text-slate-700 font-medium">
                Customer: <strong>{order.customerName}</strong> ({order.address?.street})
              </p>
              <div className="text-slate-400 flex flex-wrap gap-2 text-[11px]">
                {order.items.map((it, idx) => (
                  <span key={idx}>{it.name} ×{it.quantity}</span>
                ))}
              </div>
            </div>

            <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <span className="text-base font-black text-slate-900 block font-mono">
                {brand.currency}{order.total}
              </span>
              <span className="text-[11px] text-slate-500">
                {order.paymentMethod} ({order.paymentStatus})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryHistoryPage;

