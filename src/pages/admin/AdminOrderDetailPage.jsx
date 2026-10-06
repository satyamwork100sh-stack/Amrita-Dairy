import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import OrderTimeline from '../../components/customer/OrderTimeline';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Bike,
  CreditCard,
  Clock,
  User,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, deliveryBoys, updateOrderStatus, assignDeliveryBoy } = useAppData();

  const order = orders.find((o) => o.id === id) || orders[0];

  const [statusVal, setStatusVal] = useState(order.status);
  const [boyVal, setBoyVal] = useState(order.deliveryBoyId || 'db-1');

  const handleStatusChange = (e) => {
    setStatusVal(e.target.value);
    updateOrderStatus(order.id, e.target.value);
  };

  const handleBoyChange = (e) => {
    setBoyVal(e.target.value);
    assignDeliveryBoy(order.id, e.target.value);
  };

  const mapMarkers = [
    {
      id: "hub",
      title: "Gomti Nagar Hub",
      type: "hub",
      x: 25,
      y: 35
    },
    {
      id: "driver",
      title: order.deliveryBoyName || "Rahul Verma",
      type: "driver",
      x: 45,
      y: 48
    },
    {
      id: "cust",
      title: order.customerName,
      subtitle: order.address?.street,
      type: "customer",
      x: 70,
      y: 65
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                Order #{order.id}
              </h1>
              <Badge status={order.status} />
            </div>
            <p className="text-xs text-slate-500">Placed on {order.orderDate}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Select
            value={statusVal}
            onChange={handleStatusChange}
            options={[
              { value: 'Pending', label: 'Status: Pending' },
              { value: 'Confirmed', label: 'Status: Confirmed' },
              { value: 'Preparing', label: 'Status: Preparing' },
              { value: 'Assigned', label: 'Status: Assigned' },
              { value: 'Out for Delivery', label: 'Status: Out for Delivery' },
              { value: 'Delivered', label: 'Status: Delivered' },
              { value: 'Cancelled', label: 'Status: Cancelled' }
            ]}
          />

          <Select
            value={boyVal}
            onChange={handleBoyChange}
            options={deliveryBoys.map(db => ({
              value: db.id,
              label: `Assign: ${db.name} (${db.status})`
            }))}
          />
        </div>
      </div>

      {/* Main Grid: Left Details & Right Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Columns: Customer, Items, Address, Payment */}
        <div className="lg:col-span-6 space-y-6">
          {/* Customer Details */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Customer Information
              </h3>
              <Link
                to={`/admin/customers/${order.customerId || 'cust-1'}`}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View Customer Profile →
              </Link>
            </div>

            <div className="space-y-1 text-xs text-slate-700">
              <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
              <p className="flex items-center gap-1.5 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {order.customerPhone}
              </p>
              <p className="flex items-center gap-1.5 text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {order.customerEmail || 'satyam@example.com'}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> Doorstep Drop Location
            </h3>
            <p className="font-semibold text-slate-800 leading-relaxed">
              {order.address?.houseNo}, {order.address?.street}
            </p>
            <p className="text-slate-500">
              {order.address?.city}, {order.address?.state} - {order.address?.pincode}
            </p>
            {order.deliveryNotes && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <strong>Customer Delivery Note:</strong> {order.deliveryNotes}
              </div>
            )}
          </div>

          {/* Items & Payment */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
              Order Items ({order.items?.length})
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items?.map((it, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <strong className="text-slate-900 font-bold block">{it.name}</strong>
                      <span className="text-slate-400">{it.unit} • {brand.currency}{it.price}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">× {it.quantity}</span>
                    <span className="block font-bold text-slate-900">{brand.currency}{it.total}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600 bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-3xl">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{brand.currency}{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{order.deliveryFee === 0 ? "FREE" : `${brand.currency}${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-emerald-700">{brand.currency}{order.total}</span>
              </div>
              <div className="pt-1 text-[11px] text-slate-500 flex justify-between">
                <span>Mode: {order.paymentMethod}</span>
                <span className="font-bold text-emerald-700">Status: {order.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Route Map, Driver & Milestones */}
        <div className="lg:col-span-6 space-y-6">
          {/* Live Delivery Tracking Map */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Live Dispatch GPS Map
                </h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold">1.8 km to drop</span>
            </div>

            <MapPlaceholder
              markers={mapMarkers}
              route={true}
              height="h-64 sm:h-72"
              center={{ name: order.address?.street || "Gomti Nagar" }}
            />
          </div>

          {/* Assigned Driver Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Driver</span>
                <h4 className="font-bold text-slate-900 text-base">
                  {order.deliveryBoyName || "Unassigned"}
                </h4>
                <p className="text-xs text-slate-500">
                  {order.deliveryBoyVehicle || "No vehicle registered"}
                </p>
              </div>
            </div>

            {order.deliveryBoyId && (
              <Link
                to={`/admin/delivery-boys/${order.deliveryBoyId}`}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Driver Stats
              </Link>
            )}
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
              Fulfillment Timeline
            </h3>
            <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;

