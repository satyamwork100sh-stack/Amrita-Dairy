import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Navigation, History, User } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const DeliveryBottomNav = () => {
  const { currentDeliveryBoy } = useAppData();

  const navItems = [
    { name: 'Dashboard', path: '/delivery/dashboard', icon: LayoutDashboard },
    { name: 'Deliveries', path: '/delivery/orders', icon: Package },
    {
      name: 'Active GPS',
      path: '/delivery/active-delivery',
      icon: Navigation,
      highlight: Boolean(currentDeliveryBoy.currentOrder)
    },
    { name: 'History', path: '/delivery/history', icon: History },
    { name: 'Profile', path: '/delivery/profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-2 px-3 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition relative ${
                  isActive
                    ? 'text-emerald-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.highlight ? 'text-emerald-400 animate-bounce' : ''}`} />
                {item.highlight && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <span className="text-[11px] mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryBottomNav;

