import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { 
  Award, 
  ShieldCheck, 
  Store, 
  PackageCheck, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Building2
} from 'lucide-react';

import storefrontEnhancedImg from '../assets/storefront_enhanced.jpg';
import counterOwnerImg from '../assets/counter_owner.jpg';
import storeDeskImg from '../assets/store_desk.jpg';
import authorizedCertificatesImg from '../assets/authorized_certificates.jpg';
import inventoryShelvesImg from '../assets/inventory_shelves.jpg';

interface StorePhoto {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  src: string;
  category: string;
}

const storePhotos: StorePhoto[] = [
  {
    id: 'storefront',
    title: 'Showroom Entrance & Exterior',
    subtitle: 'Official Ori-Plast & Himgiri Outlet, Balasore',
    badge: 'Physical Storefront',
    category: 'Showroom',
    description: 'Our physical showroom entrance in Balasore town featuring high-visibility brand signages for Ori-Plast and Himgiri Tanks, with spacious access for customer vehicles and contractor pickup trucks.',
    src: storefrontEnhancedImg,
  },
  {
    id: 'owner_counter',
    title: 'Trade & Billing Counter',
    subtitle: 'Personalized Customer Service & Owner Supervision',
    badge: 'Proprietor Desk',
    category: 'Counter',
    description: 'Store proprietor managing billing, direct customer inquiries, transparent contractor pricing, and technical recommendations for plumbing and sanitaryware installations.',
    src: counterOwnerImg,
  },
  {
    id: 'certificates_wall',
    title: 'Authorized Dealership Wall',
    subtitle: 'Ori-Plast Premier Professional & Jaquar Certification',
    badge: 'Official Dealer Wall',
    category: 'Certifications',
    description: 'Proudly displayed dealer authorization certificates from Ori-Plast, Jaquar, and premier manufacturers, proving 100% genuine brand supply with factory warranties.',
    src: authorizedCertificatesImg,
  },
  {
    id: 'inventory_shelves',
    title: 'Warehouse & Inventory Racks',
    subtitle: 'Ready Counter Stock for Same-Day Dispatch',
    badge: 'Stock Racks',
    category: 'Inventory',
    description: 'Neatly organized warehouse racks filled with genuine Jaquar bath fittings, concealed mixers, brass wheel valves, and fitting accessories available for immediate order fulfillment.',
    src: inventoryShelvesImg,
  },
  {
    id: 'store_desk',
    title: 'Order Processing & Desk Operations',
    subtitle: 'Fast Contractor Specifications & Invoicing',
    badge: 'Operations Desk',
    category: 'Operations',
    description: 'Dedicated trade counter desk processing contractor bills, catalog references, project estimates, and inventory dispatches with precision.',
    src: storeDeskImg,
  },
];

