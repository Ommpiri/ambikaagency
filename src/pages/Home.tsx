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
        <p className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-medium">
          © {new Date().getFullYear()} Ambika Agency — Balasore. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
