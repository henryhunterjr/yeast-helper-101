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
    flour: 0,
    ingredients: [
      { id: '1', name: 'Water', weight: 0, percentage: 65 },
      { id: '2', name: 'Salt', weight: 0, percentage: 2 },
      { id: '3', name: 'Starter', weight: 0, percentage: 20 },
    ],
    unit: 'g',
    hydrationTarget: 75,
    starter: {
      weight: 0,
      hydration: 100,
      percentage: 20
    }
  });

  const updateRecipeBasedOnFlour = (flourWeight: number | null) => {
    if (flourWeight === null) {
      setRecipe(prev => ({
        ...prev,
        flour: 0,
        ingredients: prev.ingredients.map(ing => ({
          ...ing,
          weight: 0,
        })),
        starter: {
          ...prev.starter,
          weight: 0,
        }
      }));
      return;
    }

    setRecipe((prev) => {
      const hydrationTarget = prev.hydrationTarget || 75;
      const waterWeight = (flourWeight * hydrationTarget) / 100;
      const saltWeight = (flourWeight * 2) / 100;
      const starterWeight = (flourWeight * 20) / 100;

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

  const updateRecipeBasedOnWater = (waterWeight: number | null) => {
    if (waterWeight === null) {
      setRecipe(prev => ({
        ...prev,
        flour: 0,
        ingredients: prev.ingredients.map(ing => ({
          ...ing,
          weight: 0,
        })),
        starter: {
          ...prev.starter,
          weight: 0,
        }
      }));
      return;
    }

    const hydrationTarget = recipe.hydrationTarget || 75;
    const flourWeight = (waterWeight * 100) / hydrationTarget;
    const saltWeight = (flourWeight * 2) / 100;
    const starterWeight = (flourWeight * 20) / 100;

    setRecipe(prev => ({
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
    }));
  };

  const updateRecipeBasedOnStarter = (weight: number | null, hydration: number) => {
    if (weight === null) {
      setRecipe(prev => ({
        ...prev,
        starter: {
          ...prev.starter,
          weight: 0,
          hydration,
        },
        ingredients: prev.ingredients.map(ing => 
          ing.name === 'Starter' ? { ...ing, weight: 0 } : ing
        ),
      }));
      return;
    }

    const flourWeight = (weight * 100) / 20; // Starter is 20% of flour weight
    const hydrationTarget = recipe.hydrationTarget || 75;
    const waterWeight = (flourWeight * hydrationTarget) / 100;
    const saltWeight = (flourWeight * 2) / 100;

    setRecipe((prev) => ({
      ...prev,
      flour: flourWeight,
      starter: {
        weight,
        hydration,
        percentage: 20
      },
      ingredients: [
        { id: '1', name: 'Water', weight: waterWeight, percentage: hydrationTarget },
        { id: '2', name: 'Salt', weight: saltWeight, percentage: 2 },
        { id: '3', name: 'Starter', weight: weight, percentage: 20 },
      ],
    }));
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
      const waterWeight = prev.flour ? (prev.flour * hydration) / 100 : 0;
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

  const handleIngredientChange = (id: string, weight: number | null) => {
    const ingredient = recipe.ingredients.find(ing => ing.id === id);
    if (!ingredient) return;

    if (ingredient.name === 'Water') {
      updateRecipeBasedOnWater(weight);
    } else if (ingredient.name === 'Starter') {
      updateRecipeBasedOnStarter(weight, recipe.starter?.hydration || 100);
    }
  };

  const handleReset = () => {
    setRecipe({
      flour: 0,
      ingredients: [
        { id: '1', name: 'Water', weight: 0, percentage: 65 },
        { id: '2', name: 'Salt', weight: 0, percentage: 2 },
        { id: '3', name: 'Starter', weight: 0, percentage: 20 },
      ],
      unit: 'g',
      hydrationTarget: 75,
      starter: {
        weight: 0,
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

          <ValidationSystem warnings={[]} />

          <IngredientInputs
            recipe={recipe}
            onFlourChange={updateRecipeBasedOnFlour}
            onIngredientChange={handleIngredientChange}
            onStarterChange={updateRecipeBasedOnStarter}
            onHydrationTargetChange={updateRecipeBasedOnHydration}
            onReset={handleReset}
          />

          <CalculationResults recipe={recipe} />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;