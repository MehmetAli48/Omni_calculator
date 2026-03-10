import { useState, useCallback } from 'react';
import * as math from 'mathjs';

type Operation = '+' | '-' | '*' | '/' | 'sin' | 'cos' | 'tan' | 'log' | 'sqrt' | 'pow' | 'graph' | null;

interface PlotData {
  points: { x: number; y: number }[];
  expression: string;
}

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForNewValue: boolean;
  history: string[];
  plotData: PlotData | null;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
    plotData: null,
  });

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      history: [],
      plotData: null,
    });
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setState(prev => {
      const newDisplay = prev.waitingForNewValue || prev.display === '0' 
        ? digit 
        : prev.display + digit;
      return { 
        ...prev, 
        display: newDisplay,
        waitingForNewValue: false 
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => {
      if (prev.waitingForNewValue) {
        return { ...prev, display: '0.', waitingForNewValue: false };
      }
      if (!prev.display.includes('.')) {
        return { ...prev, display: prev.display + '.' };
      }
      return prev;
    });
  }, []);

  const generatePlotData = (expression: string): PlotData | null => {
    try {
      const compiled = math.compile(expression);
      const points = [];
      for (let x = -10; x <= 10; x += 0.1) {
        try {
          const y = compiled.evaluate({ x });
          if (typeof y === 'number' && !isNaN(y) && isFinite(y)) {
            points.push({ x, y });
          }
        } catch (e) {
          // Skip points where function is undefined
        }
      }
      return { points, expression };
    } catch (e) {
      console.error('Invalid expression for plotting:', e);
      return null;
    }
  };

  const performOperation = useCallback((nextOperation: Operation) => {
    setState(prev => {
      if (nextOperation === 'graph') {
        const plot = generatePlotData(prev.display);
        return {
          ...prev,
          plotData: plot,
          history: [`PLOT: ${prev.display}`, ...prev.history].slice(0, 10),
          waitingForNewValue: true,
        };
      }

      const inputValue = parseFloat(prev.display);

      if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(nextOperation!)) {
        let result = 0;
        try {
          switch (nextOperation) {
            case 'sin': result = math.sin(inputValue); break;
            case 'cos': result = math.cos(inputValue); break;
            case 'tan': result = math.tan(inputValue); break;
            case 'log': result = math.log10(inputValue); break;
            case 'sqrt': result = math.sqrt(inputValue); break;
          }
        } catch (e) {
          return { ...prev, display: 'ERROR', waitingForNewValue: true };
        }
        
        const displayResult = String(Number(result.toFixed(8)));
        return {
          ...prev,
          display: displayResult,
          history: [`${nextOperation}(${inputValue}) = ${displayResult}`, ...prev.history].slice(0, 10),
          waitingForNewValue: true,
        };
      }

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForNewValue: true,
        };
      }

      if (prev.operation) {
        let result = 0;
        const prevValue = prev.previousValue;
        
        try {
          switch (prev.operation) {
            case '+': result = prevValue + inputValue; break;
            case '-': result = prevValue - inputValue; break;
            case '*': result = prevValue * inputValue; break;
            case '/': result = prevValue / inputValue; break;
            case 'pow': result = math.pow(prevValue, inputValue); break;
          }
        } catch (e) {
          return { ...prev, display: 'ERROR', waitingForNewValue: true };
        }

        const displayResult = String(Number(result.toFixed(8)));
        return {
          ...prev,
          display: displayResult,
          previousValue: nextOperation === null ? null : result,
          operation: nextOperation,
          waitingForNewValue: true,
          history: [`${prevValue} ${prev.operation} ${inputValue} = ${displayResult}`, ...prev.history].slice(0, 10),
        };
      }

      return {
        ...prev,
        operation: nextOperation,
        waitingForNewValue: true,
      };
    });
  }, []);

  return {
    display: state.display,
    history: state.history,
    operation: state.operation,
    plotData: state.plotData,
    inputDigit,
    inputDecimal,
    performOperation,
    clear,
  };
};
