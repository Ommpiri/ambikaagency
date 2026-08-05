import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
  totalFrames: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, totalFrames }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameIndexStr = String(i).padStart(4, '0');
      img.src = `${import.meta.env.BASE_URL}frames/frame_${frameIndexStr}.jpg`;

      const handleLoad = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === totalFrames) {
          // Auto-dismiss after a brief pause
          setTimeout(() => {
            if (mounted) {
              setIsDone(true);
              setTimeout(() => onComplete(loadedImages), 600);
            }
          }, 300);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
      loadedImages[i - 1] = img;
    }

    return () => { mounted = false; };
  }, [totalFrames, onComplete]);

  const percentage = Math.round((loadedCount / totalFrames) * 100);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f3ef]"
        >
          {/* Brand Header Lockup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center flex flex-col items-center"
          >
            <span className="font-sans font-medium tracking-[0.2em] text-base uppercase text-[#1a1a1a] block">
              Ambika Agency
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#8c877e] uppercase font-medium mt-1 block">
              Balasore · Est. 2020
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-[#d4d0ca] relative overflow-hidden">
            <motion.div
              className="h-full bg-[#1a1a1a]"
              style={{ width: `${percentage}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-sans text-[10px] tracking-[0.2em] text-[#9a958d] uppercase"
          >
            {percentage}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
