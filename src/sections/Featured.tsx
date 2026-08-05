import React from 'react';

import feat1 from '../assets/feat1.jpg';
import feat2 from '../assets/feat2.jpg';
import feat3 from '../assets/feat3.jpg';
import feat4 from '../assets/feat4.jpg';
import feat5 from '../assets/feat5.jpg';

const products = [
  { 
    id: 'f1', 
    category: 'PRAYAG & PIDILITE',
    name: 'Concealed Wall Mixer', 
    descriptor: 'Dual-handle brass wall mixer. Ready counter stock for 15mm inlet lines.',
    image: feat1 
  },
  { 
    id: 'f2', 
    category: 'PARRYWARE CERAMIC',
    name: 'Rimless Wall-Hung Closet', 
    descriptor: 'Single-fire glaze vitreous china WC. Dual-flush cistern compatible.',
    image: feat2 
  },
  { 
    id: 'f3', 
    category: 'KSB / TEXMO PUMPING',
    name: 'Submersible Pump Set', 
    descriptor: '1.5HP submersible pump set. Sized for 200-to-350 ft bore depth.',
    image: feat3 
  },
  { 
    id: 'f4', 
    category: 'HINDWARE SANITARY',
    name: 'Countertop Ceramic Vessel', 
    descriptor: 'Countertop glaze ceramic basin, 450mm diameter. Waste coupling ready.',
    image: feat4 
  },
  { 
    id: 'f5', 
    category: 'ORI-PLAST / HARI PLAST',
    name: 'Heavy Brass & CPVC Fittings', 
    descriptor: 'Heavy-gauge CPVC fittings and brass wheel valves for contractor supply.',
    image: feat5 
  },
];

export function Featured() {
  return (
    <section id="featured" className="py-16 sm:py-24 md:py-32 bg-background border-t border-border/40" data-testid="section-featured">
      <div className="max-w-[100vw] overflow-hidden">
        <div className="px-6 md:px-12 mb-10 sm:mb-14 text-center">
          <p className="font-sans text-[11px] tracking-[0.25em] text-primary font-bold uppercase mb-3" data-testid="text-featured-eyebrow">
            Counter Inventory
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Ready for same-day dispatch
          </h2>
        </div>
        
        {/* Horizontal scroll container with plain neutral studio cards */}
        <div 
          className="flex overflow-x-auto gap-5 sm:gap-8 px-5 sm:px-8 md:px-12 pb-10 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          data-testid="container-featured-scroll"
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-[78vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] snap-center group flex flex-col"
              data-testid={`card-featured-${product.id}`}
            >
              {/* Studio Product Container */}
              <div className="w-full aspect-[4/5] mb-4 sm:mb-5 bg-[#f7f6f3] rounded-xl flex items-center justify-center overflow-hidden border border-border/60 p-6 transition-all duration-300 group-hover:border-foreground/40 group-hover:shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  data-testid={`img-featured-${product.id}`}
                />
              </div>

              {/* Hierarchy: Category -> Name -> Descriptor */}
              <div className="px-1 flex flex-col text-left">
                <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">
                  {product.category}
                </span>
                <h3 className="font-sans text-base font-bold text-foreground tracking-tight mb-1" data-testid={`text-featured-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="font-sans text-xs font-normal text-muted-foreground leading-relaxed">
                  {product.descriptor}
                </p>
              </div>
            </div>
          ))}
          <div className="flex-none w-6 sm:w-12 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
