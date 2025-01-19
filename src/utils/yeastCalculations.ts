export type YeastType = 'active-dry' | 'instant' | 'fresh' | 'sourdough';

export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

interface ProofingTime {
  minHours: number;
  maxHours: number;
}

export const calculateWaterTemperature = (
  roomTemp: number,
  yeastType: YeastType
): number => {
  // Set desired dough temperature based on yeast type
  const desiredTemp = yeastType === 'sourdough' ? 78 : 75;
  
  // Calculate water temperature using the formula: (Tdesired × 3) - Troom
  let waterTemp = (desiredTemp * 3) - roomTemp;
  
  // Apply caps based on yeast type
  if (yeastType === 'sourdough') {
    return Math.min(Math.max(waterTemp, 78), 82);
  }
  return Math.min(Math.max(waterTemp, 75), 80);
};

const calculateActiveProofingTime = (hydrationPercentage: number): ProofingTime => {
  const baseTime = 2.5;
  const variation = (100 - hydrationPercentage) / 50;
  
  return {
    minHours: Math.round((baseTime - variation) * 10) / 10,
    maxHours: Math.round((baseTime + variation) * 10) / 10
  };
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydrationPercentage: number,
  temperature: number = 72
): ProofingTime => {
  // Get base proofing time for active dry yeast
  const activeTime = calculateActiveProofingTime(hydrationPercentage);
  
  // Temperature adjustment factor (every 17°F difference changes time by ~50%)
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.5, tempDiff / 17);
  
  let minHours: number;
  let maxHours: number;
  
  switch (yeastType) {
    case 'instant':
      minHours = activeTime.minHours * 0.75;
      maxHours = activeTime.maxHours * 0.75;
      break;
    case 'fresh':
      minHours = activeTime.minHours * 1.1;
      maxHours = activeTime.maxHours * 1.1;
      break;
    case 'sourdough':
      // For sourdough, use the formula: (hydration/100) × 6
      const baseTime = (hydrationPercentage / 100) * 6;
      minHours = baseTime * 0.8;
      maxHours = baseTime * 1.2;
      break;
    default: // active-dry
      minHours = activeTime.minHours;
      maxHours = activeTime.maxHours;
  }
  
  // Apply temperature factor and round to 1 decimal
  return {
    minHours: Math.round(minHours * tempFactor * 10) / 10,
    maxHours: Math.round(maxHours * tempFactor * 10) / 10
  };
};

// Alias for calculateProofingTime to maintain compatibility
export const calculateFermentationTime = calculateProofingTime;