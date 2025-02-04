import React from 'react';
import YeastCalculatorContainer from './calculator/YeastCalculatorContainer';
import { Card } from "@/components/ui/card";
import { calculateConversion } from '@/utils/yeastCalculations';
import { YeastType } from '@/utils/yeastTypes';

interface YeastCalculatorProps {}

const YeastCalculator: React.FC<YeastCalculatorProps> = () => {
  const handleConversion = (amount: string, fromType: YeastType, toType: YeastType) => {
    const { result, isSimplified } = calculateConversion(amount, fromType, toType, false);
    return {
      result,
      isSimplified
    };
  };

  return (
    <Card className="p-6">
      <YeastCalculatorContainer />
    </Card>
  );
};

export default YeastCalculator;