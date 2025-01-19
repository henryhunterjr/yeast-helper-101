import React from 'react';
import YeastCalculatorContainer from './calculator/YeastCalculatorContainer';
import { Card } from "@/components/ui/card";
import { calculateConversion } from '@/utils/yeastCalculations';
import { YeastType } from '@/utils/yeastTypes';

const YeastCalculator = () => {
  const handleConversion = (amount: string, fromType: YeastType, toType: YeastType) => {
    const { result, isSimplified } = calculateConversion(amount, fromType, toType, false);
    return {
      result,
      isSimplified
    };
  };

  return (
    <Card className="p-6">
      <YeastCalculatorContainer onConvert={handleConversion} />
    </Card>
  );
};

export default YeastCalculator;