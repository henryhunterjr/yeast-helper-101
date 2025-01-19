import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Recipe } from '@/types/recipe';
import { Slider } from "@/components/ui/slider";
import IngredientRow from './IngredientRow';
import StarterSettings from './StarterSettings';

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
  return (
    <div className="space-y-6">
      <div>
        <Label>Flour Weight ({recipe.unit})</Label>
        <Input
          type="number"
          value={recipe.flour || ''}
          onChange={(e) => onFlourChange(e.target.value === '' ? null : Number(e.target.value))}
          min="0"
          step="1"
          placeholder="Enter flour weight"
        />
      </div>

      <div>
        <Label>Target Hydration (%)</Label>
        <div className="space-y-2">
          <Input
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

      <StarterSettings 
        recipe={recipe}
        onStarterChange={onStarterChange}
      />

      <div className="space-y-4">
        <Label>Ingredients</Label>
        {recipe.ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient.id}
            ingredient={ingredient}
            unit={recipe.unit}
            onChangeField={(field, value) => {
              if (field === 'weight') {
                onIngredientChange(ingredient.id, Number(value));
              }
            }}
            onRemove={() => {}}
            isRemovable={false}
          />
        ))}
      </div>

      <div className="flex justify-end">
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