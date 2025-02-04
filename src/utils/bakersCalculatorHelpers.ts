import { Recipe } from '@/types/recipe';
import { calculateStarterContributions } from './starterCalculations';
import { calculateWaterFromHydration, calculateFlourFromWaterAndHydration } from './hydrationCalculations';
import { validateRecipe } from './recipeValidation';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateSaltFromFlour = (flourWeight: number, saltPercentage: number = 2): number => {
  return (flourWeight * saltPercentage) / 100;
};

export const getTotalWeight = (recipe: Recipe): number => {
  const starterWeight = recipe.starter?.weight || 0;
  return recipe.flour + recipe.ingredients.reduce((sum, ing) => sum + ing.weight, 0) + starterWeight;
};

export const recalculateRecipe = (recipe: Recipe, updatedIngredientId?: string): Recipe => {
  const updatedRecipe = { ...recipe };
  const waterIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'water');
  const saltIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'salt');
  
  const starterContributions = calculateStarterContributions(
    recipe.starter?.weight || 0,
    recipe.starter?.hydration || 100
  );

  const totalFlour = updatedRecipe.flour + starterContributions.flour;

  updatedRecipe.ingredients = updatedRecipe.ingredients.map(ing => ({
    ...ing,
    percentage: calculateBakersPercentage(ing.weight, totalFlour)
  }));

  if (recipe.starter) {
    recipe.starter.percentage = calculateBakersPercentage(recipe.starter.weight, totalFlour);
  }

  if (waterIngredient && recipe.hydrationTarget && updatedIngredientId !== waterIngredient.id) {
    const targetTotalWater = calculateWaterFromHydration(totalFlour, recipe.hydrationTarget);
    waterIngredient.weight = Math.max(0, targetTotalWater - starterContributions.water);
    waterIngredient.percentage = calculateBakersPercentage(waterIngredient.weight, totalFlour);
  }

  if (saltIngredient && updatedIngredientId !== saltIngredient.id) {
    saltIngredient.weight = calculateSaltFromFlour(totalFlour);
    saltIngredient.percentage = calculateBakersPercentage(saltIngredient.weight, totalFlour);
  }

  return updatedRecipe;
};

export { calculateStarterContributions, calculateWaterFromHydration, calculateFlourFromWaterAndHydration, validateRecipe };