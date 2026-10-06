import React, { useState } from 'react';
import { weeklySalesData } from '../../data/dashboard';
import { brand } from '../../config/brand';
import { TrendingUp, BarChart2 } from 'lucide-react';

export const SalesChart = () => {
  const [activeTab, setActiveTab] = useState('revenue'); // revenue or orders
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxRevenue = Math.max(...weeklySalesData.map(d => d.revenue));
  const maxOrders = Math.max(...weeklySalesData.map(d => d.orders));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Weekly Sales & Fulfillment</h3>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" /> +14.8% vs last week
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Dispatches from Monday to Sunday across Lucknow Hubs</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'revenue'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Revenue ({brand.currency})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Orders Count
          </button>
        </div>
      </div>

      {/* SVG / HTML Bar Chart Visualizer */}
      <div className="pt-4 pb-2">
        <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-100">
          {weeklySalesData.map((d, index) => {
            const isHovered = hoveredDay?.day === d.day;
            const currentVal = activeTab === 'revenue' ? d.revenue : d.orders;
            const maxVal = activeTab === 'revenue' ? maxRevenue : maxOrders;
            const heightPercent = Math.round((currentVal / maxVal) * 85);

            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredDay(d)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 bg-slate-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap animate-fadeIn border border-slate-800 pointer-events-none">
                    <span className="text-emerald-400 font-bold">{d.day}: </span>
                    {activeTab === 'revenue' ? `${brand.currency}${d.revenue.toLocaleString()}` : `${d.orders} orders`}
                  </div>
                )}

                {/* Animated Column Bar */}
                <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isHovered
                        ? 'bg-emerald-500'
                        : index === 6
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-500'
                        : 'bg-gradient-to-t from-emerald-700/80 to-emerald-500/80'
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span className="text-xs font-semibold text-slate-500 mt-2.5 group-hover:text-slate-900 transition">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart Summary Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 px-2">
          <span>Peak Demand Day: <strong className="text-slate-800 font-bold">Sunday (118 orders • ₹67,300)</strong></span>
          <span className="text-emerald-700 font-semibold">100% On-Time Morning Dispatches</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;

