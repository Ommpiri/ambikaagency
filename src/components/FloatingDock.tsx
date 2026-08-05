import React, { useRef } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  Expand,
  Shrink,
  RotateCcw,
  Film,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingDockProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentFrame: number;
  totalFrames: number;
  onScrub: (frameIndex: number) => void;
  fitMode: 'contain' | 'cover';
  onToggleFitMode: () => void;
  glowEnabled: boolean;
  onToggleGlow: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onReset: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  isPlaying,
  onTogglePlay,
  currentFrame,
  totalFrames,
  onScrub,
  fitMode,
  onToggleFitMode,
  glowEnabled,
  onToggleGlow,
  isFullscreen,
  onToggleFullscreen,
  onReset,
}) => {
  const scrubberRef = useRef<HTMLDivElement | null>(null);

  const progressPercent = ((currentFrame + 1) / totalFrames) * 100;

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetFrame = Math.round(ratio * (totalFrames - 1));
    onScrub(targetFrame);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 || !scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetFrame = Math.round(ratio * (totalFrames - 1));
    onScrub(targetFrame);
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-3.5 shadow-2xl shadow-black/80 flex flex-col gap-3 select-none"
    >
      {/* Top Scrubber Track */}
      <div className="flex items-center gap-3 px-1">
        <Film className="w-4 h-4 text-white/40 flex-shrink-0" />
        <div
          ref={scrubberRef}
          onClick={handleScrubberClick}
          onMouseMove={handleMouseMove}
          className="relative flex-1 h-2.5 bg-white/10 rounded-full cursor-pointer group flex items-center overflow-visible"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-white/70 to-white rounded-full transition-all duration-75 group-hover:bg-white"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Thumb dot */}
          <div
            className="absolute w-4 h-4 bg-white rounded-full shadow-lg shadow-white/40 -translate-x-1/2 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-150"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Control Buttons Row */}
      <div className="flex items-center justify-between px-1">
        {/* Play/Pause Toggle */}
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Action Controls Group */}
        <div className="flex items-center gap-2">
          {/* Reset / Jump to Top */}
          <button
            onClick={onReset}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>

          {/* Fit Mode Toggle */}
          <button
            onClick={onToggleFitMode}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              fitMode === 'cover'
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white'
            }`}
          >
            {fitMode === 'cover' ? (
              <Minimize2 className="w-4.5 h-4.5" />
            ) : (
              <Maximize2 className="w-4.5 h-4.5" />
            )}
          </button>

          {/* Ambient Glow Toggle */}
          <button
            onClick={onToggleGlow}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              glowEnabled
                ? 'bg-white/20 text-white border border-white/30 shadow-lg shadow-white/10'
                : 'bg-white/5 hover:bg-white/15 text-white/40 hover:text-white'
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            {isFullscreen ? (
              <Shrink className="w-4.5 h-4.5" />
            ) : (
              <Expand className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
