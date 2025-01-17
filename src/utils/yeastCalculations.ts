export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

const conversionFactors = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 3,
    'sourdough': 14
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 4,
    'sourdough': 18.67
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'sourdough': 4.67
  },
  'sourdough': {
    'active-dry': 0.071,
    'instant': 0.054,
    'fresh': 0.214
  }
};

const BASE_TEMPERATURE = 72; // °F
const BASE_HYDRATION = 100; // %
const MIN_TEMP = 32;
const MAX_TEMP = 120;
const MIN_HYDRATION = 50;
const MAX_HYDRATION = 200;

export const calculateConversion = (
  amount: string,
  fromType: string,
  toType: string
): string => {
  if (!amount || isNaN(parseFloat(amount))) return '0';
  if (fromType === toType) return amount;

  const factor = conversionFactors[fromType as keyof typeof conversionFactors]?.[toType as keyof typeof conversionFactors[keyof typeof conversionFactors]];
  if (!factor) return '0';

  return (parseFloat(amount) * factor).toFixed(2);
};

export const getTemperatureAdjustment = (temperature: number): string => {
  if (isNaN(temperature) || temperature < MIN_TEMP || temperature > MAX_TEMP) {
    return 'Temperature out of range (32°F-120°F)';
  }
  
  const tempDiff = temperature - BASE_TEMPERATURE;
  if (Math.abs(tempDiff) < 5) return 'Standard proofing time';
  
  const factor = Math.pow(2, tempDiff / 10);
  const percentChange = Math.abs(Math.round((factor - 1) * 100));
  
  if (tempDiff < 0) {
    return `Increase proofing time by ${percentChange}%`;
  } else {
    return `Decrease proofing time by ${percentChange}%`;
  }
};

export const calculateHydrationAdjustment = (
  hydration: number,
  weight: number,
  fromType: string,
  toType: string
): { 
  flourAdjustment: number;
  waterAdjustment: number;
  showAdjustments: boolean;
} => {
  if (isNaN(hydration) || hydration < MIN_HYDRATION || hydration > MAX_HYDRATION) {
    throw new Error(`Hydration must be between ${MIN_HYDRATION}% and ${MAX_HYDRATION}%`);
  }

  // Only show adjustments when converting to/from sourdough
  const showAdjustments = fromType === 'sourdough' || toType === 'sourdough';

  if (!showAdjustments) {
    return {
      flourAdjustment: 0,
      waterAdjustment: 0,
      showAdjustments: false
    };
  }

  // Calculate adjustments based on sourdough conversion
  const sourdoughAmount = toType === 'sourdough' ? weight : -weight;
  
  // For 100% hydration starter, each gram contains 0.5g flour and 0.5g water
  const flourAdjustment = -sourdoughAmount * 0.5;
  const waterAdjustment = -sourdoughAmount * 0.5;

  return {
    flourAdjustment,
    waterAdjustment,
    showAdjustments: true
  };
};

export const calculateFermentationTime = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  if (isNaN(temperature) || temperature < MIN_TEMP || temperature > MAX_TEMP) {
    throw new Error(`Temperature must be between ${MIN_TEMP}°F and ${MAX_TEMP}°F`);
  }
  if (isNaN(hydration) || hydration < MIN_HYDRATION || hydration > MAX_HYDRATION) {
    throw new Error(`Hydration must be between ${MIN_HYDRATION}% and ${MAX_HYDRATION}%`);
  }

  let baseTime = 6;
  const tempFactor = Math.pow(2, (temperature - BASE_TEMPERATURE) / 10);
  baseTime /= tempFactor;
  const hydrationFactor = 1 + (hydration - BASE_HYDRATION) / 100;
  baseTime /= hydrationFactor;

  return {
    minHours: Math.max(1, Math.round(baseTime * 0.75)),
    maxHours: Math.round(baseTime * 1.25)
  };
};