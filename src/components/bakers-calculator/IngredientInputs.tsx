import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import PercentageInput from './PercentageInput';

interface IngredientInputsProps {
  recipe: Recipe;
  onFlourChange: (value: number) => void;
  onIngredientChange: (id: string, weight: number) => void;
  onAddIngredient: () => void;
  onReset: () => void;
}

const IngredientInputs = ({
  recipe,
  onFlourChange,
  onIngredientChange,
  onAddIngredient,
  onReset,
}: IngredientInputsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="flour">Flour Weight ({recipe.unit})</Label>
        <Input
          id="flour"
          type="number"
          value={recipe.flour}
          onChange={(e) => onFlourChange(Number(e.target.value))}
          min="0"
          step="1"
        />
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

      <Button
        onClick={onAddIngredient}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Ingredient
      </Button>

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