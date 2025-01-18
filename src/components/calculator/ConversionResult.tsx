import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  convertToTeaspoons, 
  convertGramsToOunces,
  UnitType,
  YeastType,
  yeastTypes
} from '@/utils/yeastTypes';
import { saveFavorite } from '@/utils/favoritesStorage';
import HydrationAdjustments from './adjustments/HydrationAdjustments';
import TemperatureAdjustments from './adjustments/TemperatureAdjustments';
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
  unit
}: ConversionResultProps) => {
  const { toast } = useToast();
  const waterTemp = Math.round(105 - parseFloat(temperature));

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const getUnitAbbreviation = (unit: UnitType) => {
    switch (unit) {
      case 'tsp':
        return 'tsp';
      case 'oz':
        return 'oz';
      default:
        return 'g';
    }
  };

  const formatResult = (value: string, unit: UnitType, yeastType: YeastType): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    let displayValue: number;
    switch (unit) {
      case 'tsp':
        const tspValue = convertToTeaspoons(numValue, yeastType);
        displayValue = tspValue ?? numValue;
        break;
      case 'oz':
        displayValue = convertGramsToOunces(numValue);
        break;
      default:
        displayValue = numValue;
    }
    
    return `${displayValue.toFixed(2)} ${getUnitAbbreviation(unit)}`;
  };

  const handleSave = () => {
    try {
      saveFavorite({
        fromType,
        toType,
        amount: parseFloat(amount),
        temperature: parseFloat(temperature),
        result: parseFloat(result),
      });
      toast({
        title: "Saved!",
        description: "Conversion has been added to your favorites.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save conversion.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-yeast-50 to-yeast-100 border-2 border-yeast-200 shadow-lg transition-all hover:shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-yeast-800">Conversion Result</h3>
          <Button 
            onClick={handleSave}
            variant="secondary"
            className="gap-2 hover:bg-yeast-200"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-mono break-words text-yeast-700">
            {formatResult(amount, unit, fromType as YeastType)} {yeastTypes[fromType as YeastType]} =
          </p>
          <p className="text-3xl font-bold text-yeast-800 font-mono break-words">
            {formatResult(result, unit, toType as YeastType)} {yeastTypes[toType as YeastType]}
          </p>
        </div>
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
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Proofing Time Range</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Estimated fermentation time based on temperature and hydration levels.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">
                {fermentationTime.minHours}-{fermentationTime.maxHours} hours
              </p>
              <p className="text-xs text-gray-500 mt-1">
                At {temperature}°F with {hydration}% hydration
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConversionResult;