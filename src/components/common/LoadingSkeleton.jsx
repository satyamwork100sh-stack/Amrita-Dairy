import React from 'react';

export const LoadingSkeleton = ({
  variant = 'card', // card, tableRow, text, circle
  count = 1,
  className = ''
}) => {
  const renderItem = (index) => {
    if (variant === 'circle') {
      return (
        <div
          key={index}
          className={`rounded-full bg-slate-200 animate-pulse ${className || 'w-12 h-12'}`}
        />
      );
    }

    if (variant === 'tableRow') {
      return (
        <div key={index} className="flex items-center gap-4 py-4 px-4 border-b border-slate-100 animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
          </div>
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-6 bg-slate-200 rounded-full w-20" />
        </div>
      );
    }

    if (variant === 'text') {
      return (
        <div key={index} className={`space-y-2 animate-pulse ${className}`}>
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-5/6" />
        </div>
      );
    }

    // Default card
    return (
      <div
        key={index}
        className={`bg-white rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse ${className}`}
      >
        <div className="h-40 bg-slate-200 rounded-xl w-full" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-8 bg-slate-200 rounded-xl w-24" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </div>
  );
};

export default LoadingSkeleton;

