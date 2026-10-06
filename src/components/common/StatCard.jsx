import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // { direction: 'up' | 'down', label: '+14%' }
  color = 'emerald', // emerald, blue, amber, rose, purple
  className = ''
}) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-50/80',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-500 text-white'
    },
    blue: {
      bg: 'bg-sky-50/80',
      text: 'text-sky-700',
      border: 'border-sky-100',
      iconBg: 'bg-sky-500 text-white'
    },
    amber: {
      bg: 'bg-amber-50/80',
      text: 'text-amber-700',
      border: 'border-amber-100',
      iconBg: 'bg-amber-500 text-white'
    },
    purple: {
      bg: 'bg-purple-50/80',
      text: 'text-purple-700',
      border: 'border-purple-100',
      iconBg: 'bg-purple-500 text-white'
    },
    rose: {
      bg: 'bg-rose-50/80',
      text: 'text-rose-700',
      border: 'border-rose-100',
      iconBg: 'bg-rose-500 text-white'
    }
  };

  const scheme = colorMap[color] || colorMap.emerald;

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h4>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl shadow-xs ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`font-semibold px-1.5 py-0.5 rounded-md ${
                trend.direction === 'up'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {trend.label}
            </span>
          )}
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;

