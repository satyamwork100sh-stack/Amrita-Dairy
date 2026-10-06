import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  User,
  MapPin,
  PackageCheck,
  Calendar,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  Phone,
  Mail,
  Edit2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentCustomer } = useAppData();

  const [activeTab, setActiveTab] = useState('personal'); // personal, payment, notifications, settings
  const [name, setName] = useState(currentCustomer.name);
  const [phone, setPhone] = useState(currentCustomer.phone);
  const [email, setEmail] = useState(currentCustomer.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Header Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
          <img
            src={currentCustomer.avatar}
            alt={currentCustomer.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-emerald-500/50 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
                {currentCustomer.name}
              </h1>
              <span className="bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {currentCustomer.role}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {currentCustomer.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {currentCustomer.email}
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80 pt-0.5">
              Member since {currentCustomer.joinDate} • {currentCustomer.totalOrders} Delivered Orders
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Menu */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-2xs space-y-1">
          <button
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'personal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <User className="w-4 h-4" /> Personal Information
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <Link
            to="/profile/addresses"
            className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-emerald-600" /> Saved Addresses ({currentCustomer.addresses.length})
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </Link>

          <Link
            to="/orders"
            className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-3">
              <PackageCheck className="w-4 h-4 text-emerald-600" /> Order History
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </Link>

          <Link
            to="/subscriptions"
            className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-600" /> Milk Subscriptions ({currentCustomer.activeSubscriptions})
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </Link>

          <button
            onClick={() => setActiveTab('payment')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" /> Payment Methods
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <Bell className="w-4 h-4" /> Notifications & Alerts
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <Settings className="w-4 h-4" /> Account Settings
            </span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout Account
            </button>
          </div>
        </div>

        {/* Right Tab Content View */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
          {activeTab === 'personal' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Update your primary delivery contact information</p>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  ✓ Profile updated successfully!
                </div>
              )}

              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Saved Payment Methods</h3>
                <p className="text-xs text-slate-500">Manage recurring autopay mandates for milk subscriptions</p>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    UPI
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">satyam@okhdfcbank</span>
                    <span className="text-emerald-700 font-semibold">Autopay Active (Daily 2L Milk)</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Default
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-slate-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">HDFC Bank Debit Card •••• 4012</span>
                    <span className="text-slate-400">Expires 09/28</span>
                  </div>
                </div>
                <button className="text-xs text-slate-500 hover:text-rose-600">Remove</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Notification Preferences</h3>
                <p className="text-xs text-slate-500">Control WhatsApp and SMS delivery alerts</p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Morning Milk Drop WhatsApp Ping</span>
                    <span className="text-slate-500">Get notified when milk is dropped at doorstep</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Monthly Billing Invoice Email</span>
                    <span className="text-slate-500">Receive consolidated monthly subscription receipt</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Account Preferences</h3>
                <p className="text-xs text-slate-500">Configure application and locale settings</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-800">Preferred Language</span>
                  <span className="font-bold text-emerald-700">English (India)</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-800">Primary Hub Region</span>
                  <span className="font-bold text-slate-700">Gomti Nagar, Lucknow</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

