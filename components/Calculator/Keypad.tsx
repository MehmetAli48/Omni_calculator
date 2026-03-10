'use client';

import React from 'react';
import { Button } from './Button';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onOperation: (op: any) => void;
  onDecimal: () => void;
  onClear: () => void;
  onEqual: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ 
  onDigit, 
  onOperation, 
  onDecimal, 
  onClear, 
  onEqual 
}) => {
  return (
    <div className="grid grid-cols-4 bg-black/40">
      {/* Function Row */}
      <Button label="CLR" onClick={onClear} variant="accent" className="border-r" />
      <Button label="x" onClick={() => onDigit('x')} variant="primary" className="border-r" />
      <Button label="log" onClick={() => onOperation('log')} variant="primary" className="border-r" />
      <Button label="GRAPH" onClick={() => onOperation('graph')} variant="primary" className="bg-primary !text-black" />

      {/* Scientific Row */}
      <Button label="sin" onClick={() => onOperation('sin')} variant="primary" className="border-r" />
      <Button label="cos" onClick={() => onOperation('cos')} variant="primary" className="border-r" />
      <Button label="tan" onClick={() => onOperation('tan')} variant="primary" className="border-r" />
      <Button label="/" onClick={() => onOperation('/')} variant="primary" />

      {/* Number Grid */}
      <Button label="7" onClick={() => onDigit('7')} className="border-r" />
      <Button label="8" onClick={() => onDigit('8')} className="border-r" />
      <Button label="9" onClick={() => onDigit('9')} className="border-r" />
      <Button label="*" onClick={() => onOperation('*')} variant="primary" />

      <Button label="4" onClick={() => onDigit('4')} className="border-r" />
      <Button label="5" onClick={() => onDigit('5')} className="border-r" />
      <Button label="6" onClick={() => onDigit('6')} className="border-r" />
      <Button label="-" onClick={() => onOperation('-')} variant="primary" />

      <Button label="1" onClick={() => onDigit('1')} className="border-r" />
      <Button label="2" onClick={() => onDigit('2')} className="border-r" />
      <Button label="3" onClick={() => onDigit('3')} className="border-r" />
      <Button label="+" onClick={() => onOperation('+')} variant="primary" />

      <Button label="0" onClick={() => onDigit('0')} span={2} className="col-span-2 border-r" />
      <Button label="." onClick={onDecimal} className="border-r" />
      <Button label="EXE" onClick={onEqual} variant="primary" className="bg-primary/20" />
    </div>
  );
};
