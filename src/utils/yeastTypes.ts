export const yeastTypes = {
  ACTIVE_DRY: 'active-dry',
  INSTANT: 'instant',
  FRESH: 'fresh',
  BREAD_MACHINE: 'bread-machine',
  SOURDOUGH: 'sourdough'
} as const;

export type YeastType = typeof yeastTypes[keyof typeof yeastTypes];

export const conversionFactors: Record<YeastType, Record<YeastType, number>> = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 2.5,
    'bread-machine': 0.75,
    'sourdough': 20,
    'active-dry': 1
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 3.33,
    'bread-machine': 1,
    'sourdough': 26.67,
    'instant': 1
  },
  'fresh': {
    'active-dry': 0.4,
    'instant': 0.3,
    'bread-machine': 0.3,
    'sourdough': 8,
    'fresh': 1
  },
  'bread-machine': {
    'active-dry': 1.33,
    'instant': 1,
    'fresh': 3.33,
    'sourdough': 16,
    'bread-machine': 1
  },
  'sourdough': {
    'active-dry': 0.05,
    'instant': 0.0375,
    'fresh': 0.125,
    'bread-machine': 0.0625,
    'sourdough': 1
  }
};

export const tspToGramConversion: Record<YeastType, number> = {
  'active-dry': 3.1,
  'instant': 3.3,
  'fresh': 10,
  'bread-machine': 3.3,
  'sourdough': 0 // Not applicable for sourdough
};

export const convertToTeaspoons = (grams: number, yeastType: YeastType): number | null => {
  const conversionFactor = tspToGramConversion[yeastType];
  if (conversionFactor === 0) return null; // For sourdough or unsupported types
  return grams / conversionFactor;
};

export const convertFromTeaspoons = (teaspoons: number, yeastType: YeastType): number | null => {
  const conversionFactor = tspToGramConversion[yeastType];
  if (conversionFactor === 0) return null; // For sourdough or unsupported types
  return teaspoons * conversionFactor;
};

export const getWaterTemperature = (roomTemp: number): number => {
  const targetDoughTemp = 78; // Ideal dough temperature in °F
  const frictionFactor = 25; // Average friction factor from mixing
  const flourTemp = roomTemp; // Assume flour is at room temperature
  
  return (targetDoughTemp * 4) - (roomTemp + flourTemp + frictionFactor);
};

export const getFermentationTimeRange = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  // Base fermentation times at 72°F and 100% hydration
  let baseMin = 3;
  let baseMax = 4;

  // Temperature adjustment
  const tempFactor = Math.pow(0.8, (temperature - 72) / 10);
  
  // Hydration adjustment
  const hydrationFactor = (hydration / 100);

  return {
    minHours: Math.round(baseMin * tempFactor / hydrationFactor),
    maxHours: Math.round(baseMax * tempFactor / hydrationFactor)
  };
};