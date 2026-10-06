import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import OrderTimeline from '../../components/customer/OrderTimeline';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Phone,
  MessageSquare,
  MapPin,
  Bike,
  Clock,
  Navigation,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const TrackOrderPage = () => {
  const { id } = useParams();
  const { orders } = useAppData();

  const order = orders.find((o) => o.id === id) || orders[0];

  const mapMarkers = [
    {
      id: "hub-1",
      title: "DairyFresh Hub (Gomti Nagar)",
      title: "Amrita Dairy Hub (Gomti Nagar)",
      subtitle: "Dispatched at 06:40 AM",
      type: "hub",
      x: 20,
      y: 30
    },
    {
      id: "driver-rahul",
      title: order.deliveryBoyName || "Rahul Verma",
      subtitle: `${order.distanceKm || 1.8} km away • ETA ${order.etaMins || 12} min`,
      type: "driver",
      vehicle: order.deliveryBoyVehicle || "UP32 AB 1234 (Bike)",
      phone: order.deliveryBoyPhone || "+91 91234 56789",
      eta: `${order.etaMins || 12} mins`,
      orderId: `#${order.id}`,
      x: 46,
      y: 48
    },
    {
      id: "dest-customer",
      title: "Satyam Kumar (Home)",
      subtitle: order.address?.street || "Vipul Khand, Gomti Nagar",
      type: "customer",
      x: 74,
      y: 68
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Live Order:</span>
          <span className="text-sm font-black text-slate-900 font-mono">#{order.id}</span>
          <Badge status={order.status} />
        </div>
      </div>

      {/* Hero ETA Live Tracking Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Delivery Partner is on the way</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
              {order.deliveryBoyName?.split(' ')[0] || "Rahul"} is {order.distanceKm || 1.8} km away
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>Estimated arrival: <strong>{order.etaMins || 12} mins</strong> (Morning Milk Drop)</span>
            </p>
          </div>

          {/* Quick Call & WhatsApp UI Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${order.deliveryBoyPhone || '+919123456789'}`}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition active:scale-95"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call Delivery Boy</span>
            </a>

            <a
              href="https://wa.me/919123456789?text=Hi%20Rahul,%20checking%20on%20my%20DairyFresh%20morning%20milk%20delivery"
              href="https://wa.me/919123456789?text=Hi%20Rahul,%20checking%20on%20my%20Amrita%20Dairy%20morning%20milk%20delivery"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Placeholder + Delivery Partner & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Realistic Vector Map Placeholder */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Live GPS Route Simulation</h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Real-time Route Line Active
            </span>
          </div>

          <MapPlaceholder
            markers={mapMarkers}
            route={true}
            center={{ name: "Sector 5, Gomti Nagar, Lucknow" }}
            zoom={15}
            height="h-96 sm:h-[420px]"
          />

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">PARTNER VEHICLE</span>
                <strong className="text-slate-800 font-bold">{order.deliveryBoyVehicle || "UP32 AB 1234 (Bike)"}</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">DESTINATION</span>
                <strong className="text-slate-800 font-bold line-clamp-1">{order.address?.street || "Gomti Nagar, Lucknow"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Step Timeline & Items Checklist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Timeline Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
              Delivery Milestones
            </h3>
            <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
          </div>

          {/* Delivery Note & Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Package Contents ({order.items?.length} Items)
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items?.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{it.name} ({it.unit})</span>
                  <span className="font-bold text-emerald-700">× {it.quantity}</span>
                </div>
              ))}
            </div>

            {order.deliveryNotes && (
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <strong>Customer Note:</strong> {order.deliveryNotes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;

