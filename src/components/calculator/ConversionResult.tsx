import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import WaterTempDisplay from './conversion/WaterTempDisplay';
import ProofingTimeDisplay from './conversion/ProofingTimeDisplay';
import AdjustmentDetails from './conversion/AdjustmentDetails';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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
  isSimplified?: boolean;
  starterStrength?: 'strong' | 'moderate' | 'weak';
}

const ConversionResult: React.FC<ConversionResultProps> = ({
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
  isSimplified = false,
}) => {
  if (!amount || !result) return null;

  const waterTemp = parseFloat(temperature) + 20;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xl font-mono break-words">
          {amount} {unit} {fromType} =
        </p>
        <p className="text-3xl font-bold font-mono break-words">
          {result} {unit} {toType}
        </p>
      </div>

      {isSimplified && (
        <Alert>
          <InfoCircledIcon className="h-4 w-4" />
          <AlertDescription>
            For small amounts (14g or less), active dry and instant yeast can be used interchangeably at a 1:1 ratio.
          </AlertDescription>
        </Alert>
      )}

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

export default ConversionResult;