import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../components/common/Logo';
import { Bike, Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const DeliveryLoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('9123456789');
  const [password, setPassword] = useState('rider123');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/delivery/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-semibold mx-auto">
            <Bike className="w-3.5 h-3.5" />
            <span>Fleet Partner</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-serif">
            Delivery Partner Login
          </h2>
          <p className="text-xs text-slate-500">
            {brand.name} Fleet Management Portal • Lucknow Zone
          </p>
        </div>

        {/* Demo Fast Login Pill */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            Demo Driver Credentials
          </span>
          <p className="text-xs text-slate-700">
            Executive: <strong>Rahul Verma (Bike - UP32 AB 1234)</strong>
          </p>
          <Button
            onClick={() => navigate('/delivery/dashboard')}
            variant="primary"
            size="sm"
            className="w-full text-xs font-bold"
          >
            1-Click Demo Login as Rahul
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Mobile Number"
            type="tel"
            icon={Phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Input
            label="Security Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="dark"
            size="lg"
            className="w-full text-sm font-bold shadow-md"
          >
            Sign In to Fleet
          </Button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-500 hover:text-emerald-700 font-semibold"
          >
            ← Return to Customer Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLoginPage;

