import { Recipe } from '@/types/recipe';

export const validateIngredient = (ingredient: { 
  id: string;
  name: string;
  weight: number;
  percentage: number;
}, flourWeight: number) => {
  const messages = [];
  
  if (ingredient.weight < 0) {
    messages.push("Weight cannot be negative");
  }
  
  if (ingredient.name.toLowerCase() === 'water' && ingredient.percentage > 100) {
    messages.push("High hydration detected");
  }

  return {
    isValid: messages.length === 0,
    message: messages.join(", ")
  };
};

export const calculateRecipeFromStarter = (
  starterWeight: number,
  starterHydration: number,
  targetHydration: number
): Recipe => {
  const totalFlour = starterWeight / (1 + starterHydration/100);
  const water = totalFlour * (targetHydration/100);
  const salt = calculateSaltFromFlour(totalFlour);

  return {
    flour: totalFlour,
    unit: 'g',
    hydrationTarget: targetHydration,
    ingredients: [
      { id: 'water', name: 'Water', weight: water, percentage: targetHydration },
      { id: 'salt', name: 'Salt', weight: salt, percentage: 2 }
    ]
  };
};

export const calculateSaltFromFlour = (flourWeight: number, percentage: number = 2): number => {
  return (flourWeight * percentage) / 100;
};

export const calculateWaterFromHydration = (flourWeight: number, hydration: number): number => {
  return (flourWeight * hydration) / 100;
};