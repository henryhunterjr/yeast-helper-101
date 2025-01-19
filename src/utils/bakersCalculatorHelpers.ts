import { Recipe, Ingredient, TYPICAL_RANGES, UNIT_CONVERSION } from '@/types/recipe';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateHydration = (waterWeight: number, flourWeight: number): number => {
  return calculateBakersPercentage(waterWeight, flourWeight);
};

export const calculateFlourFromWater = (waterWeight: number, hydration: number): number => {
  return (waterWeight * 100) / hydration;
};

export const calculateWaterFromFlour = (flourWeight: number, hydration: number): number => {
  return (flourWeight * hydration) / 100;
};

export const calculateSaltFromFlour = (flourWeight: number, saltPercentage: number = 2): number => {
  return (flourWeight * saltPercentage) / 100;
};

export const calculateStarterContributions = (
  starterWeight: number,
  starterHydration: number
): { flour: number; water: number } => {
  const totalParts = 1 + starterHydration / 100;
  const flourPart = 1 / totalParts;
  
  const flourContribution = starterWeight * flourPart;
  const waterContribution = starterWeight * (1 - flourPart);

  return {
    flour: flourContribution,
    water: waterContribution,
  };
};

export const validateIngredient = (
  ingredient: Ingredient,
  flourWeight: number
): { isValid: boolean; message?: string } => {
  if (!ingredient.weight || ingredient.weight <= 0) {
    return { isValid: false, message: 'Weight must be greater than 0' };
  }

  const percentage = calculateBakersPercentage(ingredient.weight, flourWeight);
  const name = ingredient.name.toLowerCase();

  if (name === 'water' && (percentage < TYPICAL_RANGES.water.min || percentage > TYPICAL_RANGES.water.max)) {
    return { isValid: true, message: TYPICAL_RANGES.water.warning };
  }
  if (name === 'salt' && (percentage < TYPICAL_RANGES.salt.min || percentage > TYPICAL_RANGES.salt.max)) {
    return { isValid: true, message: TYPICAL_RANGES.salt.warning };
  }
  if (name === 'starter' && (percentage < TYPICAL_RANGES.starter.min || percentage > TYPICAL_RANGES.starter.max)) {
    return { isValid: true, message: TYPICAL_RANGES.starter.warning };
  }

  return { isValid: true };
};

export const getTotalWeight = (recipe: Recipe): number => {
  return recipe.flour + recipe.ingredients.reduce((sum, ing) => sum + ing.weight, 0) + 
    (recipe.starter?.weight || 0);
};

export const convertUnits = (value: number, from: 'g' | 'oz', to: 'g' | 'oz'): number => {
  if (from === to) return value;
  const factor = from === 'g' ? UNIT_CONVERSION.gToOz : UNIT_CONVERSION.ozToG;
  return Number((value * factor).toFixed(2));
};

export const recalculateRecipe = (recipe: Recipe, changedIngredientId?: string): Recipe => {
  const updatedRecipe = { ...recipe };
  const waterIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'water');
  const saltIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'salt');

  // If water weight changed, recalculate flour based on hydration
  if (changedIngredientId === waterIngredient?.id && waterIngredient.weight) {
    updatedRecipe.flour = calculateFlourFromWater(waterIngredient.weight, recipe.hydrationTarget || 75);
  }
  // If flour changed or was calculated, update other ingredients
  else if (updatedRecipe.flour) {
    if (waterIngredient) {
      waterIngredient.weight = calculateWaterFromFlour(updatedRecipe.flour, recipe.hydrationTarget || 75);
    }
    if (saltIngredient) {
      saltIngredient.weight = calculateSaltFromFlour(updatedRecipe.flour);
    }
  }

  // Update all ingredient percentages
  updatedRecipe.ingredients = updatedRecipe.ingredients.map(ing => ({
    ...ing,
    percentage: calculateBakersPercentage(ing.weight, updatedRecipe.flour)
  }));

  return updatedRecipe;
};