import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { categories } from '../../data/categories';
import ProductCard from '../../components/customer/ProductCard';
import EmptyState from '../../components/common/EmptyState';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, X } from 'lucide-react';
import { brand } from '../../config/brand';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useAppData();

  const initialCat = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, rating
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }
        // Price filter
        if (product.price > maxPrice) {
          return false;
        }
        // Stock filter
        if (onlyInStock && !product.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured / bestseller
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice, onlyInStock]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1500);
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
          Dairy Store & Fresh Pantry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore farm-fresh milk, organic bilona ghee, probiotic curds, and artisanal paneer.
        </p>
      </div>

      {/* Control Bar: Search, Category Pills, Sort & Mobile Filter Toggle */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by product name, e.g. cow milk, ghee, paneer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Mobile Expanded Filters Panel */}
        {mobileFilterOpen && (
          <div className="md:hidden pt-3 border-t border-slate-100 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>Max Price:</span>
                <span className="text-emerald-700 font-bold">{brand.currency}{maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="1500"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Show In-Stock Products Only</span>
            </label>
          </div>
        )}
      </div>

      {/* Main Content Layout with Sidebar Filters (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-emerald-600" /> Filter Store
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-slate-400 hover:text-emerald-700 cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Max Price</span>
                <span className="font-bold text-emerald-700">{brand.currency}{maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="1500"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{brand.currency}30</span>
                <span>{brand.currency}1,500</span>
              </div>
            </div>

            {/* Stock Toggle */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>

            {/* Quality Promise Badge */}
            <div className="pt-3 border-t border-slate-100 bg-emerald-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
              <h5 className="font-bold text-emerald-900 text-xs">Pure Farm Commitment</h5>
              <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
                All milk is fresh-milked daily. Zero water dilution or artificial preservatives guaranteed.
              </p>
            </div>
          </div>
        </aside>

        {/* Product Grid: 4 items per row on desktop (lg:col-span-9 -> 3 per row in 9-col, or 4 cols when no sidebar) */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No dairy products found"
              description="Try adjusting your category filter, price range, or search keyword."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
                <span>Showing <strong className="text-slate-800">{filteredProducts.length}</strong> dairy items</span>
                <span>Chilled delivery guaranteed</span>
              </div>

              {/* Responsive Grid: 3-4 cols desktop, 2-3 cols tablet, 2 cols mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

