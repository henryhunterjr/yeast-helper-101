import { YeastType } from './yeastTypes';

// Define and export the yeastTypes record
export const yeastTypes: Record<YeastType, string> = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
};

// Conversion rates between different yeast types
export const conversionRates: Record<YeastType, Record<YeastType, number>> = {
  'active-dry': {
    'active-dry': 1,
    'instant': 0.75,
    'fresh': 3,
    'sourdough': 20
  },
  'instant': {
    'active-dry': 1.33,
    'instant': 1,
    'fresh': 4,
    'sourdough': 26.67
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'fresh': 1,
    'sourdough': 6.67
  },
  'sourdough': {
    'active-dry': 0.05,
    'instant': 0.0375,
    'fresh': 0.15,
    'sourdough': 1
  }
};

// Function to calculate water temperature based on yeast type
export const calculateWaterTemperature = (temperature: number, yeastType: YeastType): number => {
  const adjustments: Record<YeastType, number> = {
    'active-dry': 3,
    'instant': 15,
    'fresh': 3,
    'sourdough': 6
  };
  const adjustment = adjustments[yeastType] || 0;
  return Math.min(Math.max(temperature + adjustment, 60), 90);
};

// Function to calculate proofing time based on yeast type and temperature
export const calculateProofingTime = (yeastType: YeastType, amount: number, temperature: number) => {
  const baseTimes: Record<YeastType, { minHours: number; maxHours: number }> = {
    'active-dry': { minHours: 2, maxHours: 3 },
    'instant': { minHours: 1.5, maxHours: 2.3 },
    'fresh': { minHours: 2.2, maxHours: 3.3 },
    'sourdough': { minHours: 4.8, maxHours: 7.2 }
  };

  const baseTime = baseTimes[yeastType];
  const adjustedMin = baseTime.minHours - (temperature - 72) / 10;
  const adjustedMax = baseTime.maxHours - (temperature - 72) / 10;

  return {
    minHours: Math.max(adjustedMin, 0.5),
    maxHours: Math.max(adjustedMax, 1)
  };
};
