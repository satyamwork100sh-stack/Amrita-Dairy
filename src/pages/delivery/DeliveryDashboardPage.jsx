import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import StatCard from '../../components/common/StatCard';
import DeliveryOrderCard from '../../components/delivery/DeliveryOrderCard';
import Button from '../../components/common/Button';
import {
  Package,
  CheckCircle2,
  Clock,
  Banknote,
  Navigation,
  ArrowRight,
  Sparkles,
  Phone,
  Power
} from 'lucide-react';

export const DeliveryDashboardPage = () => {
  const navigate = useNavigate();
  const { currentDeliveryBoy, orders, toggleDeliveryBoyOnline } = useAppData();

  const isOnline = currentDeliveryBoy.status === 'Online' || currentDeliveryBoy.status === 'Busy';

  // Orders assigned to Rahul (db-1) or active
  const todayOrders = orders.filter(
    (o) => o.deliveryBoyId === 'db-1' || o.deliveryBoyId === currentDeliveryBoy.id
  );

  const pendingOrders = todayOrders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const completedOrders = todayOrders.filter((o) => o.status === 'Delivered');

  return (
    <div className="space-y-6">
      {/* 1. Header Greeting & Online Switcher */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
            Morning Dispatch Shift
          </span>
          <h1 className="text-xl sm:text-2xl font-black mt-0.5">
            Good Morning, {currentDeliveryBoy.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zone: <strong className="text-slate-200">{currentDeliveryBoy.currentZone}</strong> • {currentDeliveryBoy.vehicleNumber}
          </p>
        </div>

        <button
          onClick={() => toggleDeliveryBoyOnline(currentDeliveryBoy.id)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs transition shadow-sm cursor-pointer ${
            isOnline
              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>Status: {isOnline ? 'ONLINE & ACTIVE' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* 2. Today's Key Metrics Grid (Thumb friendly) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Today</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">18</p>
          <span className="text-[10px] text-slate-500 font-medium">Drops assigned</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1">12</p>
          <span className="text-[10px] text-slate-500 font-medium">Delivered to door</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 mt-1">6</p>
          <span className="text-[10px] text-slate-500 font-medium">In morning route</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">COD Cash</span>
            <Banknote className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">{brand.currency}4,850</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Collected</span>
        </div>
      </div>

      {/* 3. Active Delivery Spotlight (High impact visual callout) */}
      {currentDeliveryBoy.currentOrder && (
        <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                ACTIVE ON-DUTY DELIVERY
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-200">
              #{currentDeliveryBoy.currentOrder.orderId}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">{currentDeliveryBoy.currentOrder.customerName}</h3>
              <p className="text-xs text-emerald-100 mt-0.5">{currentDeliveryBoy.currentOrder.customerAddress}</p>
              <p className="text-xs text-emerald-300 mt-1">
                Distance: <strong>{currentDeliveryBoy.currentOrder.distanceKm} km</strong> • ETA: <strong>{currentDeliveryBoy.currentOrder.etaMins} mins</strong>
              </p>
            </div>

            <Button
              onClick={() => navigate('/delivery/active-delivery')}
              variant="primary"
              size="md"
              icon={Navigation}
              className="bg-white text-slate-950 hover:bg-emerald-100 border-none font-black text-xs shadow-md"
            >
              Open GPS Navigation
            </Button>
          </div>
        </div>
      )}

      {/* 4. Today's Assigned Delivery Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">
            Assigned Deliveries ({pendingOrders.length} Pending)
          </h3>
          <Link
            to="/delivery/orders"
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            View All ({todayOrders.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayOrders.slice(0, 4).map((order) => (
            <DeliveryOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardPage;

