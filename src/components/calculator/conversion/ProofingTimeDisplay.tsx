import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { calculateFermentationTime } from '@/utils/yeastCalculations';

interface ProofingTimeDisplayProps {
  temperature: string;
  hydration: string;
}

const ProofingTimeDisplay = ({ temperature, hydration }: ProofingTimeDisplayProps) => {
  const temp = parseFloat(temperature);
  const hyd = parseFloat(hydration);
  
  const { minHours, maxHours } = calculateFermentationTime(temp, hyd);
  
  const getTemperatureMessage = () => {
    const baseTemp = 72;
    if (Math.abs(temp - baseTemp) < 3) return "";
    
    const difference = temp > baseTemp ? "faster" : "slower";
    const percentage = Math.abs(Math.round(((temp - baseTemp) / baseTemp) * 100));
    
    return ` (${difference} at ${temp}°F)`;
  };

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
        <p>
          {minHours}-{maxHours} hours{getTemperatureMessage()}
        </p>
        {hydration && (
          <p className="text-xs text-gray-500 mt-1">
            Based on {hydration}% hydration at {temperature}°F
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProofingTimeDisplay;