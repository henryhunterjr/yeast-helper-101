import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { 
  UnitType,
  YeastType,
  formatMeasurement,
  yeastTypes
} from '@/utils/yeastTypes';

interface ResultDisplayProps {
  amount: string;
  result: string;
  fromType: string;
  toType: string;
  unit: UnitType;
  isSimplified: boolean;
}

const ResultDisplay = ({ 
  amount, 
  result, 
  fromType, 
  toType, 
  unit,
  isSimplified 
}: ResultDisplayProps) => {
  if (!result) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xl font-mono break-words text-foreground">
          {formatMeasurement(parseFloat(amount), unit, fromType as YeastType)} {yeastTypes[fromType as YeastType]} =
        </p>
        <p className="text-3xl font-bold text-foreground font-mono break-words">
          {formatMeasurement(parseFloat(result), unit, toType as YeastType)} {yeastTypes[toType as YeastType]}
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
    </div>
  );
};

export default ResultDisplay;