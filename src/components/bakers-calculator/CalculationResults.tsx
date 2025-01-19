import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Recipe } from '@/types/recipe';
import { getTotalWeight } from '@/utils/recipeCalculations';

interface CalculationResultsProps {
  recipe: Recipe;
}

const CalculationResults = ({ recipe }: CalculationResultsProps) => {
  const totalWeight = getTotalWeight(recipe);
  const totalHydration = recipe.hydrationTarget || 0;

  return (
    <Card className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Total Recipe Weight</Label>
          <p className="font-mono text-lg">{totalWeight.toFixed(1)} {recipe.unit}</p>
        </div>
        <div>
          <Label>Total Hydration</Label>
          <p className="font-mono text-lg">{totalHydration.toFixed(1)}%</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Ingredient Breakdown</Label>
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{ingredient.name}</span>
            <div className="flex items-center gap-4">
              <span className="font-mono">{ingredient.weight.toFixed(1)} {recipe.unit}</span>
              <span className="font-mono text-muted-foreground w-16 text-right">
                {ingredient.percentage?.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CalculationResults;