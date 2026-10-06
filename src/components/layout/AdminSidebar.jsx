import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { brand } from '../../config/brand';
import Logo from '../common/Logo';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Layers,
  Bike,
  Navigation,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Milk,
  X,
  ExternalLink
} from 'lucide-react';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navGroups = [
    {
      title: "Core Operations",
      items: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Orders", path: "/admin/orders", icon: ShoppingCart, badge: "86 Today" },
        { name: "Live Tracking", path: "/admin/live-tracking", icon: Navigation, isLive: true },
        { name: "Subscriptions", path: "/admin/subscriptions", icon: Calendar }
      ]
    },
    {
      title: "Catalogue & Team",
      items: [
        { name: "Products", path: "/admin/products", icon: Package },
        { name: "Categories", path: "/admin/categories", icon: Layers },
        { name: "Delivery Boys", path: "/admin/delivery-boys", icon: Bike, badge: "12 Active" },
        { name: "Customers", path: "/admin/customers", icon: Users }
      ]
    },
    {
      title: "Finance & Insights",
      items: [
        { name: "Payments", path: "/admin/payments", icon: CreditCard },
        { name: "Reports", path: "/admin/reports", icon: BarChart3 },
        { name: "Settings", path: "/admin/settings", icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-4 flex items-center justify-between border-b border-slate-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Logo variant="light" size="sm" showTagline={false} />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h5 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {group.title}
              </h5>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => onClose && onClose()}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/40 font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      {item.isLive && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Hub View & Switcher */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Customer Store
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Front</span>
          </Link>

          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

