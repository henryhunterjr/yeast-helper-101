import { Recipe } from '@/types/recipe';

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

export const calculateStarterFromFlour = (
  flourWeight: number, 
  starterPercentage: number = 20
): number => {
  return (flourWeight * starterPercentage) / 100;
};

export const calculateWaterFromHydration = (
  flourWeight: number,
  hydration: number
): number => {
  return (flourWeight * hydration) / 100;
};

export const calculateSaltFromFlour = (
  flourWeight: number,
  saltPercentage: number = 2
): number => {
  return (flourWeight * saltPercentage) / 100;
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

  const totalFlour = flourFromStarter * 5;
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