import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getWaterTemperature } from '@/utils/yeastTypes';

interface WaterTempDisplayProps {
  roomTemp: string;
}

const WaterTempDisplay = ({ roomTemp }: WaterTempDisplayProps) => {
  const temp = parseFloat(roomTemp);
  const waterTemp = getWaterTemperature(temp);

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Recommended Water Temperature</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Water temperature is calculated to achieve optimal dough temperature,
              taking into account room temperature.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="text-sm text-gray-700">
        <p className="font-semibold">{waterTemp}°F</p>
        <p className="text-xs text-gray-500 mt-1">
          For optimal dough temperature
        </p>
      </div>
    </Card>
  );
};

export default WaterTempDisplay;