import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';
import {
  calculateTemperatureMultiplier,
  calculateHydrationMultiplier,
  getStarterStrengthMultiplier,
  memoizedCalculation
} from './calculationHelpers';

export const SIMPLIFIED_THRESHOLD = 14; // grams

export const TEMPERATURE_RANGES = {
  STANDARD: {
    DESIRED: 75,
    MIN: 75,
    MAX: 80
  },
  SOURDOUGH: {
    DESIRED: 78,
    MIN: 78,
    MAX: 82
  }
} as const;

export const calculateWaterTemperature = memoizedCalculation(
  (roomTemp: number, yeastType: YeastType): number => {
    const config = yeastType === 'sourdough' ? TEMPERATURE_RANGES.SOURDOUGH : TEMPERATURE_RANGES.STANDARD;
    let waterTemp = (config.DESIRED * 3) - roomTemp;
    return Math.min(Math.max(waterTemp, config.MIN), config.MAX);
  }
);

const baseProofingTimes = {
  'active-dry': { min: 1.5, max: 2.5 },
  'instant': { min: 1, max: 2 },
  'fresh': { min: 1.5, max: 2.5 },
  'sourdough': { min: 4, max: 6 },
  'bread-machine': { min: 1, max: 2 }
} as const;

export const calculateProofingTime = memoizedCalculation(
  (
    yeastType: YeastType,
    hydration: number,
    temperature: number,
    starterStrength: 'strong' | 'moderate' | 'weak' = 'moderate'
  ): { minHours: number; maxHours: number } => {
    const tempMultiplier = calculateTemperatureMultiplier(temperature);
    const hydrationMultiplier = calculateHydrationMultiplier(hydration);
    const strengthMultiplier = yeastType === 'sourdough' 
      ? getStarterStrengthMultiplier(starterStrength) 
      : 1;

    const base = baseProofingTimes[yeastType];
    const multiplier = tempMultiplier * hydrationMultiplier * strengthMultiplier;

    return {
      minHours: Math.max(base.min * multiplier, 0.5),
      maxHours: Math.max(base.max * multiplier, 1)
    };
  }
);

export const calculateConversion = memoizedCalculation(
  (
    amount: string,
    fromType: YeastType,
    toType: YeastType,
    useTsp: boolean = false,
    temperature: number = 72,
    hydration: number = 100,
    starterStrength: 'strong' | 'moderate' | 'weak' = 'moderate'
  ): {
    result: string;
    isSimplified: boolean;
    flourAdjustment?: number;
    waterAdjustment?: number;
  } => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Invalid amount provided');
    }

    let amountInGrams = useTsp && (fromType === 'active-dry' || fromType === 'instant')
      ? numericAmount * 3
      : numericAmount;

    const isSimplifiedConversion = 
      amountInGrams <= SIMPLIFIED_THRESHOLD && 
      ((fromType === 'active-dry' && toType === 'instant') || 
       (fromType === 'instant' && toType === 'active-dry'));

    if (isSimplifiedConversion) {
      return { result: amount, isSimplified: true };
    }

    let result = amountInGrams * conversionFactors[fromType][toType];

    if (toType === 'sourdough') {
      const tempMultiplier = calculateTemperatureMultiplier(temperature);
      const strengthMultiplier = getStarterStrengthMultiplier(starterStrength);
      
      result *= tempMultiplier * strengthMultiplier;

      const flourAdjustment = result / (1 + hydration/100);
      const waterAdjustment = (result * hydration/100) / (1 + hydration/100);

      if (useTsp) {
        result = result / 5;
      }

      return {
        result: result.toFixed(2),
        isSimplified: false,
        flourAdjustment,
        waterAdjustment
      };
    }

    if (useTsp && (toType === 'active-dry' || toType === 'instant')) {
      result = result / 3;
    }

    return {
      result: result.toFixed(2),
      isSimplified: false
    };
  },
  (amount, fromType, toType, useTsp, temperature, hydration, starterStrength) => 
    `${amount}-${fromType}-${toType}-${useTsp}-${temperature}-${hydration}-${starterStrength}`
);

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 70) {
    return "Increase starter amount by 10% for slower fermentation";
  } else if (temperature > 80) {
    return "Decrease starter amount by 10% for faster fermentation";
  }
  return "Optimal temperature range for fermentation";
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

  const starterAmount = amount * conversionFactors[fromType][toType];
  const flourAmount = starterAmount / (1 + hydration/100);
  const waterAmount = (starterAmount * hydration/100) / (1 + hydration/100);

  return {
    flourAdjustment: flourAmount,
    waterAdjustment: waterAmount,
    showAdjustments: true
  };
};
