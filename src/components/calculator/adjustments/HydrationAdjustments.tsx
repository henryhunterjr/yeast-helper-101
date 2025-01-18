import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HydrationAdjustmentsProps {
  hydrationAdjustment: {
    flourAdjustment: number;
    waterAdjustment: number;
    showAdjustments: boolean;
  };
  hydration: string;
}

const HydrationAdjustments = ({ hydrationAdjustment, hydration }: HydrationAdjustmentsProps) => {
  if (!hydrationAdjustment?.showAdjustments) return null;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Hydration Adjustments</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Required flour and water adjustments for {hydration}% hydration starter
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-medium">
          Flour: {hydrationAdjustment.flourAdjustment > 0 ? '+' : ''}
          {hydrationAdjustment.flourAdjustment.toFixed(1)}g
        </p>
        <p className="font-medium">
          Water: {hydrationAdjustment.waterAdjustment > 0 ? '+' : ''}
          {hydrationAdjustment.waterAdjustment.toFixed(1)}g
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Based on {hydration}% hydration starter
        </p>
      </div>
    </Card>
  );
};

export default HydrationAdjustments;