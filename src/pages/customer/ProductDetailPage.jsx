import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useCart } from '../../context/CartContext';
import { brand } from '../../config/brand';
import ProductCard from '../../components/customer/ProductCard';
import Button from '../../components/common/Button';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAppData();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id) || products[0];

  // Recommendations: products from same category or featured, excluding current
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, true);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Back Link */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dairy Store</span>
        </Link>
      </div>

      {/* Main Product Layout: Large Image on Left, Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Large Product Image Card */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-lg aspect-4/3 sm:aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.bestseller && (
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-lg shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {product.categoryName}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {brand.currency}{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through">
                  {brand.currency}{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-slate-500">
                inclusive of all taxes / {product.unit}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Quantity:
              </span>
              <div className="flex items-center bg-white border border-slate-300 rounded-xl shadow-2xs overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold min-w-8 text-center text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="outline"
              icon={ShoppingBag}
              className="w-full text-sm font-bold border-slate-300 hover:border-emerald-600 hover:text-emerald-700"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              size="lg"
              variant="primary"
              icon={Zap}
              className="w-full text-sm font-bold shadow-md shadow-emerald-700/20"
            >
              Buy Now
            </Button>
          </div>

          {/* Delivery & Storage Info Badges */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 divide-y divide-slate-100 text-xs text-slate-600 space-y-2.5">
            <div className="flex items-start gap-3 pt-1">
              <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-semibold block">Morning Delivery Slot</strong>
                <span>{product.deliveryInfo || "Order tonight by 10 PM, delivered chilled before 7:00 AM."}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-semibold block">Storage & Shelf Life</strong>
                <span>{product.shelfLife || "2 Days"}. {product.storage}</span>
              </div>
            </div>

            {product.isSubscriptionAvailable && (
              <div className="flex items-start gap-3 pt-2.5">
                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-semibold block">Daily Subscription Available</strong>
                  <span>Schedule daily or alternate day delivery to save an extra 10%.</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Description & Nutrition */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {product.nutrition && (
              <div className="mt-4 bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Nutritional Highlights
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-xl p-2 border border-emerald-100/60">
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">{key}</span>
                      <span className="font-bold text-emerald-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "You May Also Like" Recommendation Section */}
      <section className="pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
            You May Also Like
          </h2>
          <Link
            to="/shop"
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Explore More Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;

