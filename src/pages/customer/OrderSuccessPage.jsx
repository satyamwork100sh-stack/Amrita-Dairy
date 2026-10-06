import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import {
  CheckCircle2,
  Navigation,
  MapPin,
  Clock,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Bike
} from 'lucide-react';

export const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders } = useAppData();

  const orderId = searchParams.get('orderId') || 'DF10248';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 text-center space-y-6">
        {/* Animated Green Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Booking Confirmed
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif mt-2">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Thank you for ordering with {brand.name}. Your dairy items are being packed at our Lucknow cold hub.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Order Reference</span>
              <h3 className="text-lg font-black text-slate-900 font-mono">#{order.id}</h3>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Expected Delivery Slot</span>
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 sm:justify-end">
                <Clock className="w-3.5 h-3.5" />
                {order.expectedDelivery || "Today, 6:00 PM – 8:00 PM"}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Delivery Address
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                {order.address?.houseNo}, {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </span>
            </p>
          </div>

          {/* Items Summary */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
              Items Ordered ({order.items?.length})
            </span>
            <div className="divide-y divide-slate-200/60">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    {item.name} <strong className="text-slate-500 font-normal">({item.unit})</strong> × {item.quantity}
                  </span>
                  <span className="font-bold text-slate-900">
                    {brand.currency}{item.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Payment */}
          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-xs">
            <span className="text-slate-500 font-medium">
              Payment Method: <strong className="text-slate-800">{order.paymentMethod}</strong>
            </span>
            <div className="text-right">
              <span className="text-sm font-black text-slate-900">
                Total: {brand.currency}{order.total}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => navigate(`/track-order/${order.id}`)}
            size="lg"
            variant="primary"
            icon={Navigation}
            className="w-full sm:w-auto px-8 font-bold shadow-md shadow-emerald-700/20"
          >
            Track Order Live
          </Button>

          <Button
            onClick={() => navigate('/orders')}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8"
          >
            View Order History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

