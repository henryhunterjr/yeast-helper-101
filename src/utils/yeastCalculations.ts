import { YeastType } from './yeastTypes';

export { YeastType };

export const yeastTypes: Record<YeastType, string> = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter',
  'bread-machine': 'Bread Machine Yeast'
};

// Conversion rates between different yeast types
const conversionRates: Record<YeastType, Record<YeastType, number>> = {
  'active-dry': {
    'active-dry': 1,
    'instant': 0.75,
    'fresh': 3,
    'sourdough': 20,
    'bread-machine': 0.75
  },
  'instant': {
    'active-dry': 1.33,
    'instant': 1,
    'fresh': 4,
    'sourdough': 26.67,
    'bread-machine': 1
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'fresh': 1,
    'sourdough': 6.67,
    'bread-machine': 0.25
  },
  'bread-machine': {
    'active-dry': 1.33,
    'instant': 1,
    'fresh': 4,
    'sourdough': 26.67,
    'bread-machine': 1
  },
  'sourdough': {
    'active-dry': 0.05,
    'instant': 0.0375,
    'fresh': 0.15,
    'sourdough': 1,
    'bread-machine': 0.0375
  }
};

export const calculateConversion = (
  amount: string,
  fromType: YeastType,
  toType: YeastType,
  useTsp: boolean
): string => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) return '';
  
  const conversionRate = conversionRates[fromType][toType];
  const result = numericAmount * conversionRate;
  
  return result.toFixed(2);
};

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 65) {
    return "Increase proofing time by 15-30%";
  } else if (temperature > 80) {
    return "Decrease proofing time by 15-30%";
  }
  return "Optimal proofing temperature";
};

export const calculateHydrationAdjustment = (
  hydration: number,
  amount: number,
  fromType: YeastType,
  toType: YeastType
) => {
  if (toType !== 'sourdough') return { flourAdjustment: 0, waterAdjustment: 0, showAdjustments: false };

  const flourAmount = amount / 2;
  const waterAmount = (flourAmount * hydration) / 100;

  return {
    flourAdjustment: flourAmount,
    waterAdjustment: waterAmount,
    showAdjustments: true
  };
};

export const calculateFermentationTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number
): { minHours: number; maxHours: number } | null => {
  const baseTimes: Record<YeastType, { minHours: number; maxHours: number }> = {
    'active-dry': { minHours: 2, maxHours: 3 },
    'instant': { minHours: 1.5, maxHours: 2.3 },
    'fresh': { minHours: 2.2, maxHours: 3.3 },
    'sourdough': { minHours: 4.8, maxHours: 7.2 },
    'bread-machine': { minHours: 1.5, maxHours: 2.3 }
  };

  const baseTime = baseTimes[yeastType];
  const tempAdjustment = (temperature - 72) / 10;
  const hydrationAdjustment = (hydration - 100) / 20;

  return {
    minHours: Math.max(baseTime.minHours - tempAdjustment + hydrationAdjustment, 0.5),
    maxHours: Math.max(baseTime.maxHours - tempAdjustment + hydrationAdjustment, 1)
  };
};