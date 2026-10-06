import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import {
  MapPin,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit2,
  Home,
  Briefcase,
  Users
} from 'lucide-react';

export const AddressesPage = () => {
  const {
    currentCustomer,
    addCustomerAddress,
    deleteCustomerAddress,
    setDefaultAddress
  } = useAppData();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: 'Home',
    houseNo: '',
    street: '',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    landmark: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.houseNo || !formData.street) return;

    addCustomerAddress(formData);
    setModalOpen(false);
    setFormData({
      label: 'Home',
      houseNo: '',
      street: '',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226010',
      landmark: ''
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage doorstep delivery locations for morning milk & grocery drops.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add New Address
        </Button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCustomer.addresses.map((addr) => {
          let Icon = Home;
          if (addr.label.toLowerCase().includes('office')) Icon = Briefcase;
          else if (addr.label.toLowerCase().includes('parents')) Icon = Users;

          return (
            <div
              key={addr.id}
              className={`bg-white rounded-3xl border-2 p-5 sm:p-6 shadow-2xs flex flex-col justify-between transition ${
                addr.isDefault
                  ? 'border-emerald-600 ring-2 ring-emerald-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                    <Icon className="w-3.5 h-3.5 text-emerald-700" />
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 text-sm">{addr.houseNo}</p>
                  <p className="font-medium text-slate-600">{addr.street}</p>
                  <p className="text-slate-500">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  {addr.landmark && (
                    <p className="text-[11px] text-slate-400 pt-1">
                      Landmark: {addr.landmark}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold">Primary Address</span>
                )}

                <div className="flex items-center gap-2">
                  {currentCustomer.addresses.length > 1 && (
                    <button
                      onClick={() => deleteCustomerAddress(addr.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Delivery Address"
        subtitle="Saved address will be available for quick checkout and subscriptions"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-sm">
          <Input
            label="Address Tag / Label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="e.g. Home, Office, Villa"
            required
          />

          <Input
            label="House / Flat / Villa No."
            value={formData.houseNo}
            onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
            placeholder="e.g. House No. 21, Sector 5"
            required
          />

          <Input
            label="Street / Sector / Area"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="e.g. Vipul Khand, Gomti Nagar"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              required
            />
          </div>

          <Input
            label="Nearest Landmark (Optional)"
            value={formData.landmark}
            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
            placeholder="e.g. Near CMS School"
          />

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="outline" onClick={() => setModalOpen(false)} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressesPage;

