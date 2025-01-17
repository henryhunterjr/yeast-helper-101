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
    'sourdough': 18.67 // 14/0.75
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'sourdough': 4.67 // 14/3
  },
  'sourdough': {
    'active-dry': 0.071, // 1/14
    'instant': 0.054, // 1/(14/0.75)
    'fresh': 0.214 // 1/(14/3)
  }
};

const BASE_TEMPERATURE = 72; // °F
const BASE_HYDRATION = 100; // %

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
  if (isNaN(temperature)) return 'Standard proofing time';
  
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
  weight: number
): { 
  adjustedWeight: number;
  flourAdjustment: number;
  waterAdjustment: number;
} => {
  const hydrationFactor = 1 + (hydration - BASE_HYDRATION) / 100;
  const adjustedWeight = weight * hydrationFactor;
  
  const flourAdjustment = (adjustedWeight - weight) / 2;
  const waterAdjustment = flourAdjustment * (hydration / 100);
  
  return {
    adjustedWeight,
    flourAdjustment,
    waterAdjustment
  };
};