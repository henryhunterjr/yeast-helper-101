
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
      <Card className="p-4 space-y-4 bg-white/50 dark:bg-gray-900/50">
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
    <Card className="p-4 space-y-4 bg-white/50 dark:bg-gray-900/50 shadow-md">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Ingredient Breakdown</Label>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Water</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-white">{formatNumber(calculations.water)} {unit}</span>
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
            <span className="text-gray-900 dark:text-white">Starter</span>
            <span className="text-gray-900 dark:text-white">{formatNumber(calculations.starter)} {unit}</span>
          </div>
          
          <div className="pl-4 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300 font-medium">• Flour from Starter</span>
              <span className="text-gray-600 dark:text-gray-300">{formatNumber(calculations.flourFromStarter)} {unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300 font-medium">• Water from Starter</span>
              <span className="text-gray-600 dark:text-gray-300">{formatNumber(calculations.waterFromStarter)} {unit}</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-900 dark:text-white">Salt</span>
            <span className="text-gray-900 dark:text-white">{formatNumber(calculations.salt)} {unit}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IngredientBreakdown;
