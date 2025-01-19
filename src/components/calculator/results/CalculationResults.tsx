import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import WaterTempDisplay from '../conversion/WaterTempDisplay';
import ProofingTimeDisplay from '../conversion/ProofingTimeDisplay';
import AdjustmentDetails from '../conversion/AdjustmentDetails';

interface CalculationResultsProps {
  amount: string;
  fromType: YeastType;
  toType: YeastType;
  temperature: string;
  hydration: string;
  result: string;
  temperatureAdjustment: string;
  hydrationAdjustment: any;
  fermentationTime: any;
  unit: UnitType;
  onReset: () => void;
}

const CalculationResults = ({
  amount,
  fromType,
  toType,
  temperature,
  hydration,
  result,
  temperatureAdjustment,
  hydrationAdjustment,
  fermentationTime,
  unit,
  onReset,
}: CalculationResultsProps) => {
  const waterTemp = parseFloat(temperature) + 20; // Simple calculation for demo

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <WaterTempDisplay roomTemp={temperature} waterTemp={waterTemp} />
        <ProofingTimeDisplay
          fermentationTime={fermentationTime}
          temperature={temperature}
          hydration={hydration}
        />
      </div>

      <AdjustmentDetails
        temperature={temperature}
        temperatureAdjustment={temperatureAdjustment}
        hydrationAdjustment={hydrationAdjustment}
        fermentationTime={fermentationTime}
        fromType={fromType}
      />
    </div>
  );
};

export default CalculationResults;