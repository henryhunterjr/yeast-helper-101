export { yeastTypes } from './yeastTypes';

// Temperature adjustment calculation with type-specific desired temperatures
export const calculateWaterTemperature = (roomTemp: number, yeastType: string = 'active-dry'): number => {
  // Set desired temperature based on yeast type
  const desiredTemp = yeastType === 'sourdough' ? 78 : 75;
  let waterTemp = (desiredTemp * 3) - roomTemp;
  
  // Cap water temperature within practical range based on yeast type
  if (yeastType === 'sourdough') {
    if (waterTemp > 82) waterTemp = 82;
    if (waterTemp < 78) waterTemp = 78;
  } else {
    if (waterTemp > 80) waterTemp = 80;
    if (waterTemp < 75) waterTemp = 75;
  }
  
  return Math.round(waterTemp);
};

// Proofing time calculation for active dry yeast
export const calculateActiveProofingTime = (hydrationPercentage: number): {
  minHours: number;
  maxHours: number;
} => {
  const baseTime = 2.5;
  const hydrationAdjustment = (100 - hydrationPercentage) / 50;
  
  return {
    minHours: Math.max(1, Math.round((baseTime - hydrationAdjustment) * 10) / 10),
    maxHours: Math.max(2, Math.round((baseTime + hydrationAdjustment) * 10) / 10)
  };
};

// Proofing time calculation for instant yeast
export const calculateInstantProofingTime = (hydrationPercentage: number): {
  minHours: number;
  maxHours: number;
} => {
  const activeTime = calculateActiveProofingTime(hydrationPercentage);
  return {
    minHours: Math.round(activeTime.minHours * 0.75 * 10) / 10,
    maxHours: Math.round(activeTime.maxHours * 0.75 * 10) / 10
  };
};

// Proofing time calculation for fresh yeast
export const calculateFreshProofingTime = (hydrationPercentage: number): {
  minHours: number;
  maxHours: number;
} => {
  const activeTime = calculateActiveProofingTime(hydrationPercentage);
  return {
    minHours: Math.round(activeTime.minHours * 1.1 * 10) / 10,
    maxHours: Math.round(activeTime.maxHours * 1.1 * 10) / 10
  };
};

// Proofing time calculation for sourdough starter
export const calculateSourdoughProofingTime = (hydrationPercentage: number): {
  minHours: number;
  maxHours: number;
} => {
  const baseTime = 6 * (hydrationPercentage / 100);
  return {
    minHours: Math.max(4, Math.round(baseTime * 0.8 * 10) / 10),
    maxHours: Math.max(6, Math.round(baseTime * 1.2 * 10) / 10)
  };
};

// Main proofing time calculation function
export const calculateProofingTime = (
  yeastType: string,
  hydrationPercentage: number = 100,
  roomTemp: number = 72
): {
  minHours: number;
  maxHours: number;
} => {
  // Calculate base proofing time based on yeast type
  let baseTime;
  switch (yeastType) {
    case 'instant':
      baseTime = calculateInstantProofingTime(hydrationPercentage);
      break;
    case 'fresh':
      baseTime = calculateFreshProofingTime(hydrationPercentage);
      break;
    case 'sourdough':
      baseTime = calculateSourdoughProofingTime(hydrationPercentage);
      break;
    default: // active-dry
      baseTime = calculateActiveProofingTime(hydrationPercentage);
  }
    
  // Temperature adjustment factor
  // For every 17°F increase in temperature, fermentation time approximately halves
  const tempAdjustment = Math.pow(0.5, (roomTemp - 72) / 17);
  
  return {
    minHours: Math.max(0.5, Math.round(baseTime.minHours * tempAdjustment * 10) / 10),
    maxHours: Math.max(1, Math.round(baseTime.maxHours * tempAdjustment * 10) / 10)
  };
};

// Re-export functions from calculations.ts
export { 
  calculateConversion,
  getTemperatureAdjustment,
  calculateHydrationAdjustment,
  calculateFermentationTime
} from './calculations';

export { validateAmount, validateTemperature, validateHydration } from './validations';