import { Ingredient, Recipe, TYPICAL_RANGES, UNIT_CONVERSION } from '@/types/recipe';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateHydration = (waterWeight: number, flourWeight: number): number => {
  return calculateBakersPercentage(waterWeight, flourWeight);
};

export const convertUnits = (value: number, from: 'g' | 'oz', to: 'g' | 'oz'): number => {
  if (from === to) return value;
  const factor = from === 'g' ? UNIT_CONVERSION.gToOz : UNIT_CONVERSION.ozToG;
  return Number((value * factor).toFixed(2));
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
  if (name === 'yeast' && (percentage < TYPICAL_RANGES.yeast.min || percentage > TYPICAL_RANGES.yeast.max)) {
    return { isValid: true, message: TYPICAL_RANGES.yeast.warning };
  }

  return { isValid: true };
};

export const getTotalWeight = (recipe: Recipe): number => {
  return recipe.flour + recipe.ingredients.reduce((sum, ing) => sum + ing.weight, 0);
};

export const scaleRecipe = (recipe: Recipe, newFlourWeight: number): Recipe => {
  const scaleFactor = newFlourWeight / recipe.flour;
  return {
    ...recipe,
    flour: newFlourWeight,
    ingredients: recipe.ingredients.map(ing => ({
      ...ing,
      weight: Number((ing.weight * scaleFactor).toFixed(2)),
      percentage: ing.percentage, // Percentages stay the same
    })),
  };
};