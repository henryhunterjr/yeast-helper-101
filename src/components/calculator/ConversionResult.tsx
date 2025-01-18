import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { yeastTypes } from '@/utils/yeastCalculations';
import { saveFavorite } from '@/utils/favoritesStorage';

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
}: ConversionResultProps) => {
  const { toast } = useToast();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

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

  const waterTemp = Math.round(105 - parseFloat(temperature));

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
            {amount}g {yeastTypes[fromType]} =
          </p>
          <p className="text-3xl font-bold text-yeast-800 font-mono break-words animate-in fade-in-50 duration-300">
            {result}g {yeastTypes[toType]}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Temperature Adjustments</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Temperature affects fermentation speed. Adjustments help maintain optimal conditions.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-sm text-gray-700">
            <p className="font-semibold">{temperatureAdjustment}</p>
            <p className="text-xs text-gray-500 mt-1">
              Recommended water temperature: {waterTemp}°F
            </p>
          </div>
        </Card>

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

      {hydrationAdjustment?.showAdjustments && (
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Hydration Adjustments</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Adjustments needed to maintain proper hydration when converting to/from sourdough starter.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-sm text-gray-700">
            <p>Flour Adjustment: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</p>
            <p>Water Adjustment: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConversionResult;