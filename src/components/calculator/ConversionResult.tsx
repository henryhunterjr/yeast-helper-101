import React from 'react';
import { yeastTypes } from '../../utils/yeastCalculations';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

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
  isLoading?: boolean;
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
  isLoading = false
}: ConversionResultProps) => {
  if (isLoading) {
    return (
      <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Calculating...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getFermentationTime = () => {
    const temp = parseFloat(temperature);
    const hyd = parseFloat(hydration);
    
    if (isNaN(temp) || isNaN(hyd)) return "Standard fermentation time (4-8 hours)";
    
    let baseTime = 6; // Base time in hours
    const tempFactor = Math.pow(2, (temp - 72) / 10);
    baseTime /= tempFactor;
    const hydrationFactor = 1 + (hyd - 100) / 100;
    baseTime /= hydrationFactor;
    
    const minTime = Math.round(baseTime * 0.75);
    const maxTime = Math.round(baseTime * 1.25);
    
    return `${minTime}-${maxTime} hours`;
  };

  return (
    <div className="bg-yeast-50 p-4 sm:p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-base sm:text-lg">Conversion Result</h3>
      <div className="space-y-4">
        <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
          <p className="text-base sm:text-lg font-mono break-words">
            {amount || '0'}g {yeastTypes[fromType]} =
          </p>
          <p className="text-xl sm:text-2xl font-bold text-yeast-600 font-mono break-words">
            {result}g {yeastTypes[toType]}
          </p>
        </div>
        
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
                {getFermentationTime()}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;