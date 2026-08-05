import React, { useState } from 'react';
import { Aperture, Volume2, VolumeX, Disc, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopBarProps {
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onReset }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl flex items-center justify-between pointer-events-none select-none"
    >
      {/* Brand Icon Logo */}
      <button
        onClick={onReset}
        className="pointer-events-auto w-11 h-11 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center shadow-lg shadow-black/50 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all cursor-pointer"
      >
        <Aperture className="w-5 h-5 text-white animate-spin-slow" />
      </button>

      {/* Center Status Visual Equalizer Graphic */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-lg shadow-black/50">
        <Disc className="w-4 h-4 text-white/50 animate-spin" />
        <div className="flex items-center gap-1 h-3 px-1">
          <div className="w-0.5 h-full bg-white/70 animate-pulse" />
          <div className="w-0.5 h-2 bg-white/40 animate-pulse delay-75" />
          <div className="w-0.5 h-3 bg-white/80 animate-pulse delay-150" />
          <div className="w-0.5 h-1.5 bg-white/50 animate-pulse delay-100" />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-11 h-11 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 text-white/70 hover:text-white flex items-center justify-center shadow-lg shadow-black/50 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 opacity-60" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </motion.header>
  );
};
