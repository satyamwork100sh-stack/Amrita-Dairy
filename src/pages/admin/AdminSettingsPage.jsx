import React, { useState } from 'react';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useToast } from '../../context/ToastContext';
import {
  Building2,
  Truck,
  CreditCard,
  Bell,
  UserCheck,
  Save,
  CheckCircle2
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('business'); // business, delivery, payment, notification, account

  // Form states with realistic Indian Dairy defaults
  const [brandName, setBrandName] = useState(brand.name);
  const [tagline, setTagline] = useState(brand.tagline);
  const [phone, setPhone] = useState(brand.phone);
  const [email, setEmail] = useState(brand.email);
  const [address, setAddress] = useState(brand.address);

  const [deliveryRadius, setDeliveryRadius] = useState(15);
  const [freeThreshold, setFreeThreshold] = useState(brand.freeDeliveryThreshold);
  const [morningSlotCutoff, setMorningSlotCutoff] = useState('22:00');

  const handleSave = (e) => {
    e.preventDefault();
    showToast("System settings saved successfully!", "success");
  };

  const navTabs = [
    { id: 'business', label: 'Business Profile', icon: Building2 },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
    { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
    { id: 'notification', label: 'Notification Rules', icon: Bell },
    { id: 'account', label: 'Admin Security', icon: UserCheck }
  ];

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
          System & Operations Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure central business identity, delivery zones, order cutoffs, and notification gateways.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
        {navTabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'business' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Business & Brand Identity</h3>
                <p className="text-xs text-slate-500">Visible on invoices, receipts, and customer headers</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                />
                <Input
                  label="Brand Tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Support Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Official Support Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Central Dairy Hub Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Delivery Zones & Timing Limits</h3>
                <p className="text-xs text-slate-500">Configure logistics constraints and free delivery qualification</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Max Delivery Radius (km)"
                  type="number"
                  value={deliveryRadius}
                  onChange={(e) => setDeliveryRadius(e.target.value)}
                />
                <Input
                  label="Free Delivery Min Spend (₹)"
                  type="number"
                  value={freeThreshold}
                  onChange={(e) => setFreeThreshold(e.target.value)}
                />
                <Input
                  label="Order Cut-Off Time (Night)"
                  type="time"
                  value={morningSlotCutoff}
                  onChange={(e) => setMorningSlotCutoff(e.target.value)}
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
                <span className="font-bold block text-slate-900">Configured Time Windows:</span>
                <p>• Morning Window: <strong>5:30 AM – 7:30 AM</strong> (Dedicated milk bottles drop)</p>
                <p>• Evening Window: <strong>5:30 PM – 7:30 PM</strong> (Groceries & pantry dairy)</p>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Settlement & Gateway Configuration</h3>
                <p className="text-xs text-slate-500">Payment switch controls for the storefront (Mock UI)</p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Accept Cash on Delivery (COD)</span>
                    <span className="text-slate-500">Allow customers to pay physical cash at door</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">UPI Instant Autopay (QR Code)</span>
                    <span className="text-slate-500">Google Pay, PhonePe, and Paytm recurring mandates</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Debit / Credit Card Processing</span>
                    <span className="text-slate-500">Visa, Mastercard, RuPay cards</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notification' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Automated Customer Messaging</h3>
                <p className="text-xs text-slate-500">Trigger alerts on order milestones and milk delivery drop</p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Instant WhatsApp "Milk Dropped" Notification</span>
                    <span className="text-slate-500">Sends photo or doorbell ping when driver marks delivered</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Evening 8:00 PM Order Reminder</span>
                    <span className="text-slate-500">Reminds customers to place orders before 10 PM cutoff</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Hub Operations Security</h3>
                <p className="text-xs text-slate-500">Manage superuser access and system logs</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Admin Account:</span>
                  <strong className="text-slate-900">admin@dairyfresh.com</strong>
                  <strong className="text-slate-900">admin@amritadairy.com</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Access Level:</span>
                  <strong className="text-emerald-700">Hub Master Operator</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Session Mode:</span>
                  <strong className="text-slate-700">Prototype Demo (No Backend Required)</strong>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button type="submit" variant="primary" size="md" icon={Save}>
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

