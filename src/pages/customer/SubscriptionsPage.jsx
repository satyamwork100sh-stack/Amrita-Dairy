import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { subscriptionFrequencies } from '../../data/subscriptions';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import EmptyState from '../../components/common/EmptyState';
import {
  Calendar,
  Clock,
  Play,
  Pause,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Milk,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SubscriptionsPage = () => {
  const {
    subscriptions,
    toggleSubscriptionStatus,
    cancelSubscription,
    addSubscription,
    products,
    currentCustomer
  } = useAppData();

  const [newSubModalOpen, setNewSubModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || 'prod-1');
  const [selectedFreq, setSelectedFreq] = useState('Daily');
  const [quantity, setQuantity] = useState(2);

  // Filter subscriptions belonging to current customer
  const customerSubs = subscriptions.filter(
    (s) => s.customerId === currentCustomer.id || s.customerId === 'cust-1'
  );

  const handleAddNew = (e) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProduct) || products[0];

    addSubscription({
      productId: prod.id,
      productName: prod.name,
      unit: prod.unit,
      quantity: Number(quantity),
      pricePerDay: prod.price * Number(quantity),
      frequency: selectedFreq,
      frequencyId: selectedFreq.toLowerCase(),
      preferredSlot: "Early Morning (5:30 AM - 7:30 AM)",
      image: prod.image
    });

    setNewSubModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            Milk & Dairy Subscriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Automated morning doorstep deliveries with flexible pause and resume controls.
          </p>
        </div>

        <Button
          onClick={() => setNewSubModalOpen(true)}
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add New Subscription
        </Button>
      </div>

      {/* Subscriptions List */}
      {customerSubs.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Active Subscriptions"
          description="Start a daily or alternate day milk subscription to enjoy automated 7:00 AM delivery and save up to 15%."
          actionLabel="Start Daily Subscription"
          onAction={() => setNewSubModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerSubs.map((sub) => {
            const isActive = sub.status === 'Active';

            return (
              <div
                key={sub.id}
                className={`bg-white rounded-3xl border-2 p-5 sm:p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between ${
                  isActive
                    ? 'border-emerald-500/80 ring-1 ring-emerald-500/10'
                    : 'border-slate-200 bg-slate-50/40 opacity-80'
                }`}
              >
                <div>
                  {/* Top Header: ID & Status Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {sub.id}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {sub.frequency}
                      </span>
                    </div>
                    <Badge status={sub.status} />
                  </div>

                  {/* Main Product Info */}
                  <div className="py-4 flex items-center gap-4">
                    <img
                      src={sub.image}
                      alt={sub.productName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {sub.productName}
                      </h4>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5">
                        Quantity: <strong className="text-emerald-700 font-black">{sub.quantity} {sub.quantity === 1 ? 'Unit' : 'Units'} ({sub.unit})</strong>
                      </p>
                      <p className="text-xs text-slate-900 font-bold mt-1">
                        {brand.currency}{sub.pricePerDay}/day
                      </p>
                    </div>
                  </div>

                  {/* Schedule & Slot Info */}
                  <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1.5 text-slate-600 border border-slate-100">
                    <div className="flex justify-between">
                      <span>Next Expected Drop:</span>
                      <strong className="text-slate-900 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {sub.nextDelivery}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivered Till Date:</span>
                      <strong className="text-slate-900">{sub.deliveredCount} morning drops</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Mandate:</span>
                      <strong className="text-slate-700">{sub.paymentMethod}</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Pause / Resume, Edit, Cancel */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleSubscriptionStatus(sub.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Pause Subscription
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Resume Subscription
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                      title="Cancel Subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Subscription Modal */}
      <Modal
        isOpen={newSubModalOpen}
        onClose={() => setNewSubModalOpen(false)}
        title="Schedule Daily Milk Delivery"
        subtitle="Fresh from Lucknow dairy paddocks to your doorstep every morning"
      >
        <form onSubmit={handleAddNew} className="space-y-4 text-sm">
          <Select
            label="Choose Dairy Product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            options={products.map((p) => ({
              value: p.id,
              label: `${p.name} (${brand.currency}${p.price} / ${p.unit})`
            }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Frequency"
              value={selectedFreq}
              onChange={(e) => setSelectedFreq(e.target.value)}
              options={subscriptionFrequencies.map((f) => ({
                value: f.name,
                label: `${f.name} (-${f.discountPercent}%)`
              }))}
            />
            <Input
              label="Quantity per Drop"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-1.5 text-emerald-950">
            <span className="font-bold block text-sm">Morning Routine Guarantee</span>
            <p className="text-emerald-800 leading-relaxed">
              Bottles sanitized and sealed in thermal packs. Placed in doorstep crate before 7:00 AM.
            </p>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="outline" onClick={() => setNewSubModalOpen(false)} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Start Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SubscriptionsPage;

