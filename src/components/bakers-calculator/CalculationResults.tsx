import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { calculateHydration, getTotalWeight } from '@/utils/bakersCalculatorHelpers';

interface CalculationResultsProps {
  recipe: Recipe;
}

const CalculationResults = ({ recipe }: CalculationResultsProps) => {
  const hydration = calculateHydration(
    recipe.ingredients.find(ing => ing.name.toLowerCase() === 'water')?.weight || 0,
    recipe.flour
  );

  const totalWeight = getTotalWeight(recipe);

  const getIngredientPercentages = () => {
    const percentages: { [key: string]: number } = {};
    recipe.ingredients.forEach((ing) => {
      percentages[ing.name] = ing.percentage || 0;
    });
    return percentages;
  };

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
        {Object.entries(getIngredientPercentages()).map(([ingredient, percentage]) => (
          <div key={ingredient} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{ingredient}</span>
            <span className="font-mono">{percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <Label>Total Weight</Label>
        <span className="font-mono">{totalWeight.toFixed(1)} {recipe.unit}</span>
      </div>
    </Card>
  );
};

export default CalculationResults;