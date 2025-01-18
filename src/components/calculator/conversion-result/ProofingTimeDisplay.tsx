import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProofingTimeDisplayProps {
  fermentationTime: {
    minHours: number;
    maxHours: number;
  };
  temperature: string;
  hydration: string;
}

const ProofingTimeDisplay = ({ 
  fermentationTime, 
  temperature, 
  hydration 
}: ProofingTimeDisplayProps) => {
  return (
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
  );
};

export default ProofingTimeDisplay;