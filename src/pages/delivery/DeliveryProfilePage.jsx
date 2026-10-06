import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  User,
  Bike,
  Star,
  Award,
  FileText,
  Settings,
  LogOut,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DeliveryProfilePage = () => {
  const navigate = useNavigate();
  const { currentDeliveryBoy } = useAppData();
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="space-y-6 pb-12">
      {/* Driver Header Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative z-10">
          <img
            src={currentDeliveryBoy.avatar}
            alt={currentDeliveryBoy.name}
            className="w-20 h-20 rounded-3xl object-cover ring-4 ring-emerald-500/50 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black">{currentDeliveryBoy.name}</h1>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                {currentDeliveryBoy.employeeId}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Senior Delivery Executive • Lucknow Fleet
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {currentDeliveryBoy.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <strong>{currentDeliveryBoy.rating}</strong> (540 ratings)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Drops</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{currentDeliveryBoy.totalDeliveries}</p>
          <span className="text-[11px] text-slate-500 font-medium">Lifetime trips</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">1,236</p>
          <span className="text-[11px] text-emerald-700 font-semibold">99.1% Success rate</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Failed / Returned</span>
          <p className="text-2xl font-black text-rose-600 mt-1">12</p>
          <span className="text-[11px] text-slate-500 font-medium">Customer unavailable</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Driver Rating</span>
          <p className="text-2xl font-black text-amber-500 mt-1">4.9 ★</p>
          <span className="text-[11px] text-slate-500 font-medium">Top 5% Partner</span>
        </div>
      </div>

      {/* Section Content Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
        {/* Personal & Vehicle Info */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Bike className="w-4 h-4 text-emerald-600" />
            Vehicle & Route Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Registered Vehicle No:</span>
              <strong className="text-slate-900 font-mono text-sm">{currentDeliveryBoy.vehicleNumber}</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Vehicle Make & Type:</span>
              <strong className="text-slate-900 text-sm">{currentDeliveryBoy.vehicleType}</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Assigned Zone:</span>
              <strong className="text-slate-900 text-sm">{currentDeliveryBoy.currentZone}</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Hub Dispatch Base:</span>
              <strong className="text-slate-900 text-sm">Gomti Nagar Cold Storage Central</strong>
            </div>
          </div>
        </div>

        {/* KYC Verification & Documents */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            Verified Fleet Documents
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block">Driving License (Commercial Two-Wheeler)</span>
                <span className="text-slate-400">DL-UP322019004820 • Valid till 2035</span>
              </div>
              <span className="text-emerald-700 bg-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block">Aadhaar National ID Card</span>
                <span className="text-slate-400">•••• •••• 8841</span>
              </div>
              <span className="text-emerald-700 bg-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Logout session */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <Button
            onClick={() => navigate('/delivery/login')}
            variant="danger"
            size="sm"
            icon={LogOut}
          >
            End Shift & Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfilePage;

