import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  MapPin,
  Clock,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Plus,
  ArrowRight
} from 'lucide-react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, cartSubtotal, deliveryCharge, finalTotal, clearCart } = useCart();
  const { currentCustomer, placeOrder } = useAppData();

  const [selectedAddressId, setSelectedAddressId] = useState(
    currentCustomer.addresses[0]?.id || 'addr-1'
  );
  const [selectedSlot, setSelectedSlot] = useState(brand.deliverySlots[0].label);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Cash on Delivery, Online Payment
  const [notes, setNotes] = useState('Please leave the milk bag in the crate outside door.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to shop
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const selectedAddress =
    currentCustomer.addresses.find((a) => a.id === selectedAddressId) ||
    currentCustomer.addresses[0];

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = placeOrder({
        address: selectedAddress,
        items: items.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          unit: i.product.unit,
          price: i.product.price,
          quantity: i.quantity,
          total: i.product.price * i.quantity,
          image: i.product.image
        })),
        subtotal: cartSubtotal,
        deliveryFee: deliveryCharge,
        total: finalTotal,
        paymentMethod: paymentMethod === 'UPI' ? 'UPI (Google Pay / PhonePe)' : paymentMethod,
        deliverySlot: selectedSlot,
        notes: notes
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
          Checkout & Dispatch Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Confirm your morning delivery address and preferred settlement mode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Columns: Form Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Address Section */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Delivery Address
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Customer: {currentCustomer.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCustomer.addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          {addr.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                        {addr.houseNo}, {addr.street}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      {addr.landmark && (
                        <p className="text-[10px] text-slate-400 mt-1">Landmark: {addr.landmark}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Morning Delivery Slot */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Preferred Delivery Slot
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {brand.deliverySlots.map((slot) => {
                const isSelected = selectedSlot === slot.label;
                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`p-3.5 rounded-xl border-2 transition cursor-pointer text-center ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <Clock className={`w-4 h-4 mx-auto mb-1.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs block leading-snug">{slot.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Payment Method Selection (Fake Demo Options) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Payment Method (UI Demo)
                </h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Mock Payment Only
              </span>
            </div>

            <div className="space-y-3">
              {/* UPI */}
              <label
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'UPI'
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </h5>
                    <p className="text-[11px] text-slate-500">Fast 1-click contactless checkout</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'UPI' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'UPI' && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Cash on Delivery (COD)
                    </h5>
                    <p className="text-[11px] text-slate-500">Pay cash or scan QR at morning doorstep delivery</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'Cash on Delivery' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'Cash on Delivery' && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                </div>
              </label>

              {/* Online NetBanking / Card */}
              <label
                onClick={() => setPaymentMethod('Online Payment')}
                className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'Online Payment'
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Credit / Debit Card & NetBanking
                    </h5>
                    <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, NetBanking</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'Online Payment' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'Online Payment' && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                </div>
              </label>
            </div>
          </div>

          {/* 4. Delivery Notes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Delivery Notes / Instructions for Partner
            </h4>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ring bell twice, leave in cooler box outside gate..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
            Order Review ({items.length} items)
          </h3>

          {/* Mini Items List */}
          <div className="max-h-56 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <span className="font-semibold text-slate-900 block line-clamp-1">{product.name}</span>
                    <span className="text-slate-400">{product.unit} × {quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-800">
                  {brand.currency}{product.price * quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">{brand.currency}{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Morning Delivery</span>
              <span className="font-semibold text-emerald-700">
                {deliveryCharge === 0 ? "FREE" : `${brand.currency}${deliveryCharge}`}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Total Payable</span>
              <span className="text-2xl font-black text-slate-900">
                {brand.currency}{finalTotal}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <Button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            size="lg"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full text-base font-bold shadow-md shadow-emerald-700/20"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>

          <p className="text-[11px] text-center text-slate-400">
            By placing this order, you agree to {brand.name} fresh milk morning delivery terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

