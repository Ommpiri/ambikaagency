import React, { useEffect, useRef, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/60 py-4'
          : 'bg-transparent py-5'
      }`}
      data-testid="navigation-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Two-Line Header Lockup with Circular Emblem */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
        >
          <div>
            <div
              className={`font-sans font-medium tracking-[0.2em] text-sm sm:text-base uppercase transition-colors duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              data-testid="text-logo"
            >
              Ambika Agency
            </div>
            <div
              className={`font-sans text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                scrolled ? 'text-muted-foreground' : 'text-white/60'
              }`}
            >
              Balasore · Est. 2020
            </div>
          </div>
        </button>

        {/* Center: Desktop Horizontal Text Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => scrollToSection('collections')}
            className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer hover:opacity-100 ${
              scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => scrollToSection('craft')}
            className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer hover:opacity-100 ${
              scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('featured')}
            className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer hover:opacity-100 ${
              scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`font-sans text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer hover:opacity-100 ${
              scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            Showroom
          </button>
        </div>

        {/* Right: Phone Button */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+917381918465"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer font-sans text-xs tracking-wider uppercase font-medium ${
              scrolled
                ? 'border-border text-foreground hover:bg-foreground hover:text-background'
                : 'border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 73819 18465</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-5 mt-3 shadow-xl">
          <button
            onClick={() => scrollToSection('collections')}
            className="text-left font-sans text-sm tracking-[0.2em] uppercase font-medium text-foreground py-1"
          >
            Collections
          </button>
          <button
            onClick={() => scrollToSection('craft')}
            className="text-left font-sans text-sm tracking-[0.2em] uppercase font-medium text-foreground py-1"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('featured')}
            className="text-left font-sans text-sm tracking-[0.2em] uppercase font-medium text-foreground py-1"
          >
            Inventory
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left font-sans text-sm tracking-[0.2em] uppercase font-medium text-foreground py-1"
          >
            Showroom
          </button>
          <a
            href="tel:+917381918465"
            className="inline-flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-none bg-foreground text-background font-sans text-xs tracking-wider uppercase font-bold min-h-[44px]"
          >
            <Phone className="w-4 h-4" />
            <span>Call Showroom: +91 73819 18465</span>
          </a>
        </div>
      )}
    </nav>
  );
}
