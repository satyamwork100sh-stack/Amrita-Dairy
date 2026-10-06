import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../config/brand';
import { categories } from '../../data/categories';
import Logo from '../common/Logo';
import { Milk, ShieldCheck, Truck, Award, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const CustomerFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">26 Quality Tests</h5>
              <p className="text-xs text-slate-400">Zero adulteration or starch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">7:00 AM Delivery</h5>
              <p className="text-xs text-slate-400">Fresh morning doorstep drop</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">100% Farm Sourced</h5>
              <p className="text-xs text-slate-400">Cruelty-free ethical dairy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Eco Packaging</h5>
              <p className="text-xs text-slate-400">Glass bottles & food pouches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {brand.shortDescription} Taste the difference of pure Vedic A2 cow milk, fresh malai paneer, and authentic wood-fired desi ghee.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{brand.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{brand.phone} • {brand.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{brand.email}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Dairy Fresh Categories</h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="hover:text-emerald-400 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                  About Amrita Dairy
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-emerald-400 transition">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-emerald-400 transition">
                  Daily Milk Subscriptions
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-emerald-400 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/profile/addresses" className="hover:text-emerald-400 transition">
                  Saved Delivery Addresses
                </Link>
              </li>
              <li>
                <Link to="/delivery/dashboard" className="text-emerald-400 hover:underline">
                  🛵 Delivery Boy Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-emerald-400 hover:underline">
                  📊 Admin Operations Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Hours & App Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Morning Schedule</h4>
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Order Cut-off:</span>
                <span className="text-emerald-400">10:00 PM Tonight</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Morning Dispatch:</span>
                <span className="text-white">5:30 AM – 7:30 AM</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Evening Dispatch:</span>
                <span className="text-white">5:30 PM – 7:30 PM</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700/60">
                Free delivery on all orders above {brand.currency}{brand.freeDeliveryThreshold}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {brand.name} Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>UI Prototype Demo</span>
            <span>•</span>
            <span>Made with React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;

