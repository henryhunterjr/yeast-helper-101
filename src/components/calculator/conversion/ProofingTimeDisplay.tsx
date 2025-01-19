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
  } | null;
  temperature: string;
  hydration: string;
}

const ProofingTimeDisplay = ({ 
  fermentationTime, 
  temperature, 
  hydration 
}: ProofingTimeDisplayProps) => {
  if (!fermentationTime) return null;

  return (
    <Card className="p-4 space-y-2 bg-card border border-border">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-foreground">Proofing Time Range</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Estimated fermentation time based on temperature and hydration levels.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-sm">
        <p className="font-semibold text-foreground">
          {fermentationTime.minHours}-{fermentationTime.maxHours} hours
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          At {temperature}°F with {hydration}% hydration
        </p>
      </div>
    </Card>
  );
};

export default ProofingTimeDisplay;