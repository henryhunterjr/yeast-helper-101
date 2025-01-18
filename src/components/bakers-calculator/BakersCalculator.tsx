import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from 'lucide-react';
import { Recipe, Ingredient, DEFAULT_PERCENTAGES } from '@/types/recipe';
import { calculateBakersPercentage, calculateHydration, validateIngredient } from '@/utils/recipeCalculations';
import IngredientRow from './IngredientRow';
import UnitToggle from './UnitToggle';

const BakersCalculator = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    flour: 1000,
    ingredients: [
      { id: '1', name: 'Water', weight: 650, percentage: 65 },
      { id: '2', name: 'Salt', weight: 20, percentage: 2 },
      { id: '3', name: 'Yeast', weight: 10, percentage: 1 },
    ],
    unit: 'g'
  });

  const [hydration, setHydration] = useState<number>(65);

  useEffect(() => {
    const waterIngredient = recipe.ingredients.find(
      (ing) => ing.name.toLowerCase() === 'water'
    );
    if (waterIngredient) {
      setHydration(calculateHydration(waterIngredient.weight, recipe.flour));
    }
  }, [recipe]);

  const handleFlourChange = (value: number) => {
    if (value <= 0) {
      toast({
        title: "Invalid flour weight",
        description: "Flour weight must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    setRecipe((prev) => ({
      ...prev,
      flour: value,
      ingredients: prev.ingredients.map((ing) => ({
        ...ing,
        percentage: calculateBakersPercentage(ing.weight, value),
      })),
    }));
  };

  const handleIngredientChange = (id: string, field: 'name' | 'weight', value: string | number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) => {
        if (ing.id === id) {
          const updatedIng = {
            ...ing,
            [field]: value,
          };
          if (field === 'weight') {
            updatedIng.percentage = calculateBakersPercentage(Number(value), prev.flour);
          }
          return updatedIng;
        }
        return ing;
      }),
    }));
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: '',
      weight: 0,
      percentage: 0,
      isCustom: true,
    };

    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
  };

  const removeIngredient = (id: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const resetCalculator = () => {
    setRecipe({
      flour: 1000,
      ingredients: [
        { id: '1', name: 'Water', weight: 650, percentage: 65 },
        { id: '2', name: 'Salt', weight: 20, percentage: 2 },
        { id: '3', name: 'Yeast', weight: 10, percentage: 1 },
      ],
      unit: 'g'
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
          <UnitToggle
            unit={recipe.unit}
            onChange={(unit) => setRecipe((prev) => ({ ...prev, unit }))}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="flour">Flour Weight ({recipe.unit})</Label>
              <Input
                id="flour"
                type="number"
                value={recipe.flour}
                onChange={(e) => handleFlourChange(Number(e.target.value))}
                min="0"
                step="1"
              />
            </div>
            <div className="flex-1">
              <Label>Hydration</Label>
              <Input
                type="number"
                value={hydration.toFixed(1)}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <IngredientRow
                key={ingredient.id}
                ingredient={ingredient}
                unit={recipe.unit}
                onChangeField={(field, value) => 
                  handleIngredientChange(ingredient.id, field, value)
                }
                onRemove={() => removeIngredient(ingredient.id)}
                isRemovable={ingredient.isCustom}
              />
            ))}
          </div>

          <Button
            onClick={addIngredient}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Ingredient
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={resetCalculator}
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BakersCalculator;