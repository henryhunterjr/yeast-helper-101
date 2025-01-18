import React from 'react';
import { Card } from "@/components/ui/card";
import ProofingTimeDisplay from './conversion/ProofingTimeDisplay';
import WaterTempDisplay from './conversion/WaterTempDisplay';
import { yeastTypes } from '@/utils/yeastCalculations';

interface ConversionResultProps {
  amount: string;
  fromType: string;
  toType: string;
  temperature: string;
  hydration: string;
  result: string;
  temperatureAdjustment: string;
  hydrationAdjustment?: {
    flourAdjustment: number;
    waterAdjustment: number;
    showAdjustments: boolean;
  };
  isLoading: boolean;
}

const ConversionResult = ({
  amount,
  fromType,
  toType,
  temperature,
  hydration,
  result,
  hydrationAdjustment,
  isLoading,
}: ConversionResultProps) => {
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!amount || parseFloat(amount) === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-medium mb-2">Conversion Result</h3>
        <p className="text-lg">
          {amount}g {yeastTypes[fromType as keyof typeof yeastTypes]} = {result}g {yeastTypes[toType as keyof typeof yeastTypes]}
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ProofingTimeDisplay 
          temperature={temperature} 
          hydration={hydration}
        />
        
        <WaterTempDisplay 
          roomTemp={temperature}
        />
      </div>

      {hydrationAdjustment?.showAdjustments && (
        <Card className="p-4">
          <h3 className="font-medium mb-2">Hydration Adjustments</h3>
          <div className="space-y-1">
            <p>Flour Adjustment: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</p>
            <p>Water Adjustment: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConversionResult;