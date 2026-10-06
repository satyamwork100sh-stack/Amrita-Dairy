import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { dashboardStats, topProductsData, deliveryBoyPerformance } from '../../data/dashboard';
import { brand } from '../../config/brand';
import StatCard from '../../components/common/StatCard';
import SalesChart from '../../components/admin/SalesChart';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import OrderDetailModal from '../../components/admin/OrderDetailModal';
import {
  ShoppingCart,
  Clock,
  Bike,
  CheckCircle2,
  Users,
  Banknote,
  TrendingUp,
  Navigation,
  ArrowRight,
  Sparkles,
  Eye,
  Layers
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { orders, deliveryBoys, products } = useAppData();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const recentOrders = orders.slice(0, 7);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            Operations & Fleet Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time fulfillment metrics across Lucknow processing hubs and delivery routes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/live-tracking"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Fleet Live Map</span>
          </Link>
        </div>
      </div>

      {/* 8 Metric KPI Cards (Prompt requirement 33) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Orders */}
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          subtitle="Lifetime volume"
          icon={ShoppingCart}
          color="emerald"
        />

        {/* Today's Orders */}
        <StatCard
          title="Today's Orders"
          value={dashboardStats.todayOrders}
          subtitle="Morning shift"
          trend={{ direction: 'up', label: '+18% vs yesterday' }}
          icon={Clock}
          color="blue"
        />

        {/* Pending Orders */}
        <StatCard
          title="Pending Orders"
          value={dashboardStats.pendingOrders}
          subtitle="Awaiting dispatch"
          icon={Clock}
          color="amber"
        />

        {/* Out for Delivery */}
        <StatCard
          title="Out for Delivery"
          value={dashboardStats.outForDelivery}
          subtitle="On scooters right now"
          icon={Bike}
          color="purple"
        />

        {/* Delivered */}
        <StatCard
          title="Delivered Today"
          value={dashboardStats.delivered}
          subtitle="Doorstep drops completed"
          icon={CheckCircle2}
          color="emerald"
        />

        {/* Total Customers */}
        <StatCard
          title="Total Customers"
          value={dashboardStats.totalCustomers}
          subtitle="Active households"
          icon={Users}
          color="blue"
        />

        {/* Active Delivery Boys */}
        <StatCard
          title="Active Drivers"
          value={dashboardStats.activeDeliveryBoys}
          subtitle="On-road Lucknow fleet"
          icon={Bike}
          color="emerald"
        />

        {/* Today's Revenue */}
        <StatCard
          title="Today's Revenue"
          value={`${brand.currency}${dashboardStats.todayRevenue}`}
          subtitle="Gross sales booked"
          trend={{ direction: 'up', label: '+14.8%' }}
          icon={Banknote}
          color="emerald"
        />
      </div>

      {/* Main Grid: Weekly Sales Chart + Fleet Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales Chart (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <SalesChart />

          {/* Recent Orders Table (Prompt requirement 35) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recent Customer Orders</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time morning dispatch transactions</p>
              </div>
              <Link
                to="/admin/orders"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Manage All ({orders.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Products</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Delivery Partner</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-bold font-mono text-slate-900">
                        #{order.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {order.customerName}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        {order.items.map(i => `${i.name} (×${i.quantity})`).join(', ')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {brand.currency}{order.total}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">
                          {order.deliveryBoyName || 'Unassigned'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge status={order.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Top Products & Fleet Riders Quick View */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Selling Products */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Top Selling Products</h4>
              <Link to="/admin/products" className="text-xs font-semibold text-emerald-700 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {topProductsData.map((item, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{item.name}</span>
                    <span>{item.revenue}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.share * 2}%` }}
                      className="bg-emerald-600 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Volume: {item.salesCount}</span>
                    <span>{item.share}% catalogue share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Team Live Status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Fleet Availability</h4>
              <Link to="/admin/delivery-boys" className="text-xs font-semibold text-emerald-700 hover:underline">
                Manage Fleet
              </Link>
            </div>

            <div className="space-y-3">
              {deliveryBoys.slice(0, 5).map((boy) => (
                <div key={boy.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5">
                    <img src={boy.avatar} alt={boy.name} className="w-8 h-8 rounded-xl object-cover" />
                    <div>
                      <strong className="text-slate-900 font-bold block">{boy.name}</strong>
                      <span className="text-slate-400 text-[11px]">{boy.vehicleNumber}</span>
                    </div>
                  </div>
                  <Badge status={boy.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;

