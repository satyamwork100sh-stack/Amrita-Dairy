import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import DeliveryOrderCard from '../../components/delivery/DeliveryOrderCard';
import EmptyState from '../../components/common/EmptyState';
import { Package, Search, Filter } from 'lucide-react';

export const DeliveryOrdersPage = () => {
  const { orders } = useAppData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Orders in rider's queue
  const driverOrders = orders.filter((o) => o.deliveryBoyId === 'db-1' || o.deliveryBoyName?.includes('Rahul'));

  const filtered = driverOrders.filter((o) => {
    if (filter === 'pending' && o.status === 'Delivered') return false;
    if (filter === 'delivered' && o.status !== 'Delivered') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.address?.street?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
          Today's Deliveries ({driverOrders.length})
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Morning delivery run sheet • Sector 5, Vipul Khand, Gomti Nagar
        </p>
      </div>

      {/* Search & Tabs */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by customer name, address, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'all', label: `All (${driverOrders.length})` },
            { id: 'pending', label: `Pending (${driverOrders.filter(o => o.status !== 'Delivered').length})` },
            { id: 'delivered', label: `Delivered (${driverOrders.filter(o => o.status === 'Delivered').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deliveries Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No delivery tasks found"
          description="You don't have any deliveries matching this search query."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <DeliveryOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryOrdersPage;

