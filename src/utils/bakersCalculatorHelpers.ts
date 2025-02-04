import { Recipe, Ingredient } from '@/types/recipe';

export const calculateBakersPercentage = (weight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (weight / flourWeight) * 100;
};

export const validateIngredient = (ingredient: Ingredient, flourWeight: number) => {
  const messages = [];
  
  if (ingredient.weight < 0) {
    messages.push("Weight cannot be negative");
  }
  
  if (ingredient.name.toLowerCase() === 'water' && ingredient.percentage! > 100) {
    messages.push("High hydration detected");
  }

  return {
    isValid: messages.length === 0,
    message: messages.join(", ")
  };
};

export const calculateStarterContributions = (
  starterWeight: number,
  starterHydration: number
): { flour: number; water: number } => {
  if (!starterWeight) return { flour: 0, water: 0 };
  
  const totalParts = 1 + (starterHydration / 100);
  const flourPart = 1 / totalParts;
  
  const flourContribution = starterWeight * flourPart;
  const waterContribution = starterWeight * (1 - flourPart);

  return {
    flour: flourContribution,
    water: waterContribution,
  };
};

export const calculateWaterFromHydration = (flourWeight: number, hydration: number): number => {
  return (flourWeight * hydration) / 100;
};

export const calculateSaltFromFlour = (flourWeight: number, percentage: number = 2): number => {
  return (flourWeight * percentage) / 100;
};

export const recalculateRecipe = (recipe: Recipe, changedIngredientId?: string): Recipe => {
  const flourWeight = recipe.flour || 0;
  
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(ing => ({
      ...ing,
      percentage: calculateBakersPercentage(ing.weight, flourWeight)
    }))
  };
};

export const calculateRecipeFromStarter = (
  starterWeight: number,
  starterHydration: number,
  targetHydration: number
): Recipe => {
  const { flour: flourFromStarter } = calculateStarterContributions(starterWeight, starterHydration);
  const totalFlour = flourFromStarter * 5;
  const water = calculateWaterFromHydration(totalFlour, targetHydration);
  const salt = calculateSaltFromFlour(totalFlour);

  return {
    flour: totalFlour,
    unit: 'g',
    hydrationTarget: targetHydration,
    ingredients: [
      { id: 'water', name: 'Water', weight: water, percentage: targetHydration },
      { id: 'salt', name: 'Salt', weight: salt, percentage: 2 }
    ],
    starter: {
      weight: starterWeight,
      hydration: starterHydration
    }
  };
};

export const validateRecipe = (recipe: Recipe): string[] => {
  const warnings: string[] = [];

  if (!recipe.flour || recipe.flour <= 0) {
    warnings.push("Flour weight must be greater than 0");
  }

  if (recipe.hydrationTarget) {
    if (recipe.hydrationTarget < 50) {
      warnings.push("Hydration is too low (minimum 50%)");
    }
    if (recipe.hydrationTarget > 100) {
      warnings.push("Hydration is very high (maximum recommended 100%)");
    }
  }

  return warnings;
};