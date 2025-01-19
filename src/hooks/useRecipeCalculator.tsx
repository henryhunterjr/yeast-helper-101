import { useState, useCallback, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { v4 as uuidv4 } from 'uuid';
import { 
  recalculateRecipe,
  calculateRecipeFromStarter,
  validateRecipe
} from '@/utils/bakersCalculatorHelpers';

const createInitialRecipe = (): Recipe => ({
  flour: 0,
  unit: 'g',
  hydrationTarget: 75,
  ingredients: [
    { id: uuidv4(), name: 'Water', weight: 0, percentage: 0 },
    { id: uuidv4(), name: 'Salt', weight: 0, percentage: 0 },
  ],
});

export const useRecipeCalculator = () => {
  const [recipe, setRecipe] = useState<Recipe>(createInitialRecipe());

  const validationErrors = useMemo(() => {
    return validateRecipe(recipe);
  }, [recipe]);

  const updateRecipeBasedOnFlour = useCallback((flourWeight: number | null) => {
    setRecipe(prev => {
      const updatedRecipe = {
        ...prev,
        flour: flourWeight || 0,
      };
      return recalculateRecipe(updatedRecipe);
    });
  }, []);

  const updateRecipeBasedOnIngredient = useCallback((id: string, weight: number | null) => {
    setRecipe(prev => {
      const updatedRecipe = {
        ...prev,
        ingredients: prev.ingredients.map(ing =>
          ing.id === id ? { ...ing, weight: weight || 0 } : ing
        ),
      };
      return recalculateRecipe(updatedRecipe, id);
    });
  }, []);

  const updateRecipeBasedOnStarter = useCallback((weight: number | null, hydration: number) => {
    if (!weight) {
      setRecipe(prev => ({
        ...prev,
        starter: undefined
      }));
      return;
    }

    setRecipe(prev => {
      if (!prev.flour) {
        return calculateRecipeFromStarter(weight, hydration, prev.hydrationTarget || 75);
      }
      
      const updatedRecipe = {
        ...prev,
        starter: { weight, hydration }
      };
      return recalculateRecipe(updatedRecipe);
    });
  }, []);

  const updateRecipeBasedOnHydration = useCallback((hydration: number) => {
    setRecipe(prev => {
      const updatedRecipe = {
        ...prev,
        hydrationTarget: hydration,
      };
      return recalculateRecipe(updatedRecipe);
    });
  }, []);

  const handleReset = useCallback(() => {
    setRecipe(createInitialRecipe());
  }, []);

  return {
    recipe,
    validationErrors,
    updateRecipeBasedOnFlour,
    updateRecipeBasedOnIngredient,
    updateRecipeBasedOnStarter,
    updateRecipeBasedOnHydration,
    handleReset,
  };
};