import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  // Dual-video crossfade state for 60fps buttery-smooth video looping (0 = Layer A, 1 = Layer B)
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const [videoAOpacity, setVideoAOpacity] = useState(1);
  const [videoBOpacity, setVideoBOpacity] = useState(0);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    // Start video playback
    videoA.play().catch(() => {});

    let isCrossfading = false;

    const checkTime = () => {
      const currentVideo = activeVideo === 0 ? videoA : videoB;
      const targetTime = 7.3; // Trigger seamless crossfade 700ms before 8.0s mark

      if (currentVideo && currentVideo.currentTime >= targetTime && !isCrossfading) {
        isCrossfading = true;

        if (activeVideo === 0) {
          // Crossfade to Video B
          videoB.currentTime = 0;
          videoB.play().catch(() => {});
          setVideoBOpacity(1);
          setVideoAOpacity(0);

          setTimeout(() => {
            setActiveVideo(1);
            videoA.pause();
            isCrossfading = false;
          }, 700);
        } else {
          // Crossfade to Video A
          videoA.currentTime = 0;
          videoA.play().catch(() => {});
          setVideoAOpacity(1);
          setVideoBOpacity(0);

          setTimeout(() => {
            setActiveVideo(0);
            videoB.pause();
            isCrossfading = false;
          }, 700);
        }
      }
    };

    const interval = setInterval(checkTime, 40);
    return () => clearInterval(interval);
  }, [activeVideo]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      if (prefersReducedMotion) {
        tl.fromTo('.hero-anim', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
      } else {
        tl.fromTo('.hero-title', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.2 }
        )
        .fromTo('.hero-subtitle', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.9 }, 
          '-=0.6'
        )
        .fromTo('.hero-actions', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 }, 
          '-=0.6'
        )
        .fromTo('.hero-trust', 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.8 }, 
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white select-none pt-24 sm:pt-32 md:pt-40 pb-8 sm:pb-12"
      data-testid="section-hero"
    >
      {/* ─── Dual-Video Background (Seamless 700ms Crossfade Looping) ─── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-black">
        {/* Layer A Video */}
        <video
          ref={videoARef}
          muted
          playsInline
          style={{ opacity: videoAOpacity }}
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 brightness-[1.08] contrast-[1.05] saturate-[1.05] transition-opacity duration-700 ease-in-out"
          data-testid="video-hero-layer-a"
        >
          <source src={`${import.meta.env.BASE_URL}hero-video.mp4#t=0,8`} type="video/mp4" />
        </video>

        {/* Layer B Video */}
        <video
          ref={videoBRef}
          muted
          playsInline
          style={{ opacity: videoBOpacity }}
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 brightness-[1.08] contrast-[1.05] saturate-[1.05] transition-opacity duration-700 ease-in-out"
          data-testid="video-hero-layer-b"
        >
          <source src={`${import.meta.env.BASE_URL}hero-video.mp4#t=0,8`} type="video/mp4" />
        </video>

        {/* Mobile-optimized dual gradients for readable text on screens of all sizes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/70 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ─── Hero Core Content ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* Main Headline - Mobile-first font scaling */}
          <h1 className="hero-anim hero-title font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
            The quiet authority <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              of water.
            </span>
          </h1>

          {/* Subheadline - Readable line length on mobile */}
          <p className="hero-anim hero-subtitle font-sans text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/85 leading-relaxed max-w-2xl mb-6 sm:mb-8 tracking-wide drop-shadow-md">
            Architectural sanitaryware, heavy-gauge fittings, and deep-well water systems engineered for Odisha&apos;s finest homes.
          </p>

          {/* Action Buttons - Stacked on mobile, inline on desktop */}
          <div className="hero-anim hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('collections')}
              className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:bg-neutral-200 active:scale-[0.98] cursor-pointer shadow-2xl rounded-none w-full sm:w-auto"
              data-testid="button-hero-explore"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-black/60 backdrop-blur-xl border border-white/30 text-white font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:bg-white/20 active:scale-[0.98] cursor-pointer shadow-xl rounded-none w-full sm:w-auto"
              data-testid="button-hero-contact"
            >
              <span>Showroom Inquiry</span>
            </button>
          </div>

          {/* Trust badges - Grid wrap on mobile */}
          <div className="hero-anim hero-trust flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 font-sans text-[11px] sm:text-xs tracking-wider uppercase font-medium border-t border-white/20 pt-4 sm:pt-6 max-w-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Est. 2020 — Balasore</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div>Authorized Stockist</div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div>Same-Day Dispatch</div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Scroll Hint Indicator ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-4 flex justify-between items-end">
        <button
          onClick={() => scrollToSection('collections')}
          className="flex items-center gap-3 text-white/80 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="w-5 h-9 sm:w-6 sm:h-10 border border-white/40 rounded-full flex justify-center p-1 sm:p-1.5 group-hover:border-white transition-colors bg-black/30 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/80 group-hover:text-white font-medium">
            Scroll to explore
          </span>
        </button>

        <div className="hidden sm:block font-sans text-[10px] tracking-[0.25em] text-white/60 uppercase font-medium">
          Balasore · Bhadrak · Mayurbhanj
        </div>
      </div>
    </section>
  );
}
