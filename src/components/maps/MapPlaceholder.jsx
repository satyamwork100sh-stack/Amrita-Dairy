import React, { useState } from 'react';
import {
  MapPin,
  Bike,
  Plus,
  Minus,
  LocateFixed,
  Layers,
  Phone,
  Compass,
  Building2,
  Warehouse,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export const MapPlaceholder = ({
  markers = [],
  route = true,
  center = { name: "Gomti Nagar, Lucknow" },
  zoom: initialZoom = 14,
  height = "h-80 sm:h-96",
  interactive = true,
  onMarkerClick,
  className = ""
}) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapType, setMapType] = useState('standard'); // standard, satellite, dark

  // Default demo markers if none provided
  const activeMarkers = markers.length > 0 ? markers : [
    {
      id: "hub-1",
      title: "DairyFresh Central Farm Hub",
      title: "Amrita Dairy Farm Hub",
      subtitle: "Cold Storage & Processing",
      type: "hub",
      x: 18,
      y: 26,
      status: "Operational"
    },
    {
      id: "driver-1",
      title: "Rahul Verma (Scooter)",
      subtitle: "1.8 km away • ETA 12 min",
      type: "driver",
      x: 42,
      y: 46,
      vehicle: "UP32 AB 1234",
      phone: "+91 91234 56789",
      eta: "12 mins",
      orderId: "#DF10248"
    },
    {
      id: "cust-1",
      title: "Delivery Destination",
      subtitle: "House 21, Sector 5, Gomti Nagar",
      type: "customer",
      x: 74,
      y: 68,
      customerName: "Satyam Kumar"
    }
  ];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 10));

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) onMarkerClick(marker);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f4f3ef] shadow-inner select-none ${height} ${className}`}>
      {/* SVG Canvas Map Visuals */}
      <svg
        className="w-full h-full object-cover transition-transform duration-300"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background landmass */}
        <rect width="1000" height="600" fill="#f5f3ec" />

        {/* River Gomti Ribbon */}
        <path
          d="M -50,180 C 150,150 280,320 480,260 C 680,200 820,380 1050,330 L 1050,420 C 820,470 680,290 480,350 C 280,410 150,240 -50,270 Z"
          fill="#dbeafe"
          opacity="0.8"
        />
        <text x="360" y="320" fill="#60a5fa" fontSize="13" fontWeight="600" letterSpacing="3" transform="rotate(-15 360 320)">
          GOMTI RIVER
        </text>

        {/* City Green Parks / Reserves */}
        <rect x="80" y="80" width="160" height="110" rx="20" fill="#dcfce7" opacity="0.85" />
        <text x="110" y="140" fill="#15803d" fontSize="11" fontWeight="600" letterSpacing="1">
          LOHIA BOTANICAL PARK
        </text>

        <rect x="620" y="100" width="220" height="90" rx="16" fill="#dcfce7" opacity="0.85" />
        <text x="660" y="150" fill="#15803d" fontSize="11" fontWeight="600" letterSpacing="1">
          JANESHWAR MISHRA GREEN
        </text>

        <rect x="240" y="440" width="190" height="110" rx="16" fill="#dcfce7" opacity="0.85" />
        <text x="270" y="500" fill="#15803d" fontSize="11" fontWeight="600">
          AMBEDKAR MEMORIAL PARK
        </text>

        {/* Secondary Road Grid */}
        <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.95">
          {/* Vertical streets */}
          <line x1="80" y1="0" x2="80" y2="600" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="320" y1="0" x2="320" y2="600" />
          <line x1="450" y1="0" x2="450" y2="600" />
          <line x1="580" y1="0" x2="580" y2="600" />
          <line x1="720" y1="0" x2="720" y2="600" />
          <line x1="860" y1="0" x2="860" y2="600" />

          {/* Horizontal streets */}
          <line x1="0" y1="70" x2="1000" y2="70" />
          <line x1="0" y1="160" x2="1000" y2="160" />
          <line x1="0" y1="280" x2="1000" y2="280" />
          <line x1="0" y1="390" x2="1000" y2="390" />
          <line x1="0" y1="490" x2="1000" y2="490" />
        </g>

        {/* Major Expressways / Arterials */}
        <g stroke="#fde047" strokeWidth="12" strokeLinecap="round" opacity="0.85">
          <line x1="0" y1="220" x2="1000" y2="220" />
          <line x1="520" y1="0" x2="520" y2="600" />
          {/* Diagonal Shaheed Path */}
          <line x1="0" y1="560" x2="1000" y2="60" stroke="#fbbf24" strokeWidth="14" />
        </g>

        {/* Street Name Badges */}
        <text x="30" y="214" fill="#92400e" fontSize="10" fontWeight="bold" letterSpacing="1">
          MAHATMA GANDHI ROAD (MAIN ARTERIAL)
        </text>
        <text x="530" y="80" fill="#92400e" fontSize="10" fontWeight="bold" letterSpacing="1">
          VIPUL KHAND BYPASS
        </text>
        <text x="700" y="245" fill="#b45309" fontSize="11" fontWeight="bold" transform="rotate(-26 700 245)">
          AMAR SHAHEED PATH EXPRESSWAY
        </text>
        <text x="750" y="520" fill="#64748b" fontSize="11" fontWeight="bold">
          SECTOR 5 RESIDENTIAL ZONE
        </text>
        <text x="80" y="420" fill="#64748b" fontSize="11" fontWeight="bold">
          PATRAKARPURAM MARKET
        </text>

        {/* Delivery Route (Animated Glowing Dashed Path) */}
        {route && (
          <g>
            {/* Route Glow Underlay */}
            <path
              d="M 420,276 Q 480,276 520,320 T 640,360 T 740,408"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Route Animated Dashed Line */}
            <path
              d="M 420,276 Q 480,276 520,320 T 640,360 T 740,408"
              fill="none"
              stroke="#059669"
              strokeWidth="4"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="route-dash"
            />
          </g>
        )}
      </svg>

      {/* Markers Layer (HTML/DOM for crisp interactivity) */}
      <div className="absolute inset-0 pointer-events-none">
        {activeMarkers.map((marker) => {
          const isSelected = selectedMarker?.id === marker.id;

          let pinBg = "bg-emerald-600 text-white shadow-emerald-700/40";
          let PinIcon = Bike;
          let ringColor = "bg-emerald-400";

          if (marker.type === "customer") {
            pinBg = "bg-rose-600 text-white shadow-rose-700/40";
            PinIcon = MapPin;
            ringColor = "bg-rose-400";
          } else if (marker.type === "hub") {
            pinBg = "bg-blue-600 text-white shadow-blue-700/40";
            PinIcon = Warehouse;
            ringColor = "bg-blue-400";
          }

          return (
            <div
              key={marker.id}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
              onClick={() => handleMarkerClick(marker)}
            >
              {/* Pulsing ring for driver & destination */}
              <div className={`absolute -inset-2 rounded-full ${ringColor} opacity-75 marker-pulse`} />

              {/* Pin Icon Bubble */}
              <div
                className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition transform group-hover:scale-115 ${pinBg} ${
                  isSelected ? 'ring-4 ring-slate-900 ring-offset-2 scale-110' : ''
                }`}
              >
                <PinIcon className="w-5 h-5" />
              </div>

              {/* Pin Label Tag */}
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-md border border-slate-700/50">
                  {marker.title.split(' ')[0]} {marker.type === 'driver' && '🛵'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Map Controls */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200/80 p-1">
        <button
          onClick={handleZoomIn}
          className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-slate-100" />
        <button
          onClick={handleZoomOut}
          className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Map Status Bar */}
      <div className="absolute left-3 bottom-3 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200/80 px-3 py-1.5 text-xs text-slate-700">
        <LocateFixed className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span className="font-semibold text-slate-900">{center.name || "Lucknow City Region"}</span>
        <span className="text-slate-400">•</span>
        <span className="text-emerald-700 font-medium">GPS Simulation Active</span>
      </div>

      {/* Interactive Selected Marker Popup */}
      {selectedMarker && (
        <div className="absolute left-3 sm:left-6 top-3 sm:top-6 z-30 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-4 max-w-xs animate-scaleUp">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                {selectedMarker.type === 'driver' ? <Bike className="w-4 h-4" /> : <MapPin className="w-4 h-4 text-rose-600" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedMarker.title}</h4>
                <p className="text-xs text-slate-500">{selectedMarker.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-slate-700 p-1 text-xs"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
            {selectedMarker.vehicle && (
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-semibold text-slate-800">{selectedMarker.vehicle}</span>
              </div>
            )}
            {selectedMarker.orderId && (
              <div className="flex justify-between">
                <span className="text-slate-400">Current Order:</span>
                <span className="font-semibold text-emerald-700">{selectedMarker.orderId}</span>
              </div>
            )}
            {selectedMarker.eta && (
              <div className="flex justify-between">
                <span className="text-slate-400">Est. Arrival:</span>
                <span className="font-semibold text-slate-800">{selectedMarker.eta}</span>
              </div>
            )}
            {selectedMarker.phone && (
              <div className="mt-2 flex gap-2">
                <a
                  href={`tel:${selectedMarker.phone}`}
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-center flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3 h-3" /> Call Partner
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPlaceholder;

