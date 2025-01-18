import React from 'react';
import { 
  UnitType,
  YeastType,
  formatMeasurement,
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
  return (
    <div className="space-y-2">
      <p className="text-xl font-mono break-words text-yeast-700">
        {formatMeasurement(parseFloat(amount), unit, fromType as YeastType)} {yeastTypes[fromType as YeastType]} =
      </p>
      <p className="text-3xl font-bold text-yeast-800 font-mono break-words">
        {formatMeasurement(parseFloat(result), unit, toType as YeastType)} {yeastTypes[toType as YeastType]}
      </p>
    </div>
  );
};

export default ResultDisplay;