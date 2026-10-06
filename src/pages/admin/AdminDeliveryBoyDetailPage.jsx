import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import {
  ArrowLeft,
  Phone,
  Bike,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const AdminDeliveryBoyDetailPage = () => {
  const { id } = useParams();
  const { deliveryBoys, orders } = useAppData();

  const boy = deliveryBoys.find((b) => b.id === id) || deliveryBoys[0];

  const mapMarkers = [
    {
      id: boy.id,
      title: `${boy.name} (${boy.vehicleNumber})`,
      subtitle: boy.status,
      type: "driver",
      x: boy.mapCoordinates?.x || 40,
      y: boy.mapCoordinates?.y || 45
    }
  ];

  if (boy.currentOrder) {
    mapMarkers.push({
      id: "cust-dest",
      title: boy.currentOrder.customerName,
      subtitle: boy.currentOrder.customerAddress,
      type: "customer",
      x: (boy.mapCoordinates?.x || 40) + 25,
      y: (boy.mapCoordinates?.y || 45) + 20
    });
  }

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Back Button */}
      <div>
        <Link
          to="/admin/delivery-boys"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Directory</span>
        </Link>
      </div>

      {/* Driver Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src={boy.avatar}
              alt={boy.name}
              className="w-20 h-20 rounded-3xl object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900 font-serif">{boy.name}</h1>
                <span className="bg-slate-900 text-emerald-400 font-mono text-xs font-bold px-2 py-0.5 rounded-lg">
                  {boy.employeeId}
                </span>
                <Badge status={boy.status} />
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {boy.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-emerald-600" /> {boy.vehicleNumber} ({boy.vehicleType})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> <strong>{boy.rating}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Today's COD Collected</span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              {brand.currency}{boy.todayStats.codCollected.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              {boy.todayStats.completed} drops completed
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Stats & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Columns: Statistics & Active Order */}
        <div className="lg:col-span-6 space-y-6">
          {/* Performance Counter */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Today Total</span>
              <span className="text-2xl font-black text-slate-900">{boy.todayStats.total}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
              <span className="text-2xl font-black text-emerald-700">{boy.todayStats.completed}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending</span>
              <span className="text-2xl font-black text-amber-600">{boy.todayStats.pending}</span>
            </div>
          </div>

          {/* Current Active Task Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Current On-Road Task</span>
              {boy.currentOrder && (
                <span className="text-emerald-700 font-mono">#{boy.currentOrder.orderId}</span>
              )}
            </h3>

            {boy.currentOrder ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <strong className="text-slate-800">{boy.currentOrder.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Address:</span>
                  <strong className="text-slate-800">{boy.currentOrder.customerAddress}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Distance & ETA:</span>
                  <strong className="text-emerald-700">
                    {boy.currentOrder.distanceKm} km • {boy.currentOrder.etaMins} mins
                  </strong>
                </div>
                <div className="pt-2">
                  <Link
                    to={`/admin/orders/${boy.currentOrder.orderId}`}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center block"
                  >
                    View Active Order Details
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Currently not on active trip.</p>
            )}
          </div>
        </div>

        {/* Right 6 Columns: Real-time Location Map */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-600" /> Driver Current Zone: {boy.currentZone}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              GPS Active
            </span>
          </div>

          <MapPlaceholder
            markers={mapMarkers}
            route={Boolean(boy.currentOrder)}
            center={{ name: boy.currentZone }}
            height="h-72 sm:h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDeliveryBoyDetailPage;

