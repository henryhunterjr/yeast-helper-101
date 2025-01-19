import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export type { YeastType };

export const calculateWaterTemperature = (temperature: number, yeastType: YeastType): number => {
  const adjustments: Record<YeastType, number> = {
    'active-dry': 3,
    'instant': 15,
    'fresh': 3,
    'sourdough': 6,
    'bread-machine': 15
  };
  const adjustment = adjustments[yeastType] || 0;
  return Math.min(Math.max(temperature + adjustment, 60), 90);
};

export const calculateProofingTime = (
  yeastType: YeastType,
  amount: number,
  temperature: number
): { minHours: number; maxHours: number } => {
  const baseTimes: Record<YeastType, { minHours: number; maxHours: number }> = {
    'active-dry': { minHours: 2, maxHours: 3 },
    'instant': { minHours: 1.5, maxHours: 2.3 },
    'fresh': { minHours: 2.2, maxHours: 3.3 },
    'sourdough': { minHours: 4.8, maxHours: 7.2 },
    'bread-machine': { minHours: 1.5, maxHours: 2.3 }
  };

  const baseTime = baseTimes[yeastType];
  const tempAdjustment = (temperature - 72) / 10;
  const adjustedMin = baseTime.minHours - tempAdjustment;
  const adjustedMax = baseTime.maxHours - tempAdjustment;

  return {
    minHours: Math.max(adjustedMin, 0.5),
    maxHours: Math.max(adjustedMax, 1)
  };
};

export const calculateConversion = (
  amount: string,
  fromType: YeastType,
  toType: YeastType,
  useTsp: boolean
): string => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) return '';
  
  const conversionRate = conversionFactors[fromType][toType];
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