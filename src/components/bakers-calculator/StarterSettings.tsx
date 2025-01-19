import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Recipe } from '@/types/recipe';
import { calculateStarterContributions } from '@/utils/bakersCalculatorHelpers';

interface StarterSettingsProps {
  recipe: Recipe;
  onStarterChange: (weight: number | null, hydration: number) => void;
}

const StarterSettings = ({ recipe, onStarterChange }: StarterSettingsProps) => {
  const { flour: flourFromStarter, water: waterFromStarter } = calculateStarterContributions(
    recipe.starter?.weight || 0,
    recipe.starter?.hydration || 100
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Sourdough Starter</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="starter-weight">Weight ({recipe.unit})</Label>
            <Input
              id="starter-weight"
              type="number"
              value={recipe.starter?.weight || ''}
              onChange={(e) => onStarterChange(
                e.target.value === '' ? null : Number(e.target.value),
                recipe.starter?.hydration || 100
              )}
              min="0"
              step="1"
              placeholder="Enter starter weight"
            />
          </div>
          <div>
            <Label htmlFor="starter-hydration">Hydration (%)</Label>
            <Input
              id="starter-hydration"
              type="number"
              value={recipe.starter?.hydration || 100}
              onChange={(e) => onStarterChange(
                recipe.starter?.weight || 0,
                Number(e.target.value)
              )}
              min="50"
              max="200"
              step="1"
            />
          </div>
        </div>
        
        {recipe.starter?.weight && recipe.starter.weight > 0 && (
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-muted-foreground">Starter Contributions:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Flour from Starter</Label>
                <p className="font-mono">{flourFromStarter.toFixed(1)} {recipe.unit}</p>
              </div>
              <div>
                <Label>Water from Starter</Label>
                <p className="font-mono">{waterFromStarter.toFixed(1)} {recipe.unit}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StarterSettings;