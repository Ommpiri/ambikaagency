import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  visible: boolean;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none select-none"
    >
      <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center p-1">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-1 h-2 bg-white rounded-full"
        />
      </div>
      <ChevronDown className="w-4 h-4 text-white/50 animate-bounce mt-1" />
    </motion.div>
  );
};
