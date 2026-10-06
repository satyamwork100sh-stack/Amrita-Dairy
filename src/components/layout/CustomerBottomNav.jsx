import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Calendar, PackageCheck, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CustomerBottomNav = () => {
  const { cartCount } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'Subscribe', path: '/subscriptions', icon: Calendar },
    { name: 'Orders', path: '/orders', icon: PackageCheck },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition relative ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.name === 'Shop' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerBottomNav;

