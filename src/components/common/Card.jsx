import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'md',
  onClick
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs transition-all duration-200 ${
        hoverEffect ? 'hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 cursor-pointer' : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

