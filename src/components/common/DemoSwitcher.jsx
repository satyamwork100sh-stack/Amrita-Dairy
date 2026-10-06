import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Bike, ShieldCheck, RefreshCw, ChevronDown, Sparkles, Layers } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DemoSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isCustomer = !location.pathname.startsWith('/delivery') && !location.pathname.startsWith('/admin');
  const isDelivery = location.pathname.startsWith('/delivery');
  const isAdmin = location.pathname.startsWith('/admin');

  const handleResetData = () => {
    localStorage.removeItem('amritadairy_orders');
    localStorage.removeItem('amritadairy_products');
    localStorage.removeItem('amritadairy_subscriptions');
    localStorage.removeItem('amritadairy_cart');
    localStorage.removeItem('amritadairy_delivery_boys');
    localStorage.removeItem('dairyfresh_orders');
    localStorage.removeItem('dairyfresh_products');
    localStorage.removeItem('dairyfresh_subscriptions');
    localStorage.removeItem('dairyfresh_cart');
    localStorage.removeItem('dairyfresh_delivery_boys');
    showToast("Demo data reset to factory state. Reloading...", "info");
    showToast('Demo data reset to factory default!', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-3 right-3 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg hover:bg-slate-800 transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
        title="Open Role Switcher"
      >
        <Layers className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-semibold">Demo Views</span>
      </button>
    );
  }

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-3 sm:right-4 z-50 bg-slate-950/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 sm:gap-3 text-xs">
      <div className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wide pr-1 border-r border-slate-800">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span className="hidden md:inline text-[11px] uppercase tracking-wider text-slate-300">Prototype Views:</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition cursor-pointer ${
            isCustomer
              ? 'bg-emerald-600 text-white shadow-xs font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Customer Website"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Customer</span>
        </button>

        <button
          onClick={() => navigate('/delivery/dashboard')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition cursor-pointer ${
            isDelivery
              ? 'bg-emerald-600 text-white shadow-xs font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Delivery Boy Mobile App"
        >
          <Bike className="w-3.5 h-3.5" />
          <span>Delivery Boy</span>
        </button>

        <button
          onClick={() => navigate('/admin/dashboard')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition cursor-pointer ${
            isAdmin
              ? 'bg-emerald-600 text-white shadow-xs font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Admin Dashboard"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>

      <div className="flex items-center gap-1 border-l border-slate-800 pl-1">
        <button
          onClick={handleResetData}
          className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
          title="Reset Prototype Data"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
          title="Minimize bar"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default DemoSwitcher;

