import React from 'react';
import { motion } from 'framer-motion';

interface SideNavDotsProps {
  currentFrame: number;
  totalFrames: number;
  onSelectCheckpoint: (ratio: number) => void;
}

export const SideNavDots: React.FC<SideNavDotsProps> = ({
  currentFrame,
  totalFrames,
  onSelectCheckpoint,
}) => {
  const currentRatio = currentFrame / (totalFrames - 1);
  const checkpoints = [0, 0.25, 0.5, 0.75, 1];

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-xl select-none"
    >
      {checkpoints.map((cpRatio, idx) => {
        const isActive = Math.abs(currentRatio - cpRatio) < 0.12;

        return (
          <button
            key={idx}
            onClick={() => onSelectCheckpoint(cpRatio)}
            className="group relative flex items-center justify-center p-1.5 cursor-pointer"
          >
            {/* Dot element */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white scale-125 shadow-lg shadow-white/80'
                  : 'bg-white/30 group-hover:bg-white/70 group-hover:scale-110'
              }`}
            />
          </button>
        );
      })}
    </motion.div>
  );
};
