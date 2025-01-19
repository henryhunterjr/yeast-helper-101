import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Recipe } from '@/types/recipe';
import { calculateStarterContributions } from '@/utils/bakersCalculatorHelpers';

interface StarterCalculationsProps {
  recipe: Recipe;
}

const StarterCalculations = ({ recipe }: StarterCalculationsProps) => {
  if (!recipe.starter?.weight) return null;

  const { flour: flourFromStarter, water: waterFromStarter } = calculateStarterContributions(
    recipe.starter.weight,
    recipe.starter.hydration
  );

  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Flour from Starter</Label>
          <p className="font-mono text-lg">{flourFromStarter.toFixed(1)} {recipe.unit}</p>
        </div>
        <div>
          <Label>Water from Starter</Label>
          <p className="font-mono text-lg">{waterFromStarter.toFixed(1)} {recipe.unit}</p>
        </div>
        <div>
          <Label>Starter Weight</Label>
          <p className="font-mono text-lg">{recipe.starter.weight.toFixed(1)} {recipe.unit}</p>
        </div>
        <div>
          <Label>Starter Hydration</Label>
          <p className="font-mono text-lg">{recipe.starter.hydration}%</p>
        </div>
      </div>
    </Card>
  );
};

export default StarterCalculations;