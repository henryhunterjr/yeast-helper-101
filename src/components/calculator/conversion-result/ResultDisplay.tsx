import React from 'react';
import { 
  convertToTeaspoons, 
  convertGramsToOunces,
  UnitType,
  YeastType,
  formatMeasurement
} from '@/utils/yeastTypes';

interface ResultDisplayProps {
  amount: string;
  result: string;
  fromType: string;
  toType: string;
  unit: UnitType;
}

const ResultDisplay = ({ amount, result, fromType, toType, unit }: ResultDisplayProps) => {
  const formatValue = (value: string, yeastType: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    switch (unit) {
      case 'tsp':
        const tspValue = convertToTeaspoons(numValue, yeastType as YeastType);
        return tspValue !== null ? `${tspValue.toFixed(2)} tsp` : `${numValue.toFixed(2)} g`;
      case 'oz':
        return `${convertGramsToOunces(numValue).toFixed(2)} oz`;
      default:
        return `${numValue.toFixed(2)} g`;
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xl font-mono break-words text-yeast-700">
        {formatValue(amount, fromType)} {fromType} =
      </p>
      <p className="text-3xl font-bold text-yeast-800 font-mono break-words">
        {formatValue(result, toType)} {toType}
      </p>
    </div>
  );
};

export default ResultDisplay;