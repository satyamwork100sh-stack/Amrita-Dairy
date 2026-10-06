import React from 'react';
import { Check, Calendar, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export const SubscriptionCard = ({ frequency, onSelect }) => {
  const isPopular = frequency.badge === "Most Popular";

  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between ${
        isPopular
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-950/5'
          : 'border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md'
      }`}
    >
      {frequency.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${
            isPopular
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-100'
          }`}
        >
          {frequency.badge}
        </span>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">{frequency.name}</h4>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {frequency.description}
        </p>

        <div className="mb-4 bg-emerald-50/60 rounded-xl p-3 border border-emerald-100">
          <span className="text-xs font-bold text-emerald-800 block">
            Save up to {frequency.discountPercent}% on every drop
          </span>
          <span className="text-[11px] text-emerald-600">Free morning delivery guaranteed</span>
        </div>

        <ul className="space-y-2 text-xs text-slate-600 mb-6">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Delivered before 7:00 AM</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Pause, resume or edit anytime</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Zero deposit on glass bottles</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={onSelect}
        variant={isPopular ? 'primary' : 'outline'}
        size="md"
        className="w-full"
      >
        Start Subscription
      </Button>
    </div>
  );
};

export default SubscriptionCard;

