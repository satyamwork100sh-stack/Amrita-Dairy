import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import { Bike, Power, Bell, Phone, ShieldCheck, ChevronRight } from 'lucide-react';

export const DeliveryNavbar = () => {
  const { currentDeliveryBoy, toggleDeliveryBoyOnline } = useAppData();
  const navigate = useNavigate();

  const isOnline = currentDeliveryBoy.status === 'Online' || currentDeliveryBoy.status === 'Busy';

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Left: Driver profile badge */}
        <Link to="/delivery/profile" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={currentDeliveryBoy.avatar}
              alt={currentDeliveryBoy.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/50"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
                {currentDeliveryBoy.name}
              </span>
              <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-slate-700">
                {currentDeliveryBoy.employeeId}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {currentDeliveryBoy.vehicleNumber} • {brand.name} Fleet
            </p>
          </div>
        </Link>

        {/* Right: Online / Offline Toggle Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleDeliveryBoyOnline(currentDeliveryBoy.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isOnline
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>

          <Link
            to="/delivery/active-delivery"
            className="p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-slate-700 transition relative"
            title="Active Delivery GPS"
          >
            <Bike className="w-5 h-5" />
            {currentDeliveryBoy.currentOrder && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DeliveryNavbar;

