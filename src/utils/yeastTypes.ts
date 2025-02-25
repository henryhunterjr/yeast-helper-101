
export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'bread-machine': 'Bread Machine Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export type YeastType = keyof typeof yeastTypes;
export type UnitType = 'g' | 'tsp' | 'oz';

// Updated conversion factors with correct sourdough ratio:
// 1g active dry/instant = 20g sourdough (100% hydration)
// 1g fresh = 3x active dry, so 1g fresh = 6.67g sourdough
export const conversionFactors: Record<YeastType, Record<YeastType, number>> = {
  'active-dry': {
    'instant': 1,        // 1:1 ratio for small amounts
    'fresh': 3.33,       // 1 tsp active dry = 3.33 tsp fresh
    'bread-machine': 1,  // Same as instant
    'sourdough': 20,     // 1g active dry = 20g sourdough
    'active-dry': 1
  },
  'instant': {
    'active-dry': 1,     // 1:1 ratio for small amounts
    'fresh': 3.33,       // 1 tsp instant = 3.33 tsp fresh
    'bread-machine': 1,
    'sourdough': 20,     // 1g instant = 20g sourdough
    'instant': 1
  },
  'fresh': {
    'active-dry': 0.3,   // 1 tsp fresh = 0.3 tsp active dry
    'instant': 0.3,      // 1 tsp fresh = 0.3 tsp instant
    'bread-machine': 0.3,
    'sourdough': 6.67,   // 1g fresh = 6.67g sourdough
    'fresh': 1
  },
  'bread-machine': {
    'active-dry': 1,
    'instant': 1,
    'fresh': 3.33,
    'sourdough': 20,     // Same as instant/active dry
    'bread-machine': 1
  },
  'sourdough': {
    'active-dry': 0.05,  // 1g sourdough = 0.05g active dry (1/20)
    'instant': 0.05,     // 1g sourdough = 0.05g instant (1/20)
    'fresh': 0.15,       // 1g sourdough = 0.15g fresh
    'bread-machine': 0.05,
    'sourdough': 1
  }
};

export const gramToTspConversion: Record<YeastType, number> = {
  'active-dry': 3,    // 1 tsp = 3g
  'instant': 3,       // 1 tsp = 3g
  'fresh': 10,        // 1 tsp = 10g
  'bread-machine': 3, // 1 tsp = 3g
  'sourdough': 5      // 1 tsp = 5g
};

export const tspToGramConversion: Record<YeastType, number> = {
  'active-dry': 3,    // 1 tsp = 3g
  'instant': 3,       // 1 tsp = 3g
  'fresh': 10,        // 1 tsp = 10g
  'bread-machine': 3, // 1 tsp = 3g
  'sourdough': 5      // 1 tsp = 5g
};

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
