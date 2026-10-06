import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import OrderTimeline from '../../components/customer/OrderTimeline';
import Button from '../../components/common/Button';
import {
  ArrowLeft,
  Navigation,
  MapPin,
  Phone,
  Clock,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppData();

  const order = orders.find((o) => o.id === id) || orders[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <Badge status={order.status} size="lg" />
      </div>

      {/* Main Order Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tax Invoice & Receipt
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-0.5">
              Order #{order.id}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Placed on {order.orderDate}</p>
          </div>

          <div className="flex items-center gap-3">
            {(order.status === 'Out for Delivery' || order.status === 'Assigned' || order.status === 'Preparing') && (
              <Button
                onClick={() => navigate(`/track-order/${order.id}`)}
                size="md"
                variant="primary"
                icon={Navigation}
              >
                Track Live Map
              </Button>
            )}
          </div>
        </div>

        {/* Timeline & Delivery Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Left: Timeline */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Dispatch Timeline
            </h3>
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/70">
              <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
            </div>

            {/* Delivery Partner Profile Card if assigned */}
            {order.deliveryBoyName && (
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800">
                      Assigned Delivery Partner
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{order.deliveryBoyName}</h4>
                    <p className="text-[11px] text-slate-500">{order.deliveryBoyVehicle}</p>
                  </div>
                </div>
                {order.deliveryBoyPhone && (
                  <a
                    href={`tel:${order.deliveryBoyPhone}`}
                    className="p-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition shadow-2xs"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right: Items and Address */}
          <div className="lg:col-span-6 space-y-6">
            {/* Delivery Destination */}
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/70">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Delivery Address
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {order.address?.houseNo}, {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </p>
              {order.deliveryNotes && (
                <p className="text-[11px] text-amber-800 bg-amber-50 rounded-lg p-2 mt-2 border border-amber-200/60">
                  Special Note: {order.deliveryNotes}
                </p>
              )}
            </div>

            {/* Items Ordered */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Items In This Order ({order.items?.length})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        <span className="text-slate-400">{item.unit} • {brand.currency}{item.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">× {item.quantity}</span>
                      <span className="block font-bold text-slate-900">{brand.currency}{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Summary */}
              <div className="mt-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span>{brand.currency}{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Morning Delivery Charges</span>
                  <span>{order.deliveryFee === 0 ? "FREE" : `${brand.currency}${order.deliveryFee}`}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-{brand.currency}{order.discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-emerald-700 font-black">{brand.currency}{order.total}</span>
                </div>
                <div className="pt-1 text-[11px] text-slate-400 flex justify-between">
                  <span>Payment Method: {order.paymentMethod}</span>
                  <span className="font-semibold text-emerald-700">Status: {order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

