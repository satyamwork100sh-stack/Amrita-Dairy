import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import {
  PackageCheck,
  Calendar,
  Navigation,
  ArrowRight,
  Clock,
  ChevronRight,
  Filter
} from 'lucide-react';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, currentCustomer } = useAppData();
  const [filterStatus, setFilterStatus] = useState('all');

  // Customer's orders (for demo, orders matching cust-1 or all demo orders)
  const customerOrders = orders.filter(
    (o) => o.customerId === currentCustomer.id || o.customerId === 'cust-1'
  );

  const filteredOrders = customerOrders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            My Dairy Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track active morning drops and view past delivery receipts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['all', 'out for delivery', 'delivered', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                filterStatus === tab
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={PackageCheck}
          title="No orders found"
          description="You don't have any orders under this filter category."
          actionLabel="Shop Farm Products"
          onAction={() => navigate('/shop')}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isActive =
              order.status === 'Out for Delivery' ||
              order.status === 'Preparing' ||
              order.status === 'Confirmed' ||
              order.status === 'Assigned';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition overflow-hidden p-5 sm:p-6"
              >
                {/* Top Row: Order ID, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Order</span>
                      <h3 className="text-base font-black text-slate-900 font-mono">#{order.id}</h3>
                    </div>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">{order.orderDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge status={order.status} />
                    <span className="text-sm font-black text-slate-900">
                      {brand.currency}{order.total}
                    </span>
                  </div>
                </div>

                {/* Items & Delivery Partner Row */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Items thumbnail list */}
                  <div className="md:col-span-8 flex flex-wrap items-center gap-3">
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-100 text-xs"
                      >
                        <img src={it.image} alt={it.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <span className="font-semibold text-slate-800 block line-clamp-1">{it.name}</span>
                          <span className="text-slate-400 text-[11px]">{it.unit} × {it.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="md:col-span-4 text-left md:text-right text-xs">
                    {order.deliveryBoyName && (
                      <div className="text-slate-500">
                        <span>Partner: </span>
                        <strong className="text-slate-800 font-bold">{order.deliveryBoyName}</strong>
                      </div>
                    )}
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {order.expectedDelivery}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Mode: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                  </span>

                  <div className="flex items-center gap-2">
                    {isActive && (
                      <Link
                        to={`/track-order/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Track Live</span>
                      </Link>
                    )}
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
                    >
                      <span>Receipt</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

