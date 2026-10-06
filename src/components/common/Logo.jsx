import React from 'react';
import { brand } from '../../config/brand';

export const Logo = ({
  variant = 'dark', // 'dark' (for light backgrounds) or 'light' (for dark backgrounds)
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  showTagline = true,
  iconOnly = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: { title: 'text-base', sub: 'text-[9px]' },
    md: { title: 'text-lg sm:text-xl', sub: 'text-[10px]' },
    lg: { title: 'text-xl sm:text-2xl', sub: 'text-xs' },
    xl: { title: 'text-2xl sm:text-3xl', sub: 'text-xs' }
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Emblem / Logo Mark: Amrita Pure Milk Kalash & Organic Leaf Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 hover:scale-105 ${
          isLight
            ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 ring-2 ring-white/20 shadow-emerald-950/40'
            : 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 ring-2 ring-emerald-600/20 shadow-emerald-800/20'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[78%] h-[78%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Sunburst Rays */}
          <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />

          {/* Golden Amrita Nectar Drop Aura */}
          <path
            d="M 50 12 C 50 12, 74 46, 74 62 A 24 24 0 0 1 26 62 C 26 46, 50 12, 50 12 Z"
            fill="url(#goldGradient)"
            opacity="0.95"
          />

          {/* Pure White Milk Stream / Splash Inside */}
          <path
            d="M 50 24 C 50 24, 66 50, 66 63 A 16 16 0 0 1 34 63 C 34 50, 50 24, 50 24 Z"
            fill="#ffffff"
          />

          {/* Twin Farm Green Organic Leaves at Base */}
          <path
            d="M 50 78 C 36 78, 22 70, 20 54 C 32 54, 46 64, 50 78 Z"
            fill="#10b981"
          />
          <path
            d="M 50 78 C 64 78, 78 70, 80 54 C 68 54, 54 64, 50 78 Z"
            fill="#34d399"
          />

          {/* Center Golden Droplet Core */}
          <circle cx="50" cy="62" r="6" fill="#f59e0b" />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="goldGradient" x1="26" y1="12" x2="74" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography: "Amrita Dairy & Products" */}
      {!iconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-black tracking-tight font-serif ${textSizes[size].title} ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              Amrita
            </span>
            <span
              className={`font-bold tracking-tight ${textSizes[size].title} ${
                isLight ? 'text-emerald-300' : 'text-emerald-700'
              }`}
            >
              Dairy
            </span>
          </div>

          <div className="flex items-center gap-1.5 -mt-1">
            <span
              className={`font-extrabold tracking-widest uppercase ${textSizes[size].sub} ${
                isLight ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              & Products
            </span>
            {showTagline && (
              <>
                <span className={`text-[8px] ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>•</span>
                <span
                  className={`font-semibold tracking-wider text-[9px] uppercase hidden sm:inline ${
                    isLight ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  Pure & Fresh
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;

