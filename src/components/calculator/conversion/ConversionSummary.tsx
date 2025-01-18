import React from 'react';
import { yeastTypes } from '../../../utils/yeastTypes';

interface ConversionSummaryProps {
  amount: string;
  fromType: string;
  toType: string;
  result: string;
  isLoading?: boolean;
}

const ConversionSummary = ({ 
  amount, 
  fromType, 
  toType, 
  result,
  isLoading = false 
}: ConversionSummaryProps) => {
  const [units, setUnits] = React.useState('metric');

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUnits(settings.units);
    }
  }, []);

  const convertToImperial = (value: string): string => {
    const grams = parseFloat(value);
    if (isNaN(grams)) return '0';
    const ounces = grams / 28.3495;
    return ounces.toFixed(3);
  };

  const displayAmount = units === 'imperial' ? convertToImperial(amount) : amount;
  const displayResult = units === 'imperial' ? convertToImperial(result) : result;
  const unitLabel = units === 'imperial' ? 'oz' : 'g';

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-base sm:text-lg md:text-xl font-mono break-words">
        {displayAmount || '0'}{unitLabel} {yeastTypes[fromType]} =
      </p>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yeast-600 font-mono break-words">
        {displayResult}{unitLabel} {yeastTypes[toType]}
      </p>
    </div>
  );
};

export default ConversionSummary;