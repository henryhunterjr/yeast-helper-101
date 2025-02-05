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

export const calculateWaterFromHydration = (flourWeight: number, hydration: number): number => {
  return (flourWeight * hydration) / 100;
};

export const calculateSaltFromFlour = (flourWeight: number, percentage: number = 2): number => {
  return (flourWeight * percentage) / 100;
};

export const calculateStarterFromFlour = (
  flourWeight: number,
  starterPercentage: number,
  hydration: number
): Recipe['starter'] => {
  if (!flourWeight || !starterPercentage) return undefined;
  
  const starterWeight = (flourWeight * starterPercentage) / 100;
  
  return {
    weight: starterWeight,
    hydration: hydration
  };
};