import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  PackageCheck,
  CreditCard,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const AdminCustomerDetailPage = () => {
  const { id } = useParams();
  const { customers, orders, subscriptions } = useAppData();

  const customer = customers.find((c) => c.id === id) || customers[0];

  // Customer's orders
  const customerOrders = orders.filter(
    (o) => o.customerId === customer.id || o.customerId === 'cust-1'
  );

  // Customer's subscriptions
  const customerSubs = subscriptions.filter(
    (s) => s.customerId === customer.id || s.customerId === 'cust-1'
  );

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers Directory</span>
        </Link>
      </div>

      {/* Customer Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-20 h-20 rounded-3xl object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900 font-serif">{customer.name}</h1>
                <span className="bg-amber-400 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  {customer.role}
                </span>
                <Badge status={customer.status} size="sm" />
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {customer.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" /> {customer.email}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Customer ID: {customer.id} • Registered {customer.joinDate}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Lifetime Spend</span>
            <span className="text-2xl font-black text-emerald-700">
              {brand.currency}{customer.totalSpent.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block">{customer.totalOrders} delivered orders</span>
          </div>
        </div>
      </div>

      {/* Addresses & Active Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Saved Addresses (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" /> Saved Delivery Addresses ({customer.addresses?.length})
          </h3>

          <div className="space-y-3 text-xs">
            {customer.addresses?.map((addr) => (
              <div key={addr.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-emerald-700 text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded">Default</span>
                  )}
                </div>
                <p className="text-slate-700 font-medium">{addr.houseNo}, {addr.street}</p>
                <p className="text-slate-400">{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" /> Active Subscriptions ({customerSubs.length})
          </h3>

          {customerSubs.length === 0 ? (
            <p className="text-xs text-slate-500">No active subscriptions currently.</p>
          ) : (
            <div className="space-y-3">
              {customerSubs.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={sub.image} alt={sub.productName} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <strong className="text-slate-900 font-bold block">{sub.productName}</strong>
                      <span className="text-slate-500">{sub.quantity} {sub.unit} • {sub.frequency}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">{brand.currency}{sub.pricePerDay}/drop</span>
                    <Badge status={sub.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-emerald-600" /> Order History ({customerOrders.length})
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {customerOrders.map((order) => (
            <div key={order.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/orders/${order.id}`} className="font-mono font-bold text-slate-900 hover:text-emerald-700">
                    #{order.id}
                  </Link>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{order.orderDate}</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  {order.items?.map(it => `${it.name} ×${it.quantity}`).join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">{brand.currency}{order.total}</span>
                <Badge status={order.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetailPage;

