'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DisplayProps {
  value: string;
  operation: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, operation }) => {
  return (
    <div className="relative w-full h-32 bg-black border-b border-primary/30 p-4 flex flex-col justify-end items-end overflow-hidden scanlines">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 0)', backgroundSize: '15px 15px' }} />
      
      {/* Operation Indicator */}
      <AnimatePresence mode="wait">
        {operation && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-xs text-accent uppercase tracking-widest font-bold mb-1"
          >
            MOD: {operation}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Value */}
      <div className="relative w-full text-right">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="text-5xl md:text-6xl font-bold tracking-tighter text-primary crt-flicker truncate"
          style={{ textShadow: '0 0 10px var(--glow)' }}
        >
          {value}
        </motion.div>
      </div>

      {/* Status Bar */}
      <div className="absolute top-2 left-4 flex gap-2">
        <div className="w-1 h-1 bg-primary animate-pulse" />
        <div className="w-4 h-1 bg-primary/20" />
        <div className="text-[8px] text-primary/40 tracking-[0.2em] font-bold">SYSTEM ACTIVE</div>
      </div>
    </div>
  );
};
