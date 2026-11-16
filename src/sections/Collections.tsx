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
    descriptor: 'CPVC and uPVC pipes, fittings, and brass valves. Bring your pipe size or a sample fitting.',
    image: nalaImg,
    alt: 'Pipes, fittings, and valves'
  },
  {
    id: 'sanitaryware',
    category: 'SANITARYWARE & CERAMICS',
    name: 'Parryware, Hindware & Jaquar Collection',
    descriptor: 'Toilets, basins, mirrors, and vanities. Visit the showroom to compare finishes and sizes.',
    image: bathroomDisplayImg,
    alt: 'Bathroom showroom display'
  },
  {
    id: 'borewell',
    category: 'BOREWELL & SUBMERSIBLE PUMPS',
    name: 'KSB, V-Guard & Texmo Pumps',
    descriptor: 'Submersible pumps, motors, and column pipes. Tell us your bore depth and how you use the water.',
    image: dharaImg,
    alt: 'Submersible pump display'
  },
  {
    id: 'fittings',
    category: 'BATH FITTINGS & ADHESIVES',
    name: 'Prayag & Pidilite',
    descriptor: 'Wall mixers, taps, waste fittings, and solvent cement. Ask us to match the fitting to your setup.',
    image: vimalImg,
    alt: 'Bath fittings display'
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
          Pipes, bathware & pumps
        </p>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Shop by category
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 sm:gap-y-16 lg:gap-x-16">
        {collections.map((item) => (
          <div 
            key={item.id} 
            className="collection-item flex flex-col group" 
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
