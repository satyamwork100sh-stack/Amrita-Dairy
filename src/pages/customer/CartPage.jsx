import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryCharge,
    isFreeDelivery,
    freeDeliveryRemaining,
    finalTotal
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Dairy Cart is Empty"
          description="Looks like you haven't added any farm fresh dairy items to your cart yet."
          actionLabel="Start Shopping"
          onAction={() => navigate('/shop')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review your selected farm dairy products before checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      {/* Free Delivery Bar */}
      <div className="mb-8 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <Truck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>
            {isFreeDelivery ? (
              <strong className="text-emerald-800 font-bold">
                🎉 Congratulations! You have unlocked FREE morning home delivery!
              </strong>
            ) : (
              <span className="text-slate-700">
                Add <strong className="text-emerald-800">{brand.currency}{freeDeliveryRemaining}</strong> more to unlock <strong className="text-emerald-800">FREE delivery</strong>!
              </span>
            )}
          </span>
        </div>
        <span className="text-xs font-bold text-emerald-800 hidden sm:inline">
          Threshold: {brand.currency}{brand.freeDeliveryThreshold}
        </span>
      </div>

      {/* Main Grid: Items Table on Left, Order Summary Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {items.map(({ product, quantity }) => {
            const itemTotal = product.price * quantity;

            return (
              <div
                key={product.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div>
                    <Link
                      to={`/products/${product.id}`}
                      className="font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {product.unit} • {brand.currency}{product.price} each
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Fresh Batch
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold min-w-7 text-center text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-20">
                    <span className="block font-black text-slate-900 text-base">
                      {brand.currency}{itemTotal}
                    </span>
                    <span className="text-[10px] text-slate-400">Subtotal</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-slate-400 hover:text-rose-600 p-2 transition cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="p-4 bg-slate-50 flex items-center justify-between">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
            <span className="text-xs text-slate-500 font-medium">
              Chilled packaging included
            </span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">{brand.currency}{cartSubtotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Morning Delivery Charge</span>
              <span>
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">FREE</span>
                ) : (
                  <span className="font-semibold text-slate-900">{brand.currency}{deliveryCharge}</span>
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Packaging & Taxes</span>
              <span className="text-emerald-700 font-medium">₹0 (Zero GST on fresh milk)</span>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-base">Grand Total</span>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">
                  {brand.currency}{finalTotal}
                </span>
                <span className="text-[10px] text-slate-400 block">Inclusive of all taxes</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate('/checkout')}
            size="lg"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full text-base font-bold shadow-md shadow-emerald-700/20"
          >
            Proceed to Checkout
          </Button>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Quality & Freshness Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Guaranteed Morning Delivery before 7:30 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

