import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../config/brand';
import Logo from '../../components/common/Logo';
import Button from '../../components/common/Button';
import {
  ShieldCheck,
  Award,
  Truck,
  Heart,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Droplets,
  Sun,
  Leaf,
  Users,
  Clock,
  FlaskConical,
  Milk,
  Building,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

export const AboutPage = () => {
  // Slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState('all');

  const slides = [
    {
      id: 1,
      title: "Ethical Vedic Gaushala & Native Gir Cows",
      subtitle: "Happy Cows, Purer Milk",
      description: "Our cows roam freely across 45+ acres of green open grasslands in Lucknow. They are fed only organic hybrid green napier grass, maize, and Ayurvedic digestive herbs—strictly zero chemical hormones or oxytocin.",
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1400&q=85",
      tag: "Green Farm Pasture",
      stat: "45+ Acres Pasture"
    },
    {
      id: 2,
      title: "100% Touch-Free Automated Milking",
      subtitle: "German Precision & Complete Hygiene",
      description: "Milk is harvested using state-of-the-art closed-loop automated milking clusters. From cow udder to storage vat, the milk never touches human hands or open air, preserving absolute microbiological freshness.",
      image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1400&q=85",
      tag: "Zero Human Touch",
      stat: "Zero Contamination"
    },
    {
      id: 3,
      title: "26 Rigorous In-House Lab Tests",
      subtitle: "Zero Adulteration, Everyday Verification",
      description: "Every single morning batch passes through our on-site testing laboratory. We test for fat content, SNF, water adulteration, urea, detergents, antibiotics, and microbial purity before approving it for packing.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
      tag: "Laboratory Certified",
      stat: "26 Quality Checks"
    },
    {
      id: 4,
      title: "4°C Cold Chain & Eco-Friendly Glass Bottling",
      subtitle: "Farm Freshness Locked Instantly",
      description: "Within 15 minutes of milking, the temperature is brought down to 4°C to lock in original taste and natural vitamins. Packaged in sanitized glass bottles and UV-sterilized tamper-proof seal packs.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1400&q=85",
      tag: "Eco Glass Packaging",
      stat: "4°C Cold Chain"
    },
    {
      id: 5,
      title: "Doorstep Home Delivery Before 7:00 AM",
      subtitle: "Reliable Morning Drops Across Lucknow",
      description: "Our dedicated electric and insulated delivery fleet navigates Lucknow neighborhoods early morning so your family wakes up to pure, wholesome milk every single day.",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1400&q=85",
      tag: "Early Morning Fleet",
      stat: "By 7:00 AM Daily"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const galleryImages = [
    {
      id: 'g1',
      category: 'farm',
      title: 'Free Range Indian Gir Cows',
      caption: 'Stress-free environment with pure open grazing space',
      src: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g2',
      category: 'farm',
      title: 'Lush Organic Napier Grass',
      caption: 'Pesticide-free nutrition grown on our farm',
      src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g3',
      category: 'processing',
      title: 'Stainless Steel Chilling Tanks',
      caption: 'Maintained strictly at 4°C for pristine quality',
      src: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g4',
      category: 'processing',
      title: 'Automated Clean-In-Place Milking',
      caption: 'Untouched by human hands from farm to vat',
      src: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g5',
      category: 'products',
      title: 'Traditional Wooden Bilona Ghee',
      caption: 'Handcrafted curd churned over slow wood fire',
      src: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g6',
      category: 'products',
      title: 'Farm Fresh Malai Paneer',
      caption: 'Soft, creamy and rich in natural dairy proteins',
      src: 'https://images.unsplash.com/photo-1589927986086-3d10fb5555ca?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g7',
      category: 'delivery',
      title: 'Doorstep Temperature Insulated Drops',
      caption: 'Delivered in insulated crates before 7 AM',
      src: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g8',
      category: 'delivery',
      title: 'Eco-Friendly Glass Bottle Collection',
      caption: 'Zero single-use plastic waste for a cleaner Lucknow',
      src: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === galleryFilter);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 sm:pt-16 pb-20 sm:pb-28">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-200/80 mb-6">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">About Amrita Dairy</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>अमृत जैसी शुद्धता • Pure Vedic Dairy Heritage</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight">
                Pure Milk As Nature Intended, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-200 to-emerald-400">
                  Straight From Our Farm
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                Welcome to <strong>Amrita Dairy & Products</strong>. Born in Lucknow out of a passion for authentic Vedic cow care and uncompromised health, we provide 100% farm-fresh, chemical-free milk, A2 bilona ghee, and daily dairy essentials right to your doorstep before the sun comes up.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/shop">
                  <Button variant="primary" size="lg" className="shadow-lg shadow-emerald-950/40 gap-2 font-bold">
                    Explore Our Dairy Products <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/subscriptions">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-bold">
                    View Daily Subscriptions
                  </Button>
                </Link>
              </div>

              {/* Trust Pill Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-700/50">
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>100% Desi Gir Cows</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>26 Daily Lab Tests</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>Untouched By Hand</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>Delivered By 7 AM</span>
                </div>
              </div>
            </div>

            {/* Farm Emblem / Logo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-md shadow-2xl text-center space-y-5 max-w-sm w-full">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center rounded-3xl bg-white/10 p-2 shadow-inner border border-white/20">
                  <Logo size="lg" variant="light" showTagline={false} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">Amrita Dairy & Products</h3>
                  <p className="text-xs text-amber-300 font-medium italic mt-1">
                    "अमृत जैसी शुद्धता, हर सुबह आपके घर"
                  </p>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Headquartered in Gomti Nagar, Lucknow. Running on solar power, natural rainwater harvesting, and zero-adulteration ethics.
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-emerald-200 font-semibold bg-emerald-900/60 py-2 rounded-xl border border-emerald-700/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FSSAI Lic. No: 12724999000142</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PHOTO SLIDER & HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
          {/* Slider Header Bar */}
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                Virtual Farm Tour • Visual Journey of Amrita Dairy
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1.5"
                title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px]">{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <div className="h-4 w-px bg-slate-700 mx-1" />

              <button
                onClick={handlePrevSlide}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white transition"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                {activeSlide + 1} / {slides.length}
              </span>
              <button
                onClick={handleNextSlide}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-white transition"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Slide Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[460px]">
            {/* Slide Image with Overlay */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden group">
              <img
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                <Leaf className="w-3.5 h-3.5" />
                <span>{slides[activeSlide].tag}</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-amber-300 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-xs border border-slate-700">
                {slides[activeSlide].stat}
              </div>
            </div>

            {/* Slide Text Content */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  {slides[activeSlide].subtitle}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight leading-snug">
                  {slides[activeSlide].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {slides[activeSlide].description}
                </p>

                <div className="pt-2 space-y-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Real-time cold-temperature logged every 10 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Hygienic stainless steel food-grade 304 vats</span>
                  </div>
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="pt-8 flex items-center justify-between border-t border-slate-200 mt-6">
                <div className="flex items-center gap-2">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? 'w-8 bg-emerald-600'
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <Link
                  to="/shop"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                >
                  Taste the Difference <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY & VEDIC PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80"
                alt="Amrita Dairy Cow"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border border-slate-200"
              />
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                    A2
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Vedic Gir Cow Milk</h5>
                    <p className="text-[11px] text-slate-500">Naturally enriched with A2 beta-casein</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>The Amrita Story & Ethics</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight leading-tight">
              Why We Started <span className="text-emerald-700">Amrita Dairy & Products</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                In an era where market milk is commonly reconstituted from skimmed powder, contaminated with preservatives, or stripped of its natural cream, we founded <strong>Amrita Dairy</strong> with a straightforward promise: <em>Nothing added, nothing taken away.</em>
              </p>
              <p>
                Our dairy begins with traditional <strong>Gau-Sewa</strong>. Our indigenous Gir and Sahiwal cows are treated as revered members of our extended family. They listen to soothing classical ragas, graze freely in sunshine, and are fed seasonal greens harvested directly on our farm without urea or synthetic chemicals.
              </p>
              <p>
                The first right to the milk always belongs to the calf. Only the remainder is collected using cleanroom suction systems and dispatched to Lucknow households in under 3 hours from milking.
              </p>
            </div>

            {/* Core Values 3-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1.5">
                <Droplets className="w-6 h-6 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Zero Adulteration</h4>
                <p className="text-xs text-slate-600">No water, no milk powder, no thickening starches ever.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1.5">
                <Sun className="w-6 h-6 text-amber-600" />
                <h4 className="font-bold text-slate-900 text-sm">Vedic Bilona Ghee</h4>
                <p className="text-xs text-slate-600">Slow wood-fired curd churning for authentic Ayurvedic aroma.</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1.5">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm">Oxytocin Free</h4>
                <p className="text-xs text-slate-600">Ethical hormone-free cows living a peaceful, natural life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FARM-TO-HOME 5-STEP JOURNEY */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Unbroken Cold Chain
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
              From Our Farm To Your Morning Glass
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Here is how Amrita Dairy ensures the milk delivered at 6:30 AM is as fresh as if you milked it yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/80 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-white text-base">4:00 AM Milking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cleanroom automated cluster milking untouched by human hands.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/80 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-white text-base">4°C Rapid Chill</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cooled within 15 minutes to lock in freshness and prevent bacterial growth.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/80 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-white text-base">26 Lab Tests</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digital fat, SNF, and adulteration analysis on each batch.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/80 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-white text-base">Glass Bottling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                UV-sterilized food-grade glass packaging that keeps the milk ice cold.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/80 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                05
              </div>
              <h4 className="font-bold text-white text-base">6:30 AM Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quiet morning delivery straight to your doorstep before you wake up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHOTO GALLERY WITH CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Live Farm Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight mt-1">
              Inside Amrita Dairy & Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse actual photographs of our farm, testing labs, and delivery operations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'farm', label: 'Farm & Cattle' },
              { id: 'processing', label: 'Lab & Plant' },
              { id: 'products', label: 'Fresh Products' },
              { id: 'delivery', label: 'Morning Fleet' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setGalleryFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  galleryFilter === f.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((img) => (
            <div
              key={img.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full backdrop-blur-xs">
                  {img.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {img.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KEY STATS COUNTER */}
      <section className="bg-emerald-50/60 border-y border-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">850+</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Happy Lucknow Families</p>
              <p className="text-[11px] text-slate-500">Delivered daily with 99.8% on-time record</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">45+</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Acres Organic Pasture</p>
              <p className="text-[11px] text-slate-500">Clean, pesticide-free grazing land</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">26</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Daily In-House Lab Tests</p>
              <p className="text-[11px] text-slate-500">Adulteration & chemical screen tests</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">4.9 ★</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Customer Rating</p>
              <p className="text-[11px] text-slate-500">Based on 1,200+ verified customer reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOUNDER'S NOTE & PROMISE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-serif font-bold shadow-inner">
            AD
          </div>

          <blockquote className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed font-serif">
            "When we pour milk for our children every morning, we shouldn’t have to wonder what chemicals are inside. At Amrita Dairy & Products, our promise is simple: to bring you the purest gifts of the Gau-Mata, ethically nurtured and untouched by anything artificial."
          </blockquote>

          <div className="space-y-1">
            <h5 className="font-bold text-slate-900 text-base">The Founders of Amrita Dairy</h5>
            <p className="text-xs text-emerald-700 font-medium">Gomti Nagar, Lucknow • Uttar Pradesh</p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 text-white p-8 sm:p-14 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-4xl font-black font-serif tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Taste Real Farm Milk Tomorrow Morning?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto">
            Join hundreds of health-conscious families in Lucknow who trust Amrita Dairy for their daily milk, curd, paneer, and A2 ghee.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/subscriptions">
              <Button variant="primary" size="lg" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-black shadow-lg">
                Start Milk Subscription (Free Trial)
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/40 hover:bg-white/20 font-bold">
                Order Single Delivery
              </Button>
            </Link>
          </div>

          <p className="text-xs text-emerald-200/80">
            Pause, modify, or cancel anytime with a single tap in your customer portal.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

