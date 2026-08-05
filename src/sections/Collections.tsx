import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

import nalaImg from '../assets/nala_studio.jpg';
import bathroomDisplayImg from '../assets/bathroom_display.jpg';
import dharaImg from '../assets/dhara_studio.jpg';
import vimalImg from '../assets/vimal_studio.jpg';

const collections = [
  {
    id: 'pipes',
    category: 'PIPES & FITTINGS',
    name: 'Ori-Plast & Hari Plast Systems',
    descriptor: 'Heavy-gauge CPVC, UPVC pipes, brass wheel valves, and fitting accessories. Full bore sizes in ready counter stock.',
    image: nalaImg,
    alt: 'Ori-Plast and Hari Plast CPVC fittings and brass valves'
  },
  {
    id: 'sanitaryware',
    category: 'SANITARYWARE & CERAMICS',
    name: 'Parryware, Hindware & Jaquar Collection',
    descriptor: 'Luxury ceramic WCs, Jaquar sanitaryware, LED mirror vanities, countertop basins, and vitreous china sanitaryware. Ready stock for immediate contractor pickup.',
    image: bathroomDisplayImg,
    alt: 'Parryware, Hindware and Jaquar luxury bathroom ceramic display'
  },
  {
    id: 'borewell',
    category: 'BOREWELL & SUBMERSIBLE PUMPS',
    name: 'KSB, V-Guard & Texmo Pumps',
    descriptor: 'Submersible pump sets, oil-filled motors, and column pipes. Sized to match your bore depth and local water tables across Balasore.',
    image: dharaImg,
    alt: 'KSB V-Guard Texmo stainless submersible borewell pump set'
  },
  {
    id: 'fittings',
    category: 'BATH FITTINGS & ADHESIVES',
    name: 'Prayag & Pidilite',
    descriptor: 'Concealed wall mixers, brass taps, waste couplings, and Pidilite solvent cements. Ready to fit standard Indian plumbing layouts.',
    image: vimalImg,
    alt: 'Prayag chrome brass bath fittings and Pidilite sealants'
  }
];

export function Collections() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.collection-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { 
            opacity: 0, 
            y: prefersReducedMotion ? 0 : 30 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="collections"
      ref={containerRef} 
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 w-full max-w-7xl mx-auto bg-background"
      data-testid="section-collections"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
        <p className="font-sans text-[11px] tracking-[0.25em] text-primary font-bold uppercase mb-3">
          Core Inventory Categories
        </p>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          What we stock in Balasore
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 sm:gap-y-16 lg:gap-x-16">
        {collections.map((item) => (
          <div 
            key={item.id} 
            className="collection-item flex flex-col group cursor-pointer" 
            data-testid={`card-collection-${item.id}`}
          >
            {/* Studio Product Shot Container */}
            <div className="w-full aspect-[4/3] overflow-hidden mb-6 rounded-2xl border border-border/40 shadow-sm transition-all duration-500 group-hover:border-foreground/30 group-hover:shadow-md">
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                data-testid={`img-collection-${item.id}`}
              />
            </div>

            {/* Hierarchy: Category -> Name -> Descriptor */}
            <div className="flex flex-col text-left px-1">
              <span className="font-sans text-[10px] tracking-[0.22em] font-bold text-primary uppercase mb-1">
                {item.category}
              </span>
              <h3 className="font-sans text-xl font-bold text-foreground tracking-tight mb-2" data-testid={`text-collection-name-${item.id}`}>
                {item.name}
              </h3>
              <p className="font-sans text-sm font-normal text-muted-foreground leading-relaxed" data-testid={`text-collection-desc-${item.id}`}>
                {item.descriptor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
