import React from 'react';
import { Card } from "@/components/ui/card";
import { formatMeasurement, YeastType, UnitType } from '@/utils/yeastTypes';

interface ConversionSummaryProps {
  amount: number;
  fromType: YeastType;
  toType: YeastType;
  result: number;
  unit: UnitType;
}

const ConversionSummary = ({ 
  amount, 
  fromType, 
  toType, 
  result,
  unit
}: ConversionSummaryProps) => {
  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {formatMeasurement(amount, unit, fromType)} of {fromType} yeast equals:
        </p>
        <p className="text-xl font-semibold text-green-600">
          {formatMeasurement(result, unit, toType)} of {toType} yeast
        </p>
      </div>
    </Card>
  );
};

export default ConversionSummary;