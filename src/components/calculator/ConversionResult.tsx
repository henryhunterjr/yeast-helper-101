import React from 'react';
import { Card } from "@/components/ui/card";
import { calculateWaterTemperature } from '@/utils/yeastCalculations';
import ActionButtons from './conversion-result/ActionButtons';
import ResultDisplay from './conversion-result/ResultDisplay';
import AdjustmentDetails from './conversion/AdjustmentDetails';
import ProofingTimeDisplay from './conversion/ProofingTimeDisplay';
import WaterTempDisplay from './conversion/WaterTempDisplay';
import { UnitType, YeastType } from '@/utils/yeastTypes';

interface ConversionResultProps {
  amount: string;
  fromType: YeastType;
  toType: YeastType;
  temperature: string;
  hydration: string;
  result: string;
  temperatureAdjustment: string;
  hydrationAdjustment: any;
  fermentationTime: any;
  isLoading: boolean;
  unit: UnitType;
  onReset: () => void;
}

const ConversionResult = ({
  amount,
  fromType,
  toType,
  temperature,
  hydration,
  result,
  temperatureAdjustment,
  hydrationAdjustment,
  fermentationTime,
  isLoading,
  unit,
  onReset,
}: ConversionResultProps) => {
  console.group('ConversionResult Render');
  console.log('Props:', {
    amount,
    fromType,
    toType,
    temperature,
    hydration,
    result
  });

  const waterTemp = calculateWaterTemperature(parseFloat(temperature), fromType);
  console.log('Calculated Water Temperature:', waterTemp);
  console.groupEnd();

  return (
    <div className="space-y-6">
      <ResultDisplay
        amount={amount}
        fromType={fromType}
        toType={toType}
        result={result}
        unit={unit}
      />

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
      />

      <ActionButtons onReset={onReset} />
    </div>
  );
};

export default ConversionResult;