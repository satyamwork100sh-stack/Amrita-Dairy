import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import Button from '../../components/common/Button';
import {
  Phone,
  Navigation,
  CheckCircle2,
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  Volume2,
  ChevronUp
} from 'lucide-react';

export const ActiveDeliveryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAppData();

  const orderId = searchParams.get('orderId') || 'DF10248';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Dynamic simulated location movement
  const [driverPos, setDriverPos] = useState({ x: 38, y: 44 });
  const [remainingEta, setRemainingEta] = useState(12);

  useEffect(() => {
    // Gentle simulation of scooter moving closer to customer marker (74, 68)
    const interval = setInterval(() => {
      setDriverPos((prev) => {
        const nextX = Math.min(prev.x + 0.5, 70);
        const nextY = Math.min(prev.y + 0.4, 64);
        return { x: nextX, y: nextY };
      });
      setRemainingEta((prev) => Math.max(2, prev - 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const mapMarkers = [
    {
      id: "rider-me",
      title: "My Bike (UP32 AB 1234)",
      subtitle: `${remainingEta} min to drop`,
      type: "driver",
      x: driverPos.x,
      y: driverPos.y
    },
    {
      id: "dest-satyam",
      title: order.customerName,
      subtitle: order.address?.street,
      type: "customer",
      x: 74,
      y: 68
    }
  ];

  const handleMarkDelivered = () => {
    updateOrderStatus(order.id, 'Delivered');
    navigate('/delivery/dashboard');
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-24">
      {/* Top Turn-by-Turn GPS Simulation HUD Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl flex items-center justify-between gap-4 border border-emerald-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            ↱
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
              IN 200 METERS
            </span>
            <h2 className="text-base sm:text-lg font-black leading-tight">
              Turn right onto Vipul Khand Marg
            </h2>
            <p className="text-xs text-emerald-200 mt-0.5">Then destination will be on the left</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-black block font-mono leading-none">
            {remainingEta}
          </span>
          <span className="text-[10px] uppercase font-bold text-emerald-300">MINS ETA</span>
        </div>
      </div>

      {/* Fullscreen Map Viewport Area */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-300/80 shadow-lg">
        <MapPlaceholder
          markers={mapMarkers}
          route={true}
          center={{ name: "Vipul Khand, Gomti Nagar" }}
          height="h-[380px] sm:h-[450px]"
        />

        {/* Floating Speed & Distance Gauge */}
        <div className="absolute top-3 left-3 z-20 bg-slate-950/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 text-xs">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Speed</span>
            <span className="font-mono font-bold text-emerald-400">28 km/h</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Distance</span>
            <span className="font-mono font-bold text-white">1.8 km</span>
          </div>
        </div>
      </div>

      {/* Customer Quick Glance Drawer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-lg space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Current Drop • #{order.id}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">{order.customerName}</h3>
            <p className="text-xs text-slate-600 font-medium flex items-start gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{order.address?.houseNo}, {order.address?.street}, {order.address?.city}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Collection</span>
            <span className="text-lg font-black text-slate-900 font-mono">
              {brand.currency}{order.total}
            </span>
            <span className="text-[10px] block font-bold text-emerald-700">{order.paymentMethod}</span>
          </div>
        </div>

        {order.deliveryNotes && (
          <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/70">
            <strong>Customer Note:</strong> {order.deliveryNotes}
          </p>
        )}

        {/* Large One-Handed Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <a
            href={`tel:${order.customerPhone}`}
            className="flex flex-col items-center justify-center py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs transition active:scale-95 border border-slate-200"
          >
            <Phone className="w-5 h-5 text-emerald-700 mb-1" />
            <span>CALL</span>
          </a>

          <button
            onClick={() => alert("Re-centering turn-by-turn route to destination...")}
            className="flex flex-col items-center justify-center py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs transition active:scale-95 border border-slate-200"
          >
            <Navigation className="w-5 h-5 text-sky-700 mb-1" />
            <span>RE-ROUTE</span>
          </button>

          <button
            onClick={handleMarkDelivered}
            className="flex flex-col items-center justify-center py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-md shadow-emerald-700/20 active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5 mb-1" />
            <span>DELIVER</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveDeliveryPage;

