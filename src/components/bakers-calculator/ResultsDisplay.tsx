import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface ResultsDisplayProps {
  percentages: { [ingredient: string]: number };
  hydration: number;
  totalWeight: number;
  unit: 'g' | 'oz';
}

const ResultsDisplay = ({ percentages, hydration, totalWeight, unit }: ResultsDisplayProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Hydration</Label>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Hydration is the ratio of water weight to flour weight</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="font-mono">{hydration.toFixed(1)}%</span>
      </div>

      <div className="space-y-2">
        <Label>Ingredient Percentages</Label>
        {Object.entries(percentages).map(([ingredient, percentage]) => (
          <div key={ingredient} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{ingredient}</span>
            <span className="font-mono">{percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <Label>Total Weight</Label>
        <span className="font-mono">{totalWeight.toFixed(1)} {unit}</span>
      </div>
    </Card>
  );
};

export default ResultsDisplay;