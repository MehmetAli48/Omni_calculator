'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { History } from './History';
import GraphingViewport from './GraphingViewport';

export const Calculator: React.FC = () => {
  const { 
    display, 
    history, 
    operation, 
    plotData,
    inputDigit, 
    inputDecimal, 
    performOperation, 
    clear 
  } = useCalculator();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-[400px] bg-panel backdrop-blur-md sharp-border-primary p-1 overflow-hidden"
      style={{ boxShadow: '0 0 40px rgba(204, 255, 0, 0.1)' }}
    >
      {/* Decorative Corner Tabs */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1" />

      {/* Main Container */}
      <div className="bg-black/80 flex flex-col">
        {/* Header / ID Tag */}
        <div className="p-2 border-b border-primary/20 flex justify-between items-center">
          <div className="text-[10px] font-bold tracking-[0.3em] flex items-center gap-2">
            <div className="w-2 h-2 bg-primary animate-pulse" />
            INSTRUMENT-MODE: SCIENTIFIC
          </div>
          <div className="text-[9px] text-primary/40">v2.0.42</div>
        </div>

        <Display value={display} operation={operation} />
        
        <Keypad 
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperation={performOperation}
          onClear={clear}
          onEqual={() => performOperation(null)}
        />

        {plotData && (
          <div className="p-1 border-t border-primary/20">
            <GraphingViewport data={plotData} />
          </div>
        )}

        <History items={history} />

        {/* Footer / Branding */}
        <div className="p-1 px-4 border-t border-primary/10 flex justify-end">
          <span className="text-[8px] text-primary/30 uppercase tracking-[0.4em]">Segmento High-Tech Core</span>
        </div>
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines" />
    </motion.div>
  );
};
