import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Recipe } from '@/types/recipe';
import PercentageInput from './PercentageInput';
import { Slider } from "@/components/ui/slider";

interface IngredientInputsProps {
  recipe: Recipe;
  onFlourChange: (value: number | null) => void;
  onIngredientChange: (id: string, weight: number | null) => void;
  onStarterChange: (weight: number | null, hydration: number) => void;
  onHydrationTargetChange: (value: number) => void;
  onReset: () => void;
}

const IngredientInputs = ({
  recipe,
  onFlourChange,
  onIngredientChange,
  onStarterChange,
  onHydrationTargetChange,
  onReset,
}: IngredientInputsProps) => {
  const handleFlourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onFlourChange(null);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        onFlourChange(numValue);
      }
    }
  };

  const handleStarterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onStarterChange(null, recipe.starter?.hydration || 100);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        onStarterChange(numValue, recipe.starter?.hydration || 100);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="flour">Flour Weight ({recipe.unit})</Label>
        <Input
          id="flour"
          type="number"
          value={recipe.flour || ''}
          onChange={handleFlourChange}
          min="0"
          step="1"
          placeholder="Enter flour weight"
        />
      </div>

      <div>
        <Label htmlFor="hydration">Target Hydration (%)</Label>
        <div className="space-y-2">
          <Input
            id="hydration"
            type="number"
            value={recipe.hydrationTarget}
            onChange={(e) => onHydrationTargetChange(Number(e.target.value))}
            min="50"
            max="100"
            step="1"
          />
          <Slider
            value={[recipe.hydrationTarget || 75]}
            onValueChange={(value) => onHydrationTargetChange(value[0])}
            min={50}
            max={100}
            step={1}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Starter Settings</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="starter-weight">Weight ({recipe.unit})</Label>
              <Input
                id="starter-weight"
                type="number"
                value={recipe.starter?.weight || ''}
                onChange={handleStarterChange}
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
                value={recipe.starter?.hydration}
                onChange={(e) => onStarterChange(recipe.starter?.weight || 0, Number(e.target.value))}
                min="50"
                max="200"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {recipe.ingredients.map((ingredient) => (
            <PercentageInput
              key={ingredient.id}
              name={ingredient.name}
              weight={ingredient.weight}
              unit={recipe.unit}
              percentage={ingredient.percentage || 0}
              flourWeight={recipe.flour}
              onChange={(weight) => onIngredientChange(ingredient.id, weight)}
              readOnly={!ingredient.isCustom}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default IngredientInputs;