import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
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
    <Card className="p-4 space-y-4 bg-card border border-border">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm text-foreground">General Water Temp Guide</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This is a general recommendation for water temperature, suitable for most baking scenarios.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-lg font-semibold text-foreground">{waterTemp}°F</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm text-foreground">Custom Water Temp for This Recipe</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This temperature is dynamically calculated based on your recipe inputs, such as room temperature, hydration, and fermentation needs.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {(parseFloat(roomTemp) + 20).toFixed(1)}°F
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WaterTempDisplay;