import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import { CreditCard, Search, Banknote, Download } from 'lucide-react';

export const AdminPaymentsPage = () => {
  const { payments } = useAppData();
  const [search, setSearch] = useState('');

  const filtered = payments.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.orderId.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalSettled = payments
    .filter(p => p.status === 'Completed' || p.status === 'Settled')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Settlement & Payments Ledger ({payments.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit UPI collections, cash receipts, monthly autopay mandates, and customer refunds.
          </p>
        </div>

        <button
          onClick={() => alert("Exporting reconciliation statement as CSV...")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Ledger</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Collections</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {brand.currency}{totalSettled.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Reconciled this month</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Autopay Mandates</span>
          <p className="text-2xl font-black text-slate-900 mt-1">84%</p>
          <span className="text-[11px] text-emerald-700 font-semibold">Zero failure rate</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Gateway</span>
          <p className="text-xl font-bold text-slate-800 mt-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>UPI Multi-Bank Live</span>
          </p>
          <span className="text-[11px] text-slate-400">Instant HDFC/SBI webhook</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Transaction ID, Order #, or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Order / Purpose</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-emerald-700 block">
                      #{txn.orderId}
                    </span>
                    <span className="text-[10px] text-slate-400">{txn.type}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {txn.customerName}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {brand.currency}{txn.amount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {txn.method}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={txn.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-500">
                    {txn.date}
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

export default AdminPaymentsPage;

