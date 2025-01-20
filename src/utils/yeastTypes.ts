export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'bread-machine': 'Bread Machine Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export type YeastType = keyof typeof yeastTypes;
export type UnitType = 'g' | 'tsp' | 'oz';

// Updated conversion factors based on the specified ratios
// 7g active dry = 5g instant = 21g fresh = 100g sourdough
export const conversionFactors: Record<YeastType, Record<YeastType, number>> = {
  'active-dry': {
    'instant': 5/7,      // 7g active dry = 5g instant
    'fresh': 3,          // 7g active dry = 21g fresh
    'bread-machine': 5/7, // Same as instant
    'sourdough': 100/7,  // 7g active dry = 100g sourdough
    'active-dry': 1
  },
  'instant': {
    'active-dry': 7/5,   // 5g instant = 7g active dry
    'fresh': 21/5,       // 5g instant = 21g fresh
    'bread-machine': 1,
    'sourdough': 100/5,  // 5g instant = 100g sourdough
    'instant': 1
  },
  'fresh': {
    'active-dry': 1/3,   // 21g fresh = 7g active dry
    'instant': 5/21,     // 21g fresh = 5g instant
    'bread-machine': 5/21,
    'sourdough': 100/21, // 21g fresh = 100g sourdough
    'fresh': 1
  },
  'bread-machine': {
    'active-dry': 7/5,
    'instant': 1,
    'fresh': 21/5,
    'sourdough': 100/5,
    'bread-machine': 1
  },
  'sourdough': {
    'active-dry': 7/100, // 100g sourdough = 7g active dry
    'instant': 5/100,    // 100g sourdough = 5g instant
    'fresh': 21/100,     // 100g sourdough = 21g fresh
    'bread-machine': 5/100,
    'sourdough': 1
  }
};

export const gramToTspConversion: Record<YeastType, number | null> = {
  'active-dry': 3,
  'instant': 3,
  'fresh': 10,
  'bread-machine': 3,
  'sourdough': 5 // 5g starter ≈ 1 tsp
};

export const tspToGramConversion: Record<YeastType, number | null> = {
  'active-dry': 3,
  'instant': 3,
  'fresh': 10,
  'bread-machine': 3,
  'sourdough': 5
};

// Helper functions remain unchanged
export const getWaterTemperature = (roomTemp: number): number => {
  const targetTemp = 76;
  return Math.round(2 * targetTemp - roomTemp);
};

export const getFermentationTimeRange = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  // Base fermentation time at 75°F and 65% hydration
  let baseMin = 3;
  let baseMax = 4;

  // Temperature adjustment
  const tempDiff = temperature - 75;
  const tempFactor = Math.pow(0.8, tempDiff / 10);

  // Hydration adjustment
  const hydrationDiff = hydration - 65;
  const hydrationFactor = Math.pow(0.9, hydrationDiff / 10);

  // Apply adjustments
  const adjustedMin = baseMin * tempFactor * hydrationFactor;
  const adjustedMax = baseMax * tempFactor * hydrationFactor;

  return {
    minHours: Math.round(adjustedMin),
    maxHours: Math.round(adjustedMax)
  };
};

export const convertToTeaspoons = (grams: number, yeastType: YeastType): number | null => {
  const conversionFactor = gramToTspConversion[yeastType];
  if (conversionFactor === null) return null;
  return grams / conversionFactor;
};

export const convertFromTeaspoons = (teaspoons: number, yeastType: YeastType): number | null => {
  const conversionFactor = gramToTspConversion[yeastType];
  if (conversionFactor === null) return null;
  return teaspoons * conversionFactor;
};

export const convertGramsToOunces = (grams: number): number => {
  return grams / 28.35;
};

export const convertOuncesToGrams = (ounces: number): number => {
  return ounces * 28.35;
};

export const formatMeasurement = (value: number, unit: UnitType, yeastType: YeastType): string => {
  switch (unit) {
    case 'g':
      return `${value.toFixed(2)}g`;
    case 'tsp':
      return `${value.toFixed(2)} tsp`;
    case 'oz':
      return `${convertGramsToOunces(value).toFixed(2)} oz`;
    default:
      return `${value.toFixed(2)}g`;
  }
};

export const parseInputValue = (value: string, unit: UnitType, yeastType: YeastType): number => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 0;

  switch (unit) {
    case 'tsp':
      return numValue;
    case 'oz':
      return convertOuncesToGrams(numValue);
    default:
      return numValue;
  }
};

