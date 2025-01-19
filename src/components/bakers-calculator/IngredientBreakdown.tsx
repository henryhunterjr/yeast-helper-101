import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface IngredientBreakdownProps {
  calculations: {
    water: number;
    starter: number;
    salt: number;
    flourFromStarter: number;
    waterFromStarter: number;
  };
  unit: 'g' | 'oz';
}

const IngredientBreakdown = ({ calculations, unit }: IngredientBreakdownProps) => {
  const formatNumber = (value: number): string => {
    return value.toFixed(unit === 'g' ? 1 : 2);
  };

  const showHydrationWarning = calculations.water > calculations.flourFromStarter;

  if (!calculations.water && !calculations.starter && !calculations.salt) {
    return (
      <Card className="p-4 space-y-4">
        <Label className="text-lg font-semibold">Ingredient Breakdown</Label>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <div>
        <Label className="text-lg font-semibold">Ingredient Breakdown</Label>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span>Water</span>
            <div className="flex items-center gap-2">
              <span>{formatNumber(calculations.water)} {unit}</span>
              {showHydrationWarning && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>High hydration detected. This may result in a very wet dough.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <span>Starter</span>
            <span>{formatNumber(calculations.starter)} {unit}</span>
          </div>
          
          <div className="pl-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>• Flour from Starter</span>
              <span>{formatNumber(calculations.flourFromStarter)} {unit}</span>
            </div>
            <div className="flex justify-between">
              <span>• Water from Starter</span>
              <span>{formatNumber(calculations.waterFromStarter)} {unit}</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span>Salt</span>
            <span>{formatNumber(calculations.salt)} {unit}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IngredientBreakdown;