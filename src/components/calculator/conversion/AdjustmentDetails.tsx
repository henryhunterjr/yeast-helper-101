
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { calculateWaterTemperature } from '@/utils/yeastCalculations';
import { YeastType } from '@/utils/yeastTypes';

interface AdjustmentDetailsProps {
  temperature: string;
  temperatureAdjustment: string;
  hydrationAdjustment?: {
    flourAdjustment: number;
    waterAdjustment: number;
    showAdjustments: boolean;
  };
  fermentationTime: {
    minHours: number;
    maxHours: number;
  } | null;
  fromType: YeastType;
  toType?: YeastType;
  result?: string;
}

const AdjustmentDetails = ({
  temperature,
  temperatureAdjustment,
  hydrationAdjustment,
  fermentationTime,
  fromType,
  toType,
  result,
}: AdjustmentDetailsProps) => {
  const waterTemp = calculateWaterTemperature(parseFloat(temperature), fromType);
  const starterAmount = parseFloat(result || '0');
  const showSourdoughAdjustments = toType === 'sourdough' && !isNaN(starterAmount);

  const flourInStarter = starterAmount / 2;
  const waterInStarter = starterAmount / 2;

  return (
    <div className="space-y-4">
      <div className="font-medium flex items-center gap-2">
        <h3 className="text-lg text-foreground">Recipe Adjustments</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              These adjustments help optimize your recipe based on temperature, hydration, and starter composition.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 bg-card border border-border">
          <h4 className="font-medium mb-2 text-foreground">Temperature Adjustments</h4>
          <p className="text-sm text-foreground break-words">
            {temperature}°F: {temperatureAdjustment}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Recommended water temperature: {waterTemp}°F
          </p>
        </Card>
        
        {showSourdoughAdjustments ? (
          <Card className="p-4 bg-card border border-border">
            <h4 className="font-medium mb-2 text-foreground">Sourdough Starter Adjustment</h4>
            <p className="text-sm text-foreground mb-2">
              {starterAmount.toFixed(1)}g starter ({flourInStarter.toFixed(1)}g flour + {waterInStarter.toFixed(1)}g water)
            </p>
            <div className="space-y-2">
              <p className="text-sm text-foreground">Recipe adjustments needed:</p>
              <ul className="text-sm text-foreground space-y-1 list-disc pl-4">
                <li>Reduce flour by {flourInStarter.toFixed(1)}g</li>
                <li>Reduce water by {waterInStarter.toFixed(1)}g</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This maintains proper hydration when using 100% hydration starter
            </p>
          </Card>
        ) : hydrationAdjustment?.showAdjustments && (
          <Card className="p-4 bg-card border border-border">
            <h4 className="font-medium mb-2 text-foreground">Hydration Adjustments</h4>
            <ul className="text-sm text-foreground space-y-1">
              <li>Flour: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</li>
              <li>Water: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</li>
            </ul>
          </Card>
        )}
      </div>
      
      <Card className="p-4 bg-card border border-border">
        <h4 className="font-medium mb-2 text-foreground">Fermentation Time</h4>
        <div className="flex items-center gap-2">
          <p className="text-sm text-foreground">
            {fermentationTime ? `${fermentationTime.minHours.toFixed(1)}-${fermentationTime.maxHours.toFixed(1)} hours` : 'Not available'}
          </p>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                This is an approximate range based on temperature and hydration. Watch your dough for actual readiness.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default AdjustmentDetails;
