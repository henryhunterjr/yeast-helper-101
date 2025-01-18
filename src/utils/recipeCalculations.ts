import { Ingredient, Recipe } from '@/types/recipe';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateHydration = (waterWeight: number, flourWeight: number): number => {
  return calculateBakersPercentage(waterWeight, flourWeight);
};

export const convertUnits = (value: number, from: 'g' | 'oz', to: 'g' | 'oz'): number => {
  if (from === to) return value;
  return from === 'g' ? value / 28.35 : value * 28.35;
};

export const validateIngredient = (
  ingredient: Ingredient,
  flourWeight: number
): { isValid: boolean; message?: string } => {
  if (!ingredient.weight || ingredient.weight <= 0) {
    return { isValid: false, message: 'Weight must be greater than 0' };
  }

  const percentage = calculateBakersPercentage(ingredient.weight, flourWeight);

  if (ingredient.name.toLowerCase() === 'water' && percentage > 100) {
    return { isValid: true, message: 'Warning: Hydration exceeds 100%' };
  }

  return { isValid: true };
};