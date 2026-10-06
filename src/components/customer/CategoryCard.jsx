import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {category.badge && (
          <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
            {category.badge}
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
            {category.count} Products
          </span>
          <h4 className="text-base font-bold text-white leading-tight mt-0.5 group-hover:text-emerald-300 transition">
            {category.name}
          </h4>
        </div>
      </div>

      <div className="p-3.5 flex items-center justify-between bg-white text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition">
        <span>Explore range</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
};

export default CategoryCard;

