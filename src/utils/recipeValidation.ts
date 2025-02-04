import { Recipe, Ingredient, TYPICAL_RANGES } from '@/types/recipe';
import { calculateBakersPercentage } from './bakersCalculatorHelpers';

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

export const validateRecipe = (recipe: Recipe): string[] => {
  const warnings: string[] = [];

  if (!recipe.flour || recipe.flour <= 0) {
    warnings.push("Flour weight must be greater than 0");
  }

  if (recipe.hydrationTarget) {
    if (recipe.hydrationTarget < TYPICAL_RANGES.hydration.min) {
      warnings.push(`Hydration is too low (minimum ${TYPICAL_RANGES.hydration.min}%)`);
    }
    if (recipe.hydrationTarget > TYPICAL_RANGES.hydration.max) {
      warnings.push(`Hydration is very high (maximum recommended ${TYPICAL_RANGES.hydration.max}%)`);
    }
  }

  if (recipe.starter) {
    if (recipe.starter.weight < 0) {
      warnings.push("Starter weight cannot be negative");
    }
    if (recipe.starter.hydration < 50) {
      warnings.push("Starter hydration should be at least 50%");
    }
    if (recipe.starter.hydration > 200) {
      warnings.push("Starter hydration should not exceed 200%");
    }
  }

  recipe.ingredients.forEach(ingredient => {
    const validation = validateIngredient(ingredient, recipe.flour);
    if (validation.message) {
      warnings.push(validation.message);
    }
  });

  return warnings;
};