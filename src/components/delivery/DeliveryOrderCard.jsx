import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Navigation, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import { brand } from '../../config/brand';
import { useAppData } from '../../context/AppDataContext';

export const DeliveryOrderCard = ({ order }) => {
  const navigate = useNavigate();
  const { updateOrderStatus } = useAppData();

  const isDelivered = order.status === 'Delivered';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden hover:shadow-md transition">
      {/* Header with Order ID & Status */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Delivery Task</span>
          <h4 className="text-base font-black text-slate-900 font-mono">#{order.id}</h4>
        </div>
        <Badge status={order.status} size="sm" />
      </div>

      {/* Customer & Address Details */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-900 text-sm">{order.customerName}</h5>
            <span className="text-xs font-mono font-bold text-emerald-700">
              {brand.currency}{order.total} • {order.paymentMethod === 'Cash on Delivery' ? 'COD' : 'Paid'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              {order.address?.houseNo}, {order.address?.street}, {order.address?.city}
            </span>
          </p>
        </div>

        {/* Products checklist snippet */}
        <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-700 flex flex-wrap gap-x-3 gap-y-1">
          {order.items.map((it, idx) => (
            <span key={idx} className="font-medium">
              {it.name} <strong className="text-slate-900 font-bold">× {it.quantity}</strong>
            </span>
          ))}
        </div>

        {order.deliveryNotes && (
          <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg px-2.5 py-1.5 border border-amber-100">
            Note: {order.deliveryNotes}
          </p>
        )}
      </div>

      {/* Action Buttons (Thumb friendly) */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 grid grid-cols-3 gap-2">
        <a
          href={`tel:${order.customerPhone}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Call</span>
        </a>

        <Link
          to={`/delivery/active-delivery?orderId=${order.id}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 text-sky-600" />
          <span>Navigate</span>
        </Link>

        {isDelivered ? (
          <div className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered</span>
          </div>
        ) : (
          <Link
            to={`/delivery/orders/${order.id}`}
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs active:scale-95"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DeliveryOrderCard;

