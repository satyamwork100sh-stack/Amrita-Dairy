import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import MapPlaceholder from '../../components/maps/MapPlaceholder';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Bike,
  Navigation,
  MapPin,
  Clock,
  Phone,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  LocateFixed
} from 'lucide-react';

export const AdminLiveTrackingPage = () => {
  const navigate = useNavigate();
  const { deliveryBoys, orders } = useAppData();
  const [activeDriverId, setActiveDriverId] = useState('db-1');

  // Convert delivery boys into map markers
  const fleetMarkers = deliveryBoys.map((boy) => ({
    id: boy.id,
    title: boy.name,
    subtitle: boy.vehicleNumber,
    type: "driver",
    x: boy.mapCoordinates?.x || 40,
    y: boy.mapCoordinates?.y || 45,
    vehicle: boy.vehicleNumber,
    phone: boy.phone,
    status: boy.status,
    eta: boy.currentOrder?.etaMins ? `${boy.currentOrder.etaMins} mins` : "Free",
    orderId: boy.currentOrder?.orderId ? `#${boy.currentOrder.orderId}` : null
  }));

  // Add hub marker
  fleetMarkers.push({
    id: "central-hub",
    title: "Lucknow Dairy Central Processing Hub",
    subtitle: "26 Tests Certification Center",
    type: "hub",
    x: 18,
    y: 26
  });

  // Add active customer destinations
  fleetMarkers.push(
    {
      id: "dest-satyam",
      title: "Satyam Kumar (Sector 5, Gomti Nagar)",
      subtitle: "Order #DF10248 (2L Cow Milk, Curd)",
      type: "customer",
      x: 74,
      y: 68
    },
    {
      id: "dest-priya",
      title: "Priya Singh (Aliganj)",
      subtitle: "Order #DF10250 (Fresh Paneer, Chaas)",
      type: "customer",
      x: 28,
      y: 20
    }
  );

  const selectedBoy = deliveryBoys.find((b) => b.id === activeDriverId) || deliveryBoys[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
              Live Fleet Tracking Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GPS telemetry simulation for {deliveryBoys.length} on-duty delivery partners across Lucknow.
          </p>
        </div>

        {/* Quick Driver Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {deliveryBoys.slice(0, 4).map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveDriverId(b.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeDriverId === b.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>{b.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Driver Sidebar Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Map Area (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <LocateFixed className="w-4 h-4 text-emerald-600 animate-pulse" />
              <h3 className="font-bold text-slate-900 text-sm">
                Greater Lucknow City Multi-Partner Dispatch Grid
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              4 Active Couriers
            </span>
          </div>

          <MapPlaceholder
            markers={fleetMarkers}
            route={true}
            center={{ name: "Lucknow Dairy Grid" }}
            zoom={14}
            height="h-[420px] sm:h-[500px]"
            onMarkerClick={(marker) => {
              if (marker.type === 'driver') {
                setActiveDriverId(marker.id);
              }
            }}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 px-1 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> 🛵 Active Delivery Boy
              <span className="w-3 h-3 rounded-full bg-rose-600 inline-block ml-2" /> 📍 Customer Destination
            </span>
            <span>Click any marker icon to inspect driver speed and destination</span>
          </div>
        </div>

        {/* Right 4 Columns: Selected Driver Dossier & Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBoy.avatar}
                  alt={selectedBoy.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedBoy.name}</h3>
                  <span className="text-xs font-mono text-slate-400">{selectedBoy.employeeId}</span>
                </div>
              </div>
              <Badge status={selectedBoy.status} size="sm" />
            </div>

            {/* Telemetry rows */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Vehicle:</span>
                <strong className="text-slate-900 font-mono">{selectedBoy.vehicleNumber}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Zone:</span>
                <strong className="text-slate-800">{selectedBoy.currentZone}</strong>
              </div>

              {selectedBoy.currentOrder && (
                <>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Current Order:</span>
                    <strong className="text-emerald-700 font-mono font-bold">
                      #{selectedBoy.currentOrder.orderId}
                    </strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Customer:</span>
                    <strong className="text-slate-800">{selectedBoy.currentOrder.customerName}</strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Distance & ETA:</span>
                    <strong className="text-emerald-700 font-bold">
                      {selectedBoy.currentOrder.distanceKm} km • {selectedBoy.currentOrder.etaMins} mins
                    </strong>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Last Ping:</span>
                    <span className="text-slate-600 font-medium">Just now</span>
                  </div>
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              {selectedBoy.currentOrder && (
                <Link
                  to={`/admin/orders/${selectedBoy.currentOrder.orderId}`}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center block text-xs shadow-xs transition"
                >
                  View Delivery Order #{selectedBoy.currentOrder.orderId}
                </Link>
              )}

              <a
                href={`tel:${selectedBoy.phone}`}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center flex items-center justify-center gap-2 text-xs transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Driver ({selectedBoy.phone})</span>
              </a>
            </div>
          </div>

          {/* Hub Summary Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                CENTRAL HUB SUMMARY
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Operational
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Cold chain vans replenish neighborhood dispatch scooters continuously. All temperatures maintained at 3.8°C.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLiveTrackingPage;

