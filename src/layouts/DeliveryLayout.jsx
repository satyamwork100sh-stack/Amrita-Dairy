import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DeliveryNavbar from '../components/layout/DeliveryNavbar';
import DeliveryBottomNav from '../components/layout/DeliveryBottomNav';
import DemoSwitcher from '../components/common/DemoSwitcher';

export const DeliveryLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 pb-20">
      <DemoSwitcher />
      <DeliveryNavbar />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
      <DeliveryBottomNav />
    </div>
  );
};

export default DeliveryLayout;

