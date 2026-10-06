import React from 'react';
import { brand } from '../../config/brand';
import { dashboardStats, topProductsData, deliveryBoyPerformance, weeklySalesData } from '../../data/dashboard';
import { customers } from '../../data/customers';
import StatCard from '../../components/common/StatCard';
import SalesChart from '../../components/admin/SalesChart';
import {
  BarChart3,
  TrendingUp,
  Banknote,
  ShoppingCart,
  Calendar,
  CheckCircle2,
  XCircle,
  Award,
  Users
} from 'lucide-react';

export const AdminReportsPage = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
          Executive Reports & Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive business intelligence on milk sales, delivery efficiency, and recurring revenue.
        </p>
      </div>

      {/* 6 Key Report Metric Cards (Prompt requirement 46) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Revenue"
          value={`₹${dashboardStats.todayRevenue}`}
          subtitle="Today's GMV"
          trend={{ direction: 'up', label: '+14%' }}
          color="emerald"
        />

        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          subtitle="Processed"
          color="blue"
        />

        <StatCard
          title="Avg Order Value"
          value={dashboardStats.avgOrderValue}
          subtitle="Basket size"
          color="purple"
        />

        <StatCard
          title="Delivered Orders"
          value="1,215"
          subtitle="97.4% Rate"
          color="emerald"
        />

        <StatCard
          title="Cancelled"
          value="33"
          subtitle="2.6% Rate"
          color="rose"
        />

        <StatCard
          title="Sub Revenue"
          value={dashboardStats.subscriptionRevenue}
          subtitle="Recurring Monthly"
          color="amber"
        />
      </div>

      {/* Sales Overview Chart */}
      <SalesChart />

      {/* Two Column Section: Top Products & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Top Products */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Top Selling Dairy Lines
            </h3>
            <span className="text-xs text-slate-400">By Revenue Share</span>
          </div>

          <div className="space-y-4">
            {topProductsData.map((prod, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{prod.name}</span>
                  <span className="text-emerald-700">{prod.revenue}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${prod.share * 2.2}%` }}
                    className="bg-emerald-600 h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Units Sold: {prod.salesCount}</span>
                  <span>{prod.share}% Total Sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Valued Customers */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Most Valued Subscribers
            </h3>
            <span className="text-xs text-slate-400">Lifetime LTV</span>
          </div>

          <div className="space-y-3 text-xs">
            {customers.slice(0, 5).map((c, idx) => (
              <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <strong className="text-slate-900 block font-bold">{c.name}</strong>
                    <span className="text-slate-400 text-[10px]">{c.totalOrders} orders</span>
                  </div>
                </div>
                <span className="font-bold text-emerald-700 font-mono">
                  {brand.currency}{c.totalSpent.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Performance */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
          Delivery Fleet Efficiency & On-Time Performance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {deliveryBoyPerformance.map((boy, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-2">
              <strong className="text-slate-900 font-bold block text-sm">{boy.name}</strong>
              <div className="flex justify-between text-slate-600">
                <span>Trips:</span>
                <span className="font-bold text-slate-900">{boy.trips}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>On-Time:</span>
                <span className="font-bold text-emerald-700">{boy.onTimePercent}%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Rating:</span>
                <span className="font-bold text-amber-500">{boy.rating} ★</span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                <span>Payout:</span>
                <span className="font-bold text-slate-900">{boy.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;

