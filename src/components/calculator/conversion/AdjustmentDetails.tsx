import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Card } from "@/components/ui/card";

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
}

const AdjustmentDetails = ({
  temperature,
  temperatureAdjustment,
  hydrationAdjustment,
  fermentationTime,
}: AdjustmentDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="font-medium flex items-center gap-2">
        <h3 className="text-lg">Recipe Adjustments</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              These adjustments help optimize your recipe based on temperature and hydration levels.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Temperature Adjustments</h4>
          <p className="text-sm text-gray-600 break-words">
            {temperature}°F: {temperatureAdjustment}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Recommended water temperature: {temperature ? `${Math.round(105 - parseFloat(temperature))}°F` : 'Room temperature'}
          </p>
        </Card>
        
        {hydrationAdjustment?.showAdjustments && (
          <Card className="p-4">
            <h4 className="font-medium mb-2">Hydration Adjustments</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Flour: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</li>
              <li>Water: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</li>
            </ul>
          </Card>
        )}
      </div>
      
      <Card className="p-4">
        <h4 className="font-medium mb-2">Fermentation Time</h4>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">
            {fermentationTime ? `${fermentationTime.minHours.toFixed(1)}-${fermentationTime.maxHours.toFixed(1)} hours` : 'Not available'}
          </p>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
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