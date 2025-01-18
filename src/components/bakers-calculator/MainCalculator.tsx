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

  useEffect(() => {
    updateRecipeBasedOnFlour(recipe.flour);
  }, [recipe.flour]);

  useEffect(() => {
    updateRecipeBasedOnHydration(recipe.hydrationTarget || 75);
  }, [recipe.hydrationTarget]);

  useEffect(() => {
    if (recipe.starter) {
      updateRecipeBasedOnStarter(recipe.starter.weight, recipe.starter.hydration);
    }
  }, [recipe.starter?.weight, recipe.starter?.hydration]);

  const updateRecipeBasedOnFlour = (flourWeight: number) => {
    if (flourWeight <= 0) {
      toast({
        title: "Invalid Input",
        description: "Flour weight must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    setRecipe((prev) => {
      const hydrationTarget = prev.hydrationTarget || 75;
      const waterWeight = (flourWeight * hydrationTarget) / 100;
      const saltWeight = (flourWeight * 2) / 100; // 2% salt
      const starterWeight = (flourWeight * 20) / 100; // 20% starter

      return {
        ...prev,
        flour: flourWeight,
        ingredients: [
          { id: '1', name: 'Water', weight: waterWeight, percentage: hydrationTarget },
          { id: '2', name: 'Salt', weight: saltWeight, percentage: 2 },
          { id: '3', name: 'Starter', weight: starterWeight, percentage: 20 },
        ],
        starter: {
          ...prev.starter,
          weight: starterWeight,
          percentage: 20
        }
      };
    });
  };

  const updateRecipeBasedOnHydration = (hydration: number) => {
    if (hydration < 0 || hydration > 100) {
      toast({
        title: "Invalid Hydration",
        description: "Hydration must be between 0% and 100%",
        variant: "destructive",
      });
      return;
    }

    setRecipe((prev) => {
      const waterWeight = (prev.flour * hydration) / 100;
      return {
        ...prev,
        hydrationTarget: hydration,
        ingredients: prev.ingredients.map((ing) => {
          if (ing.name === 'Water') {
            return {
              ...ing,
              weight: waterWeight,
              percentage: hydration,
            };
          }
          return ing;
        }),
      };
    });
  };

  const updateRecipeBasedOnStarter = (weight: number, hydration: number) => {
    setRecipe((prev) => {
      const starterPercentage = (weight / prev.flour) * 100;
      return {
        ...prev,
        starter: {
          weight,
          hydration,
          percentage: starterPercentage
        },
        ingredients: prev.ingredients.map((ing) => {
          if (ing.name === 'Starter') {
            return {
              ...ing,
              weight,
              percentage: starterPercentage,
            };
          }
          return ing;
        }),
      };
    });
  };

  const handleIngredientChange = (id: string, weight: number) => {
    const ingredient = recipe.ingredients.find(ing => ing.id === id);
    if (!ingredient) return;

    if (ingredient.name === 'Water') {
      const newHydration = (weight / recipe.flour) * 100;
      updateRecipeBasedOnHydration(newHydration);
    } else if (ingredient.name === 'Starter') {
      updateRecipeBasedOnStarter(weight, recipe.starter?.hydration || 100);
    }
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

          <ValidationSystem warnings={[]} />

          <IngredientInputs
            recipe={recipe}
            onFlourChange={updateRecipeBasedOnFlour}
            onIngredientChange={handleIngredientChange}
            onStarterChange={updateRecipeBasedOnStarter}
            onHydrationTargetChange={updateRecipeBasedOnHydration}
          />

          <CalculationResults recipe={recipe} />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;