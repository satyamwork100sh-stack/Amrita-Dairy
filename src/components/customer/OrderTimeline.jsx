import React from 'react';
import { CheckCircle2, Clock, Truck, Package, ShieldCheck, Home } from 'lucide-react';

export const OrderTimeline = ({ timeline = [], currentStatus = "Out for Delivery" }) => {
  const steps = [
    { title: "Order Confirmed", icon: ShieldCheck },
    { title: "Preparing at Farm Hub", icon: Package },
    { title: "Assigned to Partner", icon: Truck },
    { title: "Out for Delivery", icon: Truck },
    { title: "Delivered", icon: Home }
  ];

  return (
    <div className="py-2">
      <div className="space-y-4 sm:space-y-6">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const isDone = step.completed;

          return (
            <div key={idx} className="relative flex items-start gap-3 sm:gap-4">
              {/* Step Icon / Indicator */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow-xs z-10 ${
                    isDone
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                </div>

                {/* Connecting vertical line */}
                {!isLast && (
                  <div
                    className={`w-0.5 h-10 sm:h-12 -mt-1 -mb-1 ${
                      isDone ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>

              {/* Step Details */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h5
                    className={`text-xs sm:text-sm font-bold ${
                      isDone ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.status}
                  </h5>
                  <span
                    className={`text-[11px] font-mono ${
                      isDone ? 'text-emerald-700 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {step.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;

