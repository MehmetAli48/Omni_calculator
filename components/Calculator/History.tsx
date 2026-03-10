'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryProps {
  items: string[];
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  return (
    <div className="w-full bg-black/40 border-t border-primary/20 p-4 font-mono overflow-y-auto max-h-40">
      <div className="text-[10px] text-primary/40 mb-2 tracking-widest uppercase flex justify-between">
        <span>Operation Logs</span>
        <span>ID-3042</span>
      </div>
      <div className="space-y-1">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={i + item}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] text-primary/70 border-l border-primary/30 pl-2 py-1 flex justify-between items-center"
            >
              <span>{item.split('=')[0]}</span>
              <span className="text-primary font-bold">= {item.split('=')[1]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <div className="text-[10px] text-primary/20 italic">No cycles recorded...</div>
        )}
      </div>
    </div>
  );
};
