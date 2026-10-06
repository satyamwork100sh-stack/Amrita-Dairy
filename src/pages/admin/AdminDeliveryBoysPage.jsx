import React from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import { Bike, Phone, Star, ChevronRight, Navigation } from 'lucide-react';

export const AdminDeliveryBoysPage = () => {
  const { deliveryBoys, toggleDeliveryBoyOnline } = useAppData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Delivery Fleet Operations ({deliveryBoys.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor on-road drivers, assigned vehicle numbers, shift statuses, and active orders.
          </p>
        </div>

        <Link
          to="/admin/live-tracking"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
        >
          <Navigation className="w-4 h-4" />
          <span>Live Fleet Map</span>
        </Link>
      </div>

      {/* Fleet Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Executive</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Vehicle Number</th>
                <th className="py-3.5 px-4">Today's Deliveries</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Current Task</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveryBoys.map((boy) => (
                <tr key={boy.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={boy.avatar} alt={boy.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <strong className="text-slate-900 font-bold block">{boy.name}</strong>
                        <span className="text-[11px] font-mono text-slate-400">{boy.employeeId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-800 font-medium block">{boy.phone}</span>
                    <span className="text-slate-400 text-[10px]">{boy.currentZone}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {boy.vehicleNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">
                      {boy.todayStats.completed} / {boy.todayStats.total} done
                    </span>
                    <span className="text-[10px] text-slate-400">{boy.todayStats.pending} pending</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {boy.rating}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleDeliveryBoyOnline(boy.id)}
                      className="cursor-pointer"
                      title="Click to toggle status"
                    >
                      <Badge status={boy.status} size="sm" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    {boy.currentOrder ? (
                      <div>
                        <span className="font-bold font-mono text-emerald-700 block">
                          #{boy.currentOrder.orderId}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {boy.currentOrder.customerName} ({boy.currentOrder.distanceKm}km)
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No active task</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/admin/delivery-boys/${boy.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                    >
                      <span>Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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

export default AdminDeliveryBoysPage;

