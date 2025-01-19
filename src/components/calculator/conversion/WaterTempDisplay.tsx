import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WaterTempDisplayProps {
  roomTemp: string;
  waterTemp: number;
}

const WaterTempDisplay = ({ roomTemp, waterTemp }: WaterTempDisplayProps) => {
  return (
    <Card className="p-4 space-y-2 border border-border">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-foreground">Recommended Water Temperature</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Water temperature is calculated to achieve optimal dough temperature,
              taking into account room temperature.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="text-sm">
        <p className="font-semibold text-foreground">{waterTemp}°F</p>
        <p className="mt-1 text-xs text-muted-foreground">
          For optimal dough temperature at {roomTemp}°F room temperature
        </p>
      </div>
    </Card>
  );
};

export default WaterTempDisplay;