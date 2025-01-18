import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { UnitType, YeastType } from '@/utils/yeastTypes';
import HydrationAdjustments from './adjustments/HydrationAdjustments';
import TemperatureAdjustments from './adjustments/TemperatureAdjustments';
import ResultDisplay from './conversion-result/ResultDisplay';
import ActionButtons from './conversion-result/ActionButtons';
import ProofingTimeDisplay from './conversion-result/ProofingTimeDisplay';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  fermentationTime?: {
    minHours: number;
    maxHours: number;
  } | null;
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
  onReset
}: ConversionResultProps) => {
  const waterTemp = Math.round(105 - parseFloat(temperature));

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-yeast-50 to-yeast-100 border-2 border-yeast-200 shadow-lg transition-all hover:shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-yeast-800">Conversion Result</h3>
          <ActionButtons
            onReset={onReset}
            fromType={fromType}
            toType={toType}
            amount={amount}
            temperature={temperature}
            result={result}
          />
        </div>
        <ResultDisplay
          amount={amount}
          result={result}
          fromType={fromType}
          toType={toType}
          unit={unit}
        />
      </Card>

      {hydrationAdjustment?.showAdjustments && (
        <HydrationAdjustments 
          hydrationAdjustment={hydrationAdjustment}
          hydration={hydration}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TemperatureAdjustments
          temperatureAdjustment={temperatureAdjustment}
          waterTemp={waterTemp}
        />

        {fermentationTime && (
          <ProofingTimeDisplay
            fermentationTime={fermentationTime}
            temperature={temperature}
            hydration={hydration}
          />
        )}
      </div>
    </div>
  );
};

export default ConversionResult;