export function Craft() {
  const containerRef = useRef<HTMLElement>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Showroom', 'Counter', 'Certifications', 'Inventory', 'Operations'];

  const filteredPhotos = activeCategory === 'All' 
    ? storePhotos 
    : storePhotos.filter(p => p.category === activeCategory);

  const currentPhoto = storePhotos[activePhotoIndex];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo('.about-animate', 
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % storePhotos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + storePhotos.length) % storePhotos.length);
  };

  return (
    <section 
      id="craft"
      ref={containerRef} 
      className="py-16 sm:py-24 md:py-32 w-full bg-[#faf8f5] border-y border-[#e8e2d8] text-[#1c1917] overflow-hidden"
      data-testid="section-craft"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* ═══ SECTION HEADER & STORY ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 about-animate">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b85d34]/10 text-[#b85d34] border border-[#b85d34]/25 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
              <Building2 className="w-3.5 h-3.5" />
              About Ambika Agency — Balasore
            </div>
            
            {/* Solid charcoal headline with copper accent subtitle */}
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] leading-[1.18] tracking-tight mb-6" data-testid="text-craft-headline">
              Established 2020. <br />
              <span className="text-[#b85d34] font-semibold">Balasore's Trusted Trade Counter & Sanitaryware Supplier.</span>
            </h2>

            {/* Thin Copper Divider between heading block & description */}
            <div className="w-24 h-1 bg-[#b85d34] rounded-full mb-6" />

            <p className="font-sans text-base sm:text-lg text-[#3f3a36] leading-relaxed font-normal">
              Ambika Agency was founded in 2020 with a clear mission: to provide homeowners, plumbers, building contractors, and project engineers across Balasore town and Balasore district with 100% genuine, factory-certified plumbing, sanitaryware, and borewell water systems.
            </p>
          </div>

          {/* Right Column: Key Pillars Cards with Subtle Copper Top Border */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 about-animate">
            <div className="bg-[#fcfbfa] p-5 rounded-xl border border-[#e8e2d8] border-t-4 border-t-[#b85d34] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <Award className="w-6 h-6 text-[#b85d34] mb-3" strokeWidth={1.75} />
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">Est. 2020</div>
                <div className="font-sans text-xs text-[#57514c] mt-1 font-semibold">Serving Balasore District</div>
              </div>
            </div>

            <div className="bg-[#fcfbfa] p-5 rounded-xl border border-[#e8e2d8] border-t-4 border-t-[#b85d34] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#b85d34] mb-3" strokeWidth={1.75} />
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">100%</div>
                <div className="font-sans text-xs text-[#57514c] mt-1 font-semibold">Genuine Brand Guarantee</div>
              </div>
            </div>

            <div className="bg-[#fcfbfa] p-5 rounded-xl border border-[#e8e2d8] border-t-4 border-t-[#b85d34] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <Store className="w-6 h-6 text-[#b85d34] mb-3" strokeWidth={1.75} />
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">Direct</div>
                <div className="font-sans text-xs text-[#57514c] mt-1 font-semibold">Authorized Dealer Wall</div>
              </div>
            </div>

            <div className="bg-[#fcfbfa] p-5 rounded-xl border border-[#e8e2d8] border-t-4 border-t-[#b85d34] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <PackageCheck className="w-6 h-6 text-[#b85d34] mb-3" strokeWidth={1.75} />
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">Ready</div>
                <div className="font-sans text-xs text-[#57514c] mt-1 font-semibold">Same-Day Counter Pickup</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thin Copper Section Divider */}
        <div className="w-full border-t border-[#b85d34]/20 mb-12" />

        {/* ═══ REAL STORE PHOTOS SHOWCASE HEADER ═══ */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 about-animate">
          <div>
            <span className="font-sans text-[11px] tracking-[0.25em] text-[#b85d34] font-bold uppercase block mb-2">
              Inside Ambika Agency — Real Store Gallery
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
              Explore Our Showroom, Billing Counter & Stock
            </h3>
          </div>

          {/* Filter Pills with Copper Active Style */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#b85d34] text-white shadow-sm'
                    : 'bg-[#f5f2eb] text-[#57514c] hover:bg-[#ebd9ce] hover:text-[#1c1917] border border-[#e2d8ca]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ FEATURED HERO IMAGE VIEWER WITH COPPER ACCENTS & PROPER FITTING ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14 about-animate">
          
          {/* Main Selected Image Container (Frame fills properly with thin copper border) */}
          <div className="lg:col-span-8 bg-[#1f1b18] rounded-2xl p-2.5 sm:p-3 border-2 border-[#b85d34]/70 shadow-lg flex flex-col justify-between relative group overflow-hidden">
            
            {/* Image Frame Box (No wasted black bars, clean aspect ratio, fitted object) */}
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#141210] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center border border-[#b85d34]/30"
              onClick={() => setLightboxOpen(true)}
              data-testid="img-craft-main-display"
            >
              <img 
                src={currentPhoto.src} 
                alt={currentPhoto.title} 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Top Copper Badge Pill */}
              <div className="absolute top-4 left-4 bg-[#b85d34] text-white text-[11px] font-sans font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/30 shadow-md flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                {currentPhoto.badge}
              </div>

              {/* Copper Fullscreen Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                className="absolute top-4 right-4 bg-[#b85d34] text-white p-2.5 rounded-full border border-white/30 shadow-md hover:bg-[#a04e29] transition-all cursor-pointer"
                title="Open fullscreen view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Previous / Next Arrow Controls with Copper Theme */}
              <button 
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1c1917]/85 hover:bg-[#b85d34] text-white flex items-center justify-center border border-[#b85d34]/40 transition-all opacity-90 hover:scale-105 cursor-pointer shadow-md"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1c1917]/85 hover:bg-[#b85d34] text-white flex items-center justify-center border border-[#b85d34]/40 transition-all opacity-90 hover:scale-105 cursor-pointer shadow-md"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Bar below main image */}
            <div className="mt-2.5 bg-[#2a2420] text-white p-4 rounded-xl border border-[#b85d34]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
              <div>
                <div className="text-xs text-[#e89065] font-bold uppercase tracking-wider mb-0.5">
                  {currentPhoto.subtitle}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {currentPhoto.title}
                </h4>
              </div>
              <button 
                onClick={() => setLightboxOpen(true)}
                className="self-start sm:self-center px-4 py-2 bg-[#b85d34] hover:bg-[#a04e29] text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                View Fullscreen
              </button>
            </div>
          </div>

          {/* Right Column: Thumbnail Cards with Copper Left Border for Active Item */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div className="font-sans text-xs font-bold text-[#b85d34] uppercase tracking-widest px-1">
              Select Real Store View ({storePhotos.length})
            </div>

            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[500px] pr-1">
              {storePhotos.map((photo, idx) => {
                const isSelected = idx === activePhotoIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#fcfbfa] text-[#1c1917] border-l-4 border-l-[#b85d34] border border-[#e8e2d8] shadow-md'
                        : 'bg-[#f5f2eb]/70 hover:bg-[#fcfbfa] text-[#1c1917] border-l-4 border-l-transparent border border-[#e8e2d8]/60'
                    }`}
                    data-testid={`thumb-craft-${photo.id}`}
                  >
                    {/* Small Thumbnail */}
                    <div className={`w-16 h-14 shrink-0 rounded-lg overflow-hidden border ${isSelected ? 'border-[#b85d34]' : 'border-[#e8e2d8]'}`}>
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider block text-[#b85d34]">
                        {photo.badge}
                      </span>
                      <h5 className="text-xs font-bold tracking-tight truncate text-[#1c1917]">
                        {photo.title}
                      </h5>
                      <p className="text-[11px] truncate mt-0.5 text-[#57514c]">
                        {photo.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Context Notice with Warm Ivory & Copper Theme */}
            <div className="p-4 bg-[#fdfbf7] rounded-xl border border-[#e8e2d8] border-l-4 border-l-[#b85d34] font-sans text-xs text-[#57514c] space-y-1.5 shadow-sm">
              <div className="font-bold text-[#1c1917] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#b85d34]" />
                100% Authentic Store Photographs
              </div>
              <p className="leading-relaxed">
                All photos above are taken directly inside our physical store in Balasore. Visit us to inspect products and receive instant trade quotations.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ 5-CARD PHOTO GRID SHOWCASE WITH COPPER TOUCHES ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 about-animate">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => {
                const realIdx = storePhotos.findIndex(p => p.id === photo.id);
                if (realIdx !== -1) setActivePhotoIndex(realIdx);
                setLightboxOpen(true);
              }}
              className="group bg-[#fcfbfa] rounded-2xl border border-[#e8e2d8] border-t-2 border-t-[#b85d34] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              data-testid={`card-craft-grid-${photo.id}`}
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] bg-[#141210] overflow-hidden relative">
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#b85d34] text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {photo.badge}
                </div>
                <div className="absolute inset-0 bg-[#b85d34]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 bg-[#b85d34] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> View Photo
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-5 flex flex-col flex-1 justify-between font-sans">
                <div>
                  <span className="text-[10px] font-bold text-[#b85d34] tracking-widest uppercase block mb-1">
                    {photo.subtitle}
                  </span>
                  <h4 className="text-base font-bold text-[#1c1917] tracking-tight mb-2 group-hover:text-[#b85d34] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#57514c] leading-relaxed">
                    {photo.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e8e2d8] flex items-center justify-between text-[11px] text-[#78716c] font-semibold">
                  <span>📍 Ambika Agency Balasore</span>
                  <span className="text-[#b85d34] group-hover:translate-x-1 transition-transform">Explore →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ═══ LIGHTBOX MODAL WITH COPPER BRANDING ═══ */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#141210]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white bg-[#b85d34] hover:bg-[#a04e29] p-3 rounded-full shadow-lg transition-all cursor-pointer z-10 border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next controls */}
          <button 
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#b85d34] hover:bg-[#a04e29] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer z-10 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#b85d34] hover:bg-[#a04e29] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer z-10 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div 
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={currentPhoto.src} 
              alt={currentPhoto.title} 
              className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border-2 border-[#b85d34]/70"
            />
            <div className="mt-4 text-center text-white max-w-2xl px-4 font-sans">
              <span className="inline-block px-3 py-1 bg-[#b85d34] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-2 border border-white/20">
                {currentPhoto.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                {currentPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {currentPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


