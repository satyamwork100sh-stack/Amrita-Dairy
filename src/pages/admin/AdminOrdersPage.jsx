import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import OrderDetailModal from '../../components/admin/OrderDetailModal';
import { Search, Filter, Eye, UserPlus, Clock } from 'lucide-react';

export const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useAppData();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);

  const tabs = [
    'All',
    'Pending',
    'Confirmed',
    'Preparing',
    'Assigned',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== 'All' && !order.status.toLowerCase().includes(activeTab.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.includes(q) ||
        order.address?.street?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Order Fulfillment Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor and assign daily morning milk, curd, paneer and ghee orders.
          </p>
        </div>
      </div>

      {/* Control Strip: Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? orders.length
                : orders.filter((o) => o.status.toLowerCase().includes(tab.toLowerCase())).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    activeTab === tab ? 'bg-slate-800 text-emerald-400' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by order #DF..., customer name, phone, or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Delivery Executive</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <Link to={`/admin/orders/${order.id}`} className="hover:text-emerald-700">
                      #{order.id}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-800 font-bold block">{order.customerName}</strong>
                    <span className="text-[11px] text-slate-400">{order.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate">
                    {order.items?.map((it) => `${it.name} (×${it.quantity})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {brand.currency}{order.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-medium text-slate-700">{order.paymentMethod}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{order.paymentStatus}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800">
                      {order.deliveryBoyName || (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                          Unassigned
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={order.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrderForModal(order)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition cursor-pointer"
                    >
                      Quick Edit
                    </button>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition inline-block"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedOrderForModal && (
        <OrderDetailModal
          order={selectedOrderForModal}
          isOpen={Boolean(selectedOrderForModal)}
          onClose={() => setSelectedOrderForModal(null)}
        />
      )}
    </div>
  );
};

export default AdminOrdersPage;

