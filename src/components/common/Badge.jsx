import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  status,
  className = ''
}) => {
  // Infer variant from status string if provided
  let effectiveVariant = variant;
  if (status) {
    const s = status.toLowerCase();
    if (s.includes('deliver') && !s.includes('out')) effectiveVariant = 'success';
    else if (s.includes('out for delivery') || s.includes('ontheway')) effectiveVariant = 'info';
    else if (s.includes('prepar') || s.includes('busy') || s.includes('paused')) effectiveVariant = 'warning';
    else if (s.includes('assigned') || s.includes('vip')) effectiveVariant = 'purple';
    else if (s.includes('confirm')) effectiveVariant = 'indigo';
    else if (s.includes('cancel') || s.includes('failed') || s.includes('refund')) effectiveVariant = 'danger';
    else if (s.includes('pending') || s.includes('unassigned')) effectiveVariant = 'orange';
    else if (s.includes('online') || s.includes('active')) effectiveVariant = 'success';
    else if (s.includes('offline')) effectiveVariant = 'neutral';
  }

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantStyles[effectiveVariant] || variantStyles.default} ${sizeStyles[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children || status}
    </span>
  );
};

export default Badge;

