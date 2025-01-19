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
  if (!starterWeight) return { flour: 0, water: 0 };
  
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
  const starterWeight = recipe.starter?.weight || 0;
  return recipe.flour + recipe.ingredients.reduce((sum, ing) => sum + ing.weight, 0) + starterWeight;
};

export const recalculateRecipe = (recipe: Recipe, changedIngredientId?: string): Recipe => {
  const updatedRecipe = { ...recipe };
  const waterIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'water');
  const saltIngredient = recipe.ingredients.find(ing => ing.name.toLowerCase() === 'salt');
  const starterContributions = calculateStarterContributions(
    recipe.starter?.weight || 0,
    recipe.starter?.hydration || 100
  );

  // Adjust flour and water based on starter contributions
  const totalFlour = updatedRecipe.flour + starterContributions.flour;
  const totalWater = (waterIngredient?.weight || 0) + starterContributions.water;

  // Calculate target water based on hydration
  const targetWater = calculateWaterFromFlour(totalFlour, recipe.hydrationTarget || 75);

  // Update water ingredient
  if (waterIngredient) {
    waterIngredient.weight = Math.max(0, targetWater - starterContributions.water);
    waterIngredient.percentage = calculateBakersPercentage(waterIngredient.weight, totalFlour);
  }

  // Update salt based on total flour
  if (saltIngredient) {
    saltIngredient.weight = calculateSaltFromFlour(totalFlour);
    saltIngredient.percentage = calculateBakersPercentage(saltIngredient.weight, totalFlour);
  }

  // Update all ingredient percentages
  updatedRecipe.ingredients = updatedRecipe.ingredients.map(ing => ({
    ...ing,
    percentage: calculateBakersPercentage(ing.weight, totalFlour)
  }));

  if (recipe.starter) {
    recipe.starter.percentage = calculateBakersPercentage(recipe.starter.weight, totalFlour);
  }

  return updatedRecipe;
};