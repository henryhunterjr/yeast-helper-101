import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Recipe } from '@/types/recipe';
import UnitToggle from './UnitToggle';
import IngredientInputs from './IngredientInputs';
import CalculationResults from './CalculationResults';
import ValidationSystem from './ValidationSystem';

const MainCalculator = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    flour: 1000,
    ingredients: [
      { id: '1', name: 'Water', weight: 650, percentage: 65 },
      { id: '2', name: 'Salt', weight: 20, percentage: 2 },
      { id: '3', name: 'Yeast', weight: 10, percentage: 1 },
    ],
    unit: 'g'
  });

  const [warnings, setWarnings] = useState<string[]>([]);

  const handleFlourChange = (value: number) => {
    if (value <= 0) return;

    setRecipe((prev) => ({
      ...prev,
      flour: value,
      ingredients: prev.ingredients.map((ing) => ({
        ...ing,
        percentage: (ing.weight / value) * 100,
      })),
    }));
  };

  const handleIngredientChange = (id: string, weight: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) => {
        if (ing.id === id) {
          return {
            ...ing,
            weight,
            percentage: (weight / prev.flour) * 100,
          };
        }
        return ing;
      }),
    }));
  };

  const addIngredient = () => {
    const newIngredient = {
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
    <TooltipProvider>
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
            <UnitToggle
              unit={recipe.unit}
              onChange={(unit) => setRecipe((prev) => ({ ...prev, unit }))}
            />
          </div>

          <ValidationSystem warnings={warnings} />

          <IngredientInputs
            recipe={recipe}
            onFlourChange={handleFlourChange}
            onIngredientChange={handleIngredientChange}
            onAddIngredient={addIngredient}
            onReset={resetCalculator}
          />

          <CalculationResults recipe={recipe} />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;