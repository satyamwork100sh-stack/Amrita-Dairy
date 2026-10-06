import React, { useState } from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Select from '../common/Select';
import { brand } from '../../config/brand';
import { useAppData } from '../../context/AppDataContext';
import { Phone, MapPin, Bike, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const OrderDetailModal = ({ order, isOpen, onClose }) => {
  const { updateOrderStatus, assignDeliveryBoy, deliveryBoys } = useAppData();
  const [selectedBoy, setSelectedBoy] = useState(order?.deliveryBoyId || 'db-1');
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'Confirmed');

  if (!order) return null;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    updateOrderStatus(order.id, newStatus);
  };

  const handleAssignBoy = (e) => {
    const boyId = e.target.value;
    setSelectedBoy(boyId);
    assignDeliveryBoy(order.id, boyId);
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Preparing', label: 'Preparing at Hub' },
    { value: 'Assigned', label: 'Assigned to Partner' },
    { value: 'Out for Delivery', label: 'Out for Delivery' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const deliveryBoyOptions = deliveryBoys.map(db => ({
    value: db.id,
    label: `${db.name} (${db.status}) - ${db.vehicleNumber}`
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Details #${order.id}`}
      subtitle={`Placed on ${order.orderDate} • ${order.paymentMethod}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-sm">
        {/* Quick Operations Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <Select
            label="Update Order Status"
            value={order.status}
            onChange={handleStatusChange}
            options={statusOptions}
          />
          <Select
            label="Assign Delivery Executive"
            value={order.deliveryBoyId || selectedBoy}
            onChange={handleAssignBoy}
            options={deliveryBoyOptions}
          />
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Customer Info</h5>
            <p className="font-bold text-slate-900">{order.customerName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{order.customerPhone}</p>
            <p className="text-xs text-slate-500">{order.customerEmail}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Delivery Destination</h5>
            <p className="text-xs text-slate-700 leading-relaxed">
              {order.address?.houseNo}, {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
            </p>
            {order.deliveryNotes && (
              <p className="text-[11px] text-amber-700 bg-amber-50 rounded-md p-1.5 mt-2 border border-amber-200/60">
                Notes: {order.deliveryNotes}
              </p>
            )}
          </div>
        </div>

        {/* Items List */}
        <div>
          <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Order Items ({order.items?.length})</h5>
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between bg-white text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-slate-400">{item.unit} • {brand.currency}{item.price} each</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800">× {item.quantity}</span>
                  <span className="block font-bold text-emerald-700">{brand.currency}{item.total}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="mt-3 bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{brand.currency}{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span>{order.deliveryFee === 0 ? "FREE" : `${brand.currency}${order.deliveryFee}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Promotional Discount</span>
                <span>-{brand.currency}{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-emerald-700">{brand.currency}{order.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
            }}
            size="sm"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;

