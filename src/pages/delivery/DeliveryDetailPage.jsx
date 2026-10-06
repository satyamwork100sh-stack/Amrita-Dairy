import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import {
  ArrowLeft,
  Phone,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Banknote,
  Bike
} from 'lucide-react';

export const DeliveryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAppData();

  const order = orders.find((o) => o.id === id) || orders[0];
  const isDelivered = order.status === 'Delivered';

  const mapMarkers = [
    {
      id: "driver-1",
      title: "My Current Location",
      type: "driver",
      x: 35,
      y: 40
    },
    {
      id: "cust-dest",
      title: order.customerName,
      subtitle: order.address?.street,
      type: "customer",
      x: 65,
      y: 65
    }
  ];

  const handleMarkDelivered = () => {
    updateOrderStatus(order.id, 'Delivered');
    navigate('/delivery/orders');
  };

  const handleStartDelivery = () => {
    updateOrderStatus(order.id, 'Out for Delivery');
    navigate(`/delivery/active-delivery?orderId=${order.id}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/delivery/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Deliveries</span>
        </Link>
        <Badge status={order.status} size="md" />
      </div>

      {/* Customer Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Delivery Task #{order.id}
            </span>
            <h2 className="text-xl font-black text-slate-900">{order.customerName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{order.customerPhone}</p>
          </div>

          <a
            href={`tel:${order.customerPhone}`}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xs transition active:scale-95"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2.5 text-xs text-slate-700">
          <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block font-bold">Delivery Address:</strong>
            <span>
              {order.address?.houseNo}, {order.address?.street}, {order.address?.city} - {order.address?.pincode}
            </span>
          </div>
        </div>

        {/* Notes */}
        {order.deliveryNotes && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Customer Note:</strong> {order.deliveryNotes}
          </div>
        )}
      </div>

      {/* Map Preview Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-200 p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Destination Route Preview
          </span>
          <span className="text-[11px] font-bold text-emerald-700">1.8 km (12 min)</span>
        </div>
        <MapPlaceholder
          markers={mapMarkers}
          route={true}
          center={{ name: order.address?.street || "Gomti Nagar" }}
          height="h-56 sm:h-64"
        />
      </div>

      {/* Items Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Items Checklist ({order.items?.length})
        </h4>
        <div className="divide-y divide-slate-100 text-xs">
          {order.items?.map((it, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={it.image} alt={it.name} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <span className="font-bold text-slate-900 block">{it.name}</span>
                  <span className="text-slate-400">{it.unit}</span>
                </div>
              </div>
              <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                × {it.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block">Payment Mode</span>
            <strong className="text-slate-900 font-bold">{order.paymentMethod}</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Total to Collect</span>
            <span className="text-lg font-black text-emerald-700">
              {brand.currency}{order.total}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Large, thumb-friendly touch targets) */}
      <div className="space-y-2.5 pt-2">
        {!isDelivered && (
          <Button
            onClick={handleMarkDelivered}
            variant="primary"
            size="lg"
            icon={CheckCircle2}
            className="w-full text-base font-bold py-4 shadow-lg shadow-emerald-700/20"
          >
            MARK DELIVERED
          </Button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link
            to={`/delivery/active-delivery?orderId=${order.id}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Open Navigation</span>
          </Link>

          <button
            onClick={() => alert("Issue reported to Gomti Nagar Dairy Dispatch Desk.")}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailPage;

