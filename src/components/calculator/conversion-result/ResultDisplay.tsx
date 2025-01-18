import React from 'react';
import { 
  convertToTeaspoons, 
  convertGramsToOunces,
  UnitType,
  YeastType,
  yeastTypes
} from '@/utils/yeastTypes';

interface ResultDisplayProps {
  amount: string;
  result: string;
  fromType: string;
  toType: string;
  unit: UnitType;
}

const ResultDisplay = ({ amount, result, fromType, toType, unit }: ResultDisplayProps) => {
  const formatResult = (value: string, unit: UnitType, yeastType: YeastType): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    if (unit === 'tsp') {
      const tspValue = convertToTeaspoons(numValue, yeastType);
      if (tspValue !== null) {
        return `${tspValue.toFixed(2)} tsp`;
      }
    }

    if (unit === 'oz') {
      return `${convertGramsToOunces(numValue).toFixed(2)} oz`;
    }

    return `${numValue.toFixed(2)} g`;
  };

  return (
    <div className="space-y-2">
      <p className="text-xl font-mono break-words text-yeast-700">
        {formatResult(amount, unit, fromType as YeastType)} {yeastTypes[fromType as YeastType]} =
      </p>
      <p className="text-3xl font-bold text-yeast-800 font-mono break-words">
        {formatResult(result, unit, toType as YeastType)} {yeastTypes[toType as YeastType]}
      </p>
    </div>
  );
};

export default ResultDisplay;