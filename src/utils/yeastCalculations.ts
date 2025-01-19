import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export type { YeastType };

export const calculateWaterTemperature = (roomTemp: number, yeastType: YeastType): number => {
  const targetTemp = {
    'active-dry': 75,
    'instant': 80,
    'fresh': 75,
    'sourdough': 78,
    'bread-machine': 80
  }[yeastType];

  const frictionFactor = 22;
  const flourTemp = roomTemp;

  let waterTemp = (targetTemp * 3) - roomTemp - flourTemp - frictionFactor;
  waterTemp = Math.min(Math.max(waterTemp, 60), 90);
  
  return Math.round(waterTemp);
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number
): { minHours: number; maxHours: number } => {
  const baseTimes = {
    'active-dry': { minHours: 2, maxHours: 3 },
    'instant': { minHours: 1.5, maxHours: 2.3 },
    'fresh': { minHours: 2.2, maxHours: 3.3 },
    'sourdough': { minHours: 4.8, maxHours: 7.2 },
    'bread-machine': { minHours: 1.5, maxHours: 2.3 }
  };

  const baseTime = baseTimes[yeastType];
  
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.5, tempDiff / 17);
  
  const hydrationDiff = hydration - 100;
  const hydrationFactor = Math.pow(0.95, hydrationDiff / 10);

  return {
    minHours: Math.max(baseTime.minHours * tempFactor * hydrationFactor, 0.5),
    maxHours: Math.max(baseTime.maxHours * tempFactor * hydrationFactor, 1)
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
  if (toType !== 'sourdough') {
    return { 
      flourAdjustment: 0, 
      waterAdjustment: 0, 
      showAdjustments: false 
    };
  }

  const flourAmount = amount / 2;
  const waterAmount = (flourAmount * hydration) / 100;

  return {
    flourAdjustment: flourAmount,
    waterAdjustment: waterAmount,
    showAdjustments: true
  };
};

// Export calculateProofingTime as calculateFermentationTime for backward compatibility
export const calculateFermentationTime = calculateProofingTime;