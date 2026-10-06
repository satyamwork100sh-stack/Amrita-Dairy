import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { brand } from '../../config/brand';
import { categories } from '../../data/categories';
import { subscriptionFrequencies } from '../../data/subscriptions';
import { useAppData } from '../../context/AppDataContext';
import ProductCard from '../../components/customer/ProductCard';
import CategoryCard from '../../components/customer/CategoryCard';
import SubscriptionCard from '../../components/customer/SubscriptionCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import {
  Milk,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  HeartHandshake
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { products, addSubscription } = useAppData();
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionFrequencies[0]);
  const [subProduct, setSubProduct] = useState(products[0]?.id || 'prod-1');
  const [subQuantity, setSubQuantity] = useState(2);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  const handleStartSubscription = (plan) => {
    setSelectedPlan(plan);
    setSubModalOpen(true);
  };

  const handleConfirmSubscription = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.id === subProduct) || products[0];
    addSubscription({
      productId: prod.id,
      productName: prod.name,
      unit: prod.unit,
      quantity: Number(subQuantity),
      pricePerDay: prod.price * Number(subQuantity),
      frequency: selectedPlan.name,
      frequencyId: selectedPlan.id,
      preferredSlot: "Early Morning (5:30 AM - 7:30 AM)",
      image: prod.image
    });
    setSubModalOpen(false);
    navigate('/subscriptions');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
        {/* Subtle background glow & wave */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Farm-Direct Chilled Morning Delivery</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-serif">
                Fresh Dairy Delivered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                  to Your Door
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Pure, fresh and quality dairy products delivered conveniently to your home before 7:00 AM every single morning. Zero chemicals, zero preservatives.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  onClick={() => navigate('/shop')}
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto text-base px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border-none"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Shop Products
                </Button>

                <Button
                  onClick={() => {
                    const el = document.getElementById('subscriptions-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                >
                  Explore Subscriptions
                </Button>
              </div>

              {/* Mini Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Doorstep drop by 7 AM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Purity test certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pause/Resume anytime</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-4/3 lg:aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh Cow Milk in Glass Bottle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Floating Stat Card 1 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Morning Delivery</span>
                      <h4 className="text-sm font-bold">Lucknow Hub Active</h4>
                      <p className="text-[11px] text-slate-300">Dispatch: 5:30 AM - 7:30 AM</p>
                    </div>
                    <div className="bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                      100% On-Time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Farm Fresh Range</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif mt-1">
              Shop by Dairy Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Categories Grid (Horizontal scroll on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Top Sellers This Morning</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif mt-1">
              Featured Dairy Essentials
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition group"
          >
            <span>Explore Entire Store</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Product Cards Grid: 4 cols desktop, 2-3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US (4 Feature Cards) */}
      <section className="bg-emerald-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Our Farm Promise</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-serif mt-1">
              Why Families Trust {brand.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              We eliminate middlemen, chilling facilities, and plastic pouches to give you the freshest dairy in Uttar Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Milk className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Fresh Every Day</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Milked at 4:00 AM, chilled instantly, and dropped at your doorstep by 7:00 AM without long storage cycles.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Quality Guaranteed</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rigorous 26-parameter batch testing for adulteration, antibiotics, aflatoxins, and added starches every morning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Fast Home Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated local delivery partners assigned to your neighborhood for whisper-quiet morning drop-offs.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Trusted Dairy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ethical farm paddocks with happy grass-fed cattle. Calf feeding prioritized before milking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBSCRIPTIONS SECTION */}
      <section id="subscriptions-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Hassle-Free Morning Routine</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-serif mt-1">
            Daily Milk, Automatically Delivered
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Never run out of pure milk for morning tea again. Choose a flexible frequency and pause anytime with one tap.
          </p>
        </div>

        {/* 4 Cards: Daily, Alternate Days, Weekly, Monthly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionFrequencies.map((freq) => (
            <SubscriptionCard
              key={freq.id}
              frequency={freq}
              onSelect={() => handleStartSubscription(freq)}
            />
          ))}
        </div>
      </section>

      {/* Subscription Quick Modal */}
      <Modal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        title={`Start ${selectedPlan?.name} Subscription`}
        subtitle="Schedule automatic morning deliveries to your doorstep"
      >
        <form onSubmit={handleConfirmSubscription} className="space-y-4 text-sm">
          <Select
            label="Select Milk / Product"
            value={subProduct}
            onChange={(e) => setSubProduct(e.target.value)}
            options={products.map(p => ({
              value: p.id,
              label: `${p.name} (${brand.currency}${p.price} / ${p.unit})`
            }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Quantity (Units/Day)"
              type="number"
              min="1"
              max="10"
              value={subQuantity}
              onChange={(e) => setSubQuantity(e.target.value)}
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Delivery Slot
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800">
                Early Morning (5:30 AM - 7:30 AM)
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="flex justify-between">
              <span>Selected Frequency:</span>
              <strong>{selectedPlan?.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Estimated Cost / Drop:</span>
              <strong>
                {brand.currency}
                {(products.find(p => p.id === subProduct)?.price || 65) * Number(subQuantity)}
              </strong>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>First Delivery:</span>
              <strong>Tomorrow morning (Guaranteed)</strong>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="outline" onClick={() => setSubModalOpen(false)} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;

