import React from 'react';
import { Card } from "@/components/ui/card";
import { tspToGramConversion, YeastType } from '@/utils/yeastTypes';

interface ConversionSummaryProps {
  amount: number;
  fromType: YeastType;
  toType: YeastType;
  result: number;
  useTeaspoons: boolean;
}

const ConversionSummary = ({ 
  amount, 
  fromType, 
  toType, 
  result, 
  useTeaspoons 
}: ConversionSummaryProps) => {
  const formatMeasurement = (value: number, type: YeastType) => {
    if (!useTeaspoons || type === 'sourdough') {
      return `${value.toFixed(2)}g`;
    }
    const tsp = value / tspToGramConversion[type];
    return `${tsp.toFixed(1)} tsp (${value.toFixed(2)}g)`;
  };

  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {formatMeasurement(amount, fromType)} of {fromType} yeast equals:
        </p>
        <p className="text-xl font-semibold text-green-600">
          {formatMeasurement(result, toType)} of {toType} yeast
        </p>
      </div>
    </Card>
  );
};

export default ConversionSummary;