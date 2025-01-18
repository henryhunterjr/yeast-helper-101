export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'bread-machine': 'Bread Machine Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export type YeastType = keyof typeof yeastTypes;

export type UnitType = 'g' | 'tsp' | 'oz';

// Teaspoon conversion factors (relative to grams)
export const tspToGramConversion: Record<YeastType, number> = {
  'active-dry': 3.1,
  'instant': 3.3,
  'fresh': 10,
  'bread-machine': 3.3,
  'sourdough': null
} as const;

// Direct conversion factors between yeast types (for both grams and teaspoons)
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

export const getWaterTemperature = (roomTemp: number): number => {
  // Target dough temperature is typically around 75-78°F (24-26°C)
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
  const conversionFactor = tspToGramConversion[yeastType];
  if (conversionFactor === null) return null; // For sourdough or unsupported types
  return grams / conversionFactor;
};

export const convertFromTeaspoons = (teaspoons: number, yeastType: YeastType): number | null => {
  const conversionFactor = tspToGramConversion[yeastType];
  if (conversionFactor === null) return null; // For sourdough or unsupported types
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
      const tspValue = convertToTeaspoons(value, yeastType);
      return tspValue ? `${tspValue.toFixed(2)} tsp` : `${value.toFixed(2)}g`;
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
      const gramsValue = convertFromTeaspoons(numValue, yeastType);
      return gramsValue ?? numValue;
    case 'oz':
      return convertOuncesToGrams(numValue);
    default:
      return numValue;
  }
};