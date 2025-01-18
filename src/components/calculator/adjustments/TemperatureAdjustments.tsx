import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TemperatureAdjustmentsProps {
  temperatureAdjustment: string;
  waterTemp: number;
}

const TemperatureAdjustments = ({ temperatureAdjustment, waterTemp }: TemperatureAdjustmentsProps) => {
  return (
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
  );
};

export default TemperatureAdjustments;