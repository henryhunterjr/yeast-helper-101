import { Recipe, Ingredient, TYPICAL_RANGES } from '@/types/recipe';

export const calculateBakersPercentage = (ingredientWeight: number, flourWeight: number): number => {
  if (!flourWeight) return 0;
  return (ingredientWeight / flourWeight) * 100;
};

export const calculateHydration = (waterWeight: number, flourWeight: number): number => {
  return calculateBakersPercentage(waterWeight, flourWeight);
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

export const calculateSaltFromFlour = (flourWeight: number, saltPercentage: number = 2): number => {
  return (flourWeight * saltPercentage) / 100;
};

export const calculateStarterFromFlour = (flourWeight: number, starterPercentage: number = 20): number => {
  return (flourWeight * starterPercentage) / 100;
};

export const calculateFlourFromWaterAndHydration = (waterWeight: number, hydration: number): number => {
  return (waterWeight * 100) / hydration;
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

export const calculateRecipeFromStarter = (
  starterWeight: number,
  starterHydration: number,
  targetHydration: number
): Recipe => {
  const { flour: flourFromStarter, water: waterFromStarter } = calculateStarterContributions(
    starterWeight,
    starterHydration
  );

  const totalFlour = flourFromStarter * 5; // Assuming starter is 20% of total flour
  const targetWater = calculateWaterFromHydration(totalFlour, targetHydration);
  const mainFlour = totalFlour - flourFromStarter;
  const mainWater = targetWater - waterFromStarter;
  const salt = calculateSaltFromFlour(totalFlour);

  return {
    flour: mainFlour,
    unit: 'g',
    hydrationTarget: targetHydration,
    ingredients: [
      { id: 'water', name: 'Water', weight: mainWater, percentage: (mainWater / totalFlour) * 100 },
      { id: 'salt', name: 'Salt', weight: salt, percentage: (salt / totalFlour) * 100 }
    ],
    starter: {
      weight: starterWeight,
      hydration: starterHydration,
      percentage: (starterWeight / totalFlour) * 100
    }
  };
};

export const validateRecipe = (recipe: Recipe): string[] => {
  const warnings: string[] = [];

  // Validate flour weight
  if (!recipe.flour || recipe.flour <= 0) {
    warnings.push("Flour weight must be greater than 0");
  }

  // Validate hydration target
  if (recipe.hydrationTarget) {
    if (recipe.hydrationTarget < TYPICAL_RANGES.hydration.min) {
      warnings.push(`Hydration is too low (minimum ${TYPICAL_RANGES.hydration.min}%)`);
    }
    if (recipe.hydrationTarget > TYPICAL_RANGES.hydration.max) {
      warnings.push(`Hydration is very high (maximum recommended ${TYPICAL_RANGES.hydration.max}%)`);
    }
  }

  // Validate starter
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

  // Validate ingredients
  recipe.ingredients.forEach(ingredient => {
    const validation = validateIngredient(ingredient, recipe.flour);
    if (validation.message) {
      warnings.push(validation.message);
    }
  });

  return warnings;
};
