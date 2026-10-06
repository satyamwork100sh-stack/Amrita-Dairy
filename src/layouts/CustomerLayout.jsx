import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CustomerNavbar from '../components/layout/CustomerNavbar';
import CustomerFooter from '../components/layout/CustomerFooter';
import CustomerBottomNav from '../components/layout/CustomerBottomNav';
import DemoSwitcher from '../components/common/DemoSwitcher';

export const CustomerLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <DemoSwitcher />
      <CustomerNavbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <CustomerFooter />
      <CustomerBottomNav />
    </div>
  );
};

export default CustomerLayout;

