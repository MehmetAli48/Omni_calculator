'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'accent' | 'primary' | 'ghost';
  className?: string;
  span?: number;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'default', 
  className = '',
  span = 1 
}) => {
  const variants = {
    default: 'bg-surface/40 hover:bg-surface/80 border-border text-primary/60 hover:text-primary',
    accent: 'bg-accent/10 hover:bg-accent/30 border-accent/40 text-accent',
    primary: 'bg-primary/10 hover:bg-primary/30 border-primary/40 text-primary',
    ghost: 'bg-transparent hover:bg-white/5 border-transparent text-primary/40'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={onClick}
      className={`
        relative h-14 flex items-center justify-center text-sm font-bold tracking-widest
        border-t border-l transition-colors duration-100 uppercase
        ${variants[variant]}
        ${span > 1 ? `col-span-${span}` : ''}
        ${className}
      `}
      style={{
        boxShadow: variant !== 'default' ? 'inset 0 0 10px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      {/* Corner Detail */}
      <div className="absolute top-0 right-0 w-1 h-1 bg-black/20" />
      
      {label}

      {/* Hover Light Reflection */}
      <div className="absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-br from-white to-transparent pointer-events-none transition-opacity" />
    </motion.button>
  );
};
