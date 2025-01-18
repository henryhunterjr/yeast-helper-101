import { Recipe, Ingredient, TYPICAL_RANGES } from '@/types/recipe';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateHydration = (waterWeight: number, flourWeight: number): number => {
  return calculateBakersPercentage(waterWeight, flourWeight);
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

  // Check against typical ranges
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
  return recipe.flour + recipe.ingredients.reduce((sum, ing) => sum + ing.weight, 0);
};

export const calculateWaterFromHydration = (flour: number, hydration: number): number => {
  return (flour * hydration) / 100;
};

export const calculateFlourFromHydration = (water: number, hydration: number): number => {
  return (water * 100) / hydration;
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

export const convertUnits = (value: number, from: 'g' | 'oz', to: 'g' | 'oz'): number => {
  if (from === to) return value;
  const GRAMS_TO_OUNCES = 0.03527396;
  const OUNCES_TO_GRAMS = 28.3495;
  
  const factor = from === 'g' ? GRAMS_TO_OUNCES : OUNCES_TO_GRAMS;
  return Number((value * factor).toFixed(2));
};