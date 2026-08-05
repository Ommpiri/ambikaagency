import React from 'react';

export interface BrandItem {
  id: string;
  name: string;
  sub?: string;
}

const BRAND_LIST: BrandItem[] = [
  { id: 'ori-plast', name: 'ORI-PLAST', sub: 'PIPES & FITTINGS' },
  { id: 'hari-plast', name: 'HARI PLAST', sub: 'PLUMBING SYSTEMS' },
  { id: 'parryware', name: 'PARRYWARE', sub: 'SANITARYWARE' },
  { id: 'hindware', name: 'HINDWARE', sub: 'CERAMIC & BATH' },
  { id: 'prayag', name: 'PRAYAG', sub: 'BATH FITTINGS' },
  { id: 'jaquar', name: 'JAQUAR', sub: 'SANITARYWARE & CERAMICS' },
  { id: 'ksb', name: 'KSB', sub: 'PUMPS & MOTORS' },
  { id: 'v-guard', name: 'V-GUARD', sub: 'WATER PUMPS' },
  { id: 'texmo', name: 'TEXMO', sub: 'SUBMERSIBLE PUMPS' },
  { id: 'himgiri', name: 'HIMGIRI', sub: 'TANKS & PIPES' },
  { id: 'kent', name: 'KENT', sub: 'WATER PURIFIERS' },
  { id: 'pidilite', name: 'PIDILITE', sub: 'SEALANTS & ADHESIVES' },
];

export const BrandMarquee: React.FC = () => {
  // Duplicate array for seamless infinite looping marquee
  const marqueeItems = [...BRAND_LIST, ...BRAND_LIST];

  return (
    <section className="w-full bg-background border-y border-border/50 py-10 overflow-hidden select-none">
      {/* Eyebrow Label */}
      <div className="text-center mb-6">
        <span className="font-sans text-[11px] tracking-[0.25em] text-muted-foreground font-semibold uppercase">
          Authorized Inventory & Stockist Brands
        </span>
      </div>

      {/* Marquee Wrapper with side fade gradients */}
      <div className="relative w-full overflow-hidden group">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Continuous Scrolling Track */}
        <div className="flex w-max items-center gap-10 sm:gap-14 animate-marquee group-hover:[animation-play-state:paused] prefers-reduced-motion:animate-none prefers-reduced-motion:flex-wrap prefers-reduced-motion:justify-center prefers-reduced-motion:w-full">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex flex-col items-center justify-center shrink-0 opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-pointer px-2"
            >
              <span className="font-sans font-bold tracking-[0.22em] text-sm sm:text-base text-foreground uppercase">
                {brand.name}
              </span>
              {brand.sub && (
                <span className="font-sans text-[9px] tracking-[0.2em] font-medium text-primary uppercase mt-0.5">
                  {brand.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
