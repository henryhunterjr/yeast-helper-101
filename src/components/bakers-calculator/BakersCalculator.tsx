import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { TooltipProvider, TooltipContent, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";
import { Plus, HelpCircle } from 'lucide-react';
import { Recipe, Ingredient } from '@/types/recipe';
import { 
  calculateHydration,
  getTotalWeight,
} from '@/utils/bakersCalculatorHelpers';
import UnitToggle from './UnitToggle';
import PercentageInput from './PercentageInput';
import ResultsDisplay from './ResultsDisplay';

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
  const [totalWeight, setTotalWeight] = useState<number>(0);

  useEffect(() => {
    const waterIngredient = recipe.ingredients.find(
      (ing) => ing.name.toLowerCase() === 'water'
    );
    if (waterIngredient) {
      setHydration(calculateHydration(waterIngredient.weight, recipe.flour));
    }
    setTotalWeight(getTotalWeight(recipe));
  }, [recipe]);

  const handleFlourChange = (value: number) => {
    if (value <= 0) {
      return;
    }

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

  const getIngredientPercentages = () => {
    const percentages: { [key: string]: number } = {};
    recipe.ingredients.forEach((ing) => {
      percentages[ing.name] = ing.percentage || 0;
    });
    return percentages;
  };

  return (
    <TooltipProvider>
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Baker's percentages are calculated relative to the total flour weight (100%).</p>
                  <p className="mt-2">Typical ranges:</p>
                  <ul className="list-disc ml-4 mt-1">
                    <li>Water: 50-100%</li>
                    <li>Salt: 1.5-2.5%</li>
                    <li>Yeast: 0.5-2%</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </div>
            <UnitToggle
              unit={recipe.unit}
              onChange={(unit) => setRecipe((prev) => ({ ...prev, unit }))}
            />
          </div>

          <div className="space-y-4">
            <div>
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

            <ResultsDisplay
              percentages={getIngredientPercentages()}
              hydration={hydration}
              totalWeight={totalWeight}
              unit={recipe.unit}
            />

            <div className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <PercentageInput
                  key={ingredient.id}
                  name={ingredient.name}
                  weight={ingredient.weight}
                  unit={recipe.unit}
                  percentage={ingredient.percentage || 0}
                  flourWeight={recipe.flour}
                  onChange={(weight) => handleIngredientChange(ingredient.id, weight)}
                  readOnly={!ingredient.isCustom}
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
    </TooltipProvider>
  );
};

export default BakersCalculator;