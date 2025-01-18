import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Recipe } from '@/types/recipe';
import UnitToggle from './UnitToggle';
import IngredientInputs from './IngredientInputs';
import CalculationResults from './CalculationResults';
import ValidationSystem from './ValidationSystem';
import { useToast } from "@/hooks/use-toast";

const MainCalculator = () => {
  const { toast } = useToast();
  const [recipe, setRecipe] = useState<Recipe>({
    flour: 1000,
    ingredients: [
      { id: '1', name: 'Water', weight: 650, percentage: 65 },
      { id: '2', name: 'Salt', weight: 20, percentage: 2 },
      { id: '3', name: 'Starter', weight: 200, percentage: 20 },
    ],
    unit: 'g',
    hydrationTarget: 75,
    starter: {
      weight: 200,
      hydration: 100,
      percentage: 20
    }
  });

  const [warnings, setWarnings] = useState<string[]>([]);

  const handleFlourChange = (value: number) => {
    if (value <= 0) {
      toast({
        title: "Invalid Input",
        description: "Flour weight must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    setRecipe((prev) => {
      const newRecipe = {
        ...prev,
        flour: value,
        ingredients: prev.ingredients.map((ing) => ({
          ...ing,
          percentage: (ing.weight / value) * 100,
        })),
      };

      if (prev.starter) {
        newRecipe.starter = {
          ...prev.starter,
          percentage: (prev.starter.weight / value) * 100,
        };
      }

      return newRecipe;
    });
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

  const handleStarterChange = (weight: number, hydration: number) => {
    setRecipe((prev) => ({
      ...prev,
      starter: {
        weight,
        hydration,
        percentage: (weight / prev.flour) * 100,
      },
      ingredients: prev.ingredients.map((ing) => {
        if (ing.name === 'Starter') {
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

  const handleHydrationTargetChange = (value: number) => {
    if (value < 0 || value > 100) {
      toast({
        title: "Invalid Hydration",
        description: "Hydration must be between 0% and 100%",
        variant: "destructive",
      });
      return;
    }

    setRecipe((prev) => {
      const waterWeight = (prev.flour * value) / 100;
      return {
        ...prev,
        hydrationTarget: value,
        ingredients: prev.ingredients.map((ing) => {
          if (ing.name === 'Water') {
            return {
              ...ing,
              weight: waterWeight,
              percentage: value,
            };
          }
          return ing;
        }),
      };
    });
  };

  const resetCalculator = () => {
    setRecipe({
      flour: 1000,
      ingredients: [
        { id: '1', name: 'Water', weight: 650, percentage: 65 },
        { id: '2', name: 'Salt', weight: 20, percentage: 2 },
        { id: '3', name: 'Starter', weight: 200, percentage: 20 },
      ],
      unit: 'g',
      hydrationTarget: 75,
      starter: {
        weight: 200,
        hydration: 100,
        percentage: 20
      }
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
            onStarterChange={handleStarterChange}
            onHydrationTargetChange={handleHydrationTargetChange}
            onReset={resetCalculator}
          />

          <CalculationResults recipe={recipe} />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;