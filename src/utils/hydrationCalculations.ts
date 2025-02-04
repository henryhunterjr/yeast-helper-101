export const calculateWaterFromHydration = (
  flourWeight: number, 
  hydration: number
): number => {
  return (flourWeight * hydration) / 100;
};

export const calculateFlourFromWaterAndHydration = (
  waterWeight: number, 
  hydration: number
): number => {
  return (waterWeight * 100) / hydration;
};

export const calculateHydration = (
  waterWeight: number, 
  flourWeight: number
): number => {
  return (waterWeight / flourWeight) * 100;
};