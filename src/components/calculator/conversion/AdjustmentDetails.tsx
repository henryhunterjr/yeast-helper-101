import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface AdjustmentDetailsProps {
  temperature: string;
  temperatureAdjustment: string;
  hydrationAdjustment?: {
    flourAdjustment: number;
    waterAdjustment: number;
    showAdjustments: boolean;
  };
  fermentationTime: string;
}

const AdjustmentDetails = ({
  temperature,
  temperatureAdjustment,
  hydrationAdjustment,
  fermentationTime,
}: AdjustmentDetailsProps) => {
  return (
    <div className="text-sm text-gray-600">
      <div className="font-medium flex items-center gap-2">
        Adjustments
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
      
      <ul className="list-disc pl-4 mt-2 space-y-2">
        <li className="break-words">
          Temperature ({temperature}°F): {temperatureAdjustment}
          <div className="text-xs text-gray-500 mt-1">
            Recommended water temperature: {temperature ? `${Math.round(105 - parseFloat(temperature))}°F` : 'Room temperature'}
          </div>
        </li>
        
        {hydrationAdjustment?.showAdjustments && (
          <li>
            <div className="flex items-center gap-2">
              Recipe Adjustments
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    When converting to/from sourdough starter, you need to adjust your recipe's flour and water to account for the starter's hydration.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Adjust flour by: {hydrationAdjustment.flourAdjustment.toFixed(1)}g</li>
              <li>Adjust water by: {hydrationAdjustment.waterAdjustment.toFixed(1)}g</li>
            </ul>
          </li>
        )}
        
        <li>
          <div className="flex items-center gap-2">
            Estimated fermentation time
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
          <div className="text-sm font-medium text-yeast-600">
            {fermentationTime}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdjustmentDetails;