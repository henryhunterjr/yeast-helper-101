import React from 'react';
import { yeastTypes } from '../../../utils/yeastCalculations';

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
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
      <p className="text-base sm:text-lg font-mono break-words">
        {amount || '0'}g {yeastTypes[fromType]} =
      </p>
      <p className="text-xl sm:text-2xl font-bold text-yeast-600 font-mono break-words">
        {result}g {yeastTypes[toType]}
      </p>
    </div>
  );
};

export default ConversionSummary;