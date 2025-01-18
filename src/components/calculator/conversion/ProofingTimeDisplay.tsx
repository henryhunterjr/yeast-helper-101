import React from 'react';
import { Card } from "@/components/ui/card";
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFermentationTimeRange } from '@/utils/yeastTypes';

interface ProofingTimeDisplayProps {
  temperature: string;
  hydration: string;
}

const ProofingTimeDisplay = ({ temperature, hydration }: ProofingTimeDisplayProps) => {
  const temp = parseFloat(temperature);
  const hyd = parseFloat(hydration);
  
  const { minHours, maxHours } = getFermentationTimeRange(temp, hyd);

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
              Proofing time is adjusted based on room temperature and dough hydration.
              Higher temperatures and hydration levels generally result in faster proofing.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="text-sm text-gray-700">
        <p className="font-semibold">
          {minHours}-{maxHours} hours
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Based on {hydration}% hydration at {temperature}°F
        </p>
      </div>
    </Card>
  );
};

export default ProofingTimeDisplay;