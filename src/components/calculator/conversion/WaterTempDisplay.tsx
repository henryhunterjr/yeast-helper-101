import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface WaterTempDisplayProps {
  roomTemp: string;
  flourTemp?: string;
  starterTemp?: string;
  desiredDoughTemp?: string;
}

const WaterTempDisplay = ({ 
  roomTemp, 
  flourTemp = roomTemp, 
  starterTemp = roomTemp,
  desiredDoughTemp = "72"
}: WaterTempDisplayProps) => {
  const calculateWaterTemp = () => {
    const desired = parseFloat(desiredDoughTemp);
    const room = parseFloat(roomTemp);
    const flour = parseFloat(flourTemp);
    const starter = parseFloat(starterTemp);
    
    return Math.round((desired * 4) - (flour + room + starter));
  };

  const waterTemp = calculateWaterTemp();

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
              Water temperature is calculated to achieve your desired dough temperature,
              taking into account room, flour, and starter temperatures.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="text-sm text-gray-700">
        <p>Use {waterTemp}°F water</p>
        <p className="text-xs text-gray-500 mt-1">
          For {desiredDoughTemp}°F final dough temperature
        </p>
      </div>
    </Card>
  );
};

export default WaterTempDisplay;