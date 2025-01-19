import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export type { YeastType };

const SIMPLIFIED_THRESHOLD = 14; // grams

export const calculateWaterTemperature = (roomTemp: number, yeastType: YeastType): number => {
  console.group('Water Temperature Calculation');
  console.log('Function called with:', { roomTemp, yeastType });

  const desiredTemp = {
    'active-dry': 75,
    'instant': 75,
    'fresh': 75,
    'sourdough': 78,
    'bread-machine': 75
  }[yeastType];

  console.log('Desired Temperature:', desiredTemp);

  let waterTemp = (desiredTemp * 3) - roomTemp;
  console.log('Initial Water Temperature Calculation:', waterTemp);

  if (yeastType === 'sourdough') {
    waterTemp = Math.min(Math.max(waterTemp, 78), 82);
    console.log('Applied sourdough capping (78-82°F)');
  } else {
    waterTemp = Math.min(Math.max(waterTemp, 75), 80);
    console.log('Applied regular yeast capping (75-80°F)');
  }

  const finalTemp = Math.round(waterTemp);
  console.log('Final Water Temperature (rounded):', finalTemp);
  console.groupEnd();

  return finalTemp;
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number
): { minHours: number; maxHours: number } => {
  const baseTime = 2.5;
  const hydrationAdjustment = (100 - hydration) / 50;
  
  const activeProofTime = baseTime + hydrationAdjustment;
  
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
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.8, tempDiff / 6);
  const adjustedTime = baseProofTime * tempFactor;
  
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
): { result: string; isSimplified: boolean } => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) return { result: '', isSimplified: false };
  
  // For small amounts between active dry and instant yeast
  const isSmallAmount = numericAmount <= SIMPLIFIED_THRESHOLD;
  const isActiveInstantConversion = 
    (fromType === 'active-dry' && toType === 'instant') ||
    (fromType === 'instant' && toType === 'active-dry');

  if (isSmallAmount && isActiveInstantConversion) {
    return { 
      result: numericAmount.toFixed(2),
      isSimplified: true
    };
  }
  
  const conversionRate = conversionFactors[fromType][toType];
  const result = numericAmount * conversionRate;
  
  return {
    result: result.toFixed(2),
    isSimplified: false
  };
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

export const calculateFermentationTime = calculateProofingTime;