import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../components/common/Logo';
import {
  Milk,
  ShoppingBag,
  Bike,
  ShieldCheck,
  ArrowRight,
  Phone,
  Lock,
  Sparkles
} from 'lucide-react';

export const CustomerAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === '/register';

  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [password, setPassword] = useState('demo1234');

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Logo and Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-serif tracking-tight">
            {isRegister ? 'Create Customer Account' : `Welcome to ${brand.name}`}
          </h2>
          <p className="text-xs text-slate-500">
            {isRegister
              ? 'Join 800+ Lucknow families enjoying pure morning dairy'
              : 'Sign in to manage doorstep deliveries and subscriptions'}
          </p>
        </div>

        {/* 1-Click Fast Prototype Login Options */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/70 space-y-2">
          <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
            ⚡ Fast Demo Access (No Password Needed)
          </span>
          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-800 text-xs font-bold hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                Continue as Customer (Satyam Kumar)
              </span>
              <ArrowRight className="w-3 h-3 text-emerald-700" />
            </button>

            <button
              onClick={() => navigate('/delivery/dashboard')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-800 text-xs font-bold hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Bike className="w-3.5 h-3.5 text-emerald-700" />
                Continue as Delivery Boy (Rahul Verma)
              </span>
              <ArrowRight className="w-3 h-3 text-emerald-700" />
            </button>

            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-emerald-300 text-slate-800 text-xs font-bold hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Continue as Hub Admin (Operations)
              </span>
              <ArrowRight className="w-3 h-3 text-emerald-700" />
            </button>
          </div>
        </div>

        {/* Regular Mock Login Form */}
        <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
          <Input
            label="Mobile Number"
            id="mobile"
            type="tel"
            icon={Phone}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="10-digit mobile number"
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-sm font-bold shadow-md shadow-emerald-700/20"
          >
            {isRegister ? 'Register & Continue' : 'Sign In as Customer'}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New customer in Lucknow?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAuthPage;

