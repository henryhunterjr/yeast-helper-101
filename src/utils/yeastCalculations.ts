import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export type { YeastType };

export const calculateWaterTemperature = (roomTemp: number, yeastType: YeastType): number => {
  // Set desired dough temperature based on yeast type
  const desiredTemp = {
    'active-dry': 75,
    'instant': 75,
    'fresh': 75,
    'sourdough': 78,
    'bread-machine': 75
  }[yeastType];

  // Calculate water temperature using the formula: (Tdesired × 3) - Troom
  // We multiply desired temp by 3 first, then subtract room temp
  let waterTemp = (desiredTemp * 3) - roomTemp;

  // Example: If room temp is 72°F and desired is 75°F:
  // waterTemp = (75 × 3) - 72
  // waterTemp = 225 - 72
  // waterTemp = 153°F (before capping)

  // Apply appropriate temperature caps based on yeast type
  if (yeastType === 'sourdough') {
    waterTemp = Math.min(Math.max(waterTemp, 78), 82);
  } else {
    waterTemp = Math.min(Math.max(waterTemp, 75), 80);
  }

  // Round to nearest whole number
  return Math.round(waterTemp);
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number
): { minHours: number; maxHours: number } => {
  // Calculate base proofing time for active dry yeast
  const baseTime = 2.5;
  const hydrationAdjustment = (100 - hydration) / 50;
  
  // Calculate active dry yeast proofing time
  const activeProofTime = baseTime + hydrationAdjustment;
  
  // Calculate proofing times based on yeast type
  const getProofingTime = () => {
    switch (yeastType) {
      case 'active-dry':
        return activeProofTime;
      case 'instant':
        return activeProofTime * 0.75;
      case 'fresh':
        return activeProofTime * 1.1;
      case 'sourdough':
        return (hydration / 100) * 6;
      default:
        return activeProofTime;
    }
  };

  const baseProofTime = getProofingTime();
  
  // Temperature adjustment factor (every 6°F difference changes time by ~20%)
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.8, tempDiff / 6);
  
  // Calculate min and max times with temperature adjustment
  const adjustedTime = baseProofTime * tempFactor;
  
  // Round to 1 decimal place
  const roundToDecimal = (num: number) => Math.round(num * 10) / 10;
  
  return {
    minHours: roundToDecimal(adjustedTime * 0.8),
    maxHours: roundToDecimal(adjustedTime * 1.2)
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