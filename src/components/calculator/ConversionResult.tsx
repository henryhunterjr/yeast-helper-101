
import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import WaterTempDisplay from './conversion/WaterTempDisplay';
import ProofingTimeDisplay from './conversion/ProofingTimeDisplay';
import AdjustmentDetails from './conversion/AdjustmentDetails';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";

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
  const waterTemp = parseFloat(temperature) + 20;
  const resultId = React.useId();

  return (
    <Card 
      className="mt-4 sm:mt-8 p-4 sm:p-6 bg-card dark:bg-gray-800/50 backdrop-blur-sm border border-border dark:border-gray-700 shadow-lg transition-all duration-200 ease-in-out"
      role="region"
      aria-label="Conversion Result"
      tabIndex={0}
    >
      {(!amount || !result) ? (
        <div 
          className="space-y-4 animate-pulse"
          role="status"
          aria-label="Loading conversion result"
        >
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div 
            className="space-y-2"
            role="region"
            aria-labelledby={resultId}
          >
            <p 
              id={resultId}
              className="text-lg sm:text-xl font-mono text-gray-700 dark:text-gray-300 break-words"
              aria-label={`Converting ${amount} ${unit} of ${fromType}`}
            >
              {amount} {unit} {fromType} =
            </p>
            <p 
              className="text-2xl sm:text-3xl font-bold font-mono text-primary dark:text-primary break-words"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {result} {unit} {toType}
            </p>
          </div>

          {isSimplified && (
            <Alert 
              className="bg-card dark:bg-gray-800/80"
              role="note"
            >
              <InfoCircledIcon className="h-4 w-4" aria-hidden="true" />
              <AlertDescription>
                For small amounts (14g or less), active dry and instant yeast can be used interchangeably at a 1:1 ratio.
              </AlertDescription>
            </Alert>
          )}

          <AdjustmentDetails
            temperature={temperature}
            temperatureAdjustment={temperatureAdjustment}
            hydrationAdjustment={{
              flourAdjustment: parseFloat(result) / 2,
              waterAdjustment: parseFloat(result) / 2,
              showAdjustments: toType === 'sourdough'
            }}
            fermentationTime={fermentationTime}
            fromType={fromType}
            toType={toType}
            result={result}
          />
        </div>
      )}
    </Card>
  );
};

export default ConversionResult;
