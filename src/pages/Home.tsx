import React from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/sections/Hero';
import { Collections } from '@/sections/Collections';
import { Craft } from '@/sections/Craft';
import { Featured } from '@/sections/Featured';
import { Contact } from '@/sections/Contact';
import { BrandMarquee } from '@/components/BrandMarquee';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      {/* Fixed Navigation Bar */}
      <Nav />

      {/* ═══ HERO SECTION: Animated Video Hero (First 7s Loop) ═══ */}
      <Hero />

      {/* ═══ TRANSITION: Dark to light bridge ═══ */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-black to-background" />

      {/* ═══ MAIN WEBSITE SECTIONS ═══ */}
      <Collections />
      <Craft />
      <Featured />
      <BrandMarquee />
      <Contact />

      {/* Floating Action Buttons (WhatsApp & Google Maps) */}
      <MobileStickyBar />

      {/* Footer */}
      <footer className="w-full py-12 text-center border-t border-border/50 bg-background">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a
            href="https://www.instagram.com/ambikaagency_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a
            href="https://wa.me/918144532282"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
        </div>
        <p className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-medium">
          © {new Date().getFullYear()} Ambika Agency — Balasore. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
