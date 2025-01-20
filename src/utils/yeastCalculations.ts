import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export const SIMPLIFIED_THRESHOLD = 14; // grams

export const calculateWaterTemperature = (roomTemp: number, yeastType: YeastType): number => {
  const desiredTemp = {
    'active-dry': 75,
    'instant': 75,
    'fresh': 75,
    'sourdough': 78,
    'bread-machine': 75
  }[yeastType];

  let waterTemp = (desiredTemp * 3) - roomTemp;

  if (yeastType === 'sourdough') {
    waterTemp = Math.min(Math.max(waterTemp, 78), 82);
  } else {
    waterTemp = Math.min(Math.max(waterTemp, 75), 80);
  }

  return Math.round(waterTemp);
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number,
  starterStrength: 'strong' | 'moderate' | 'weak' = 'moderate'
): { minHours: number; maxHours: number } => {
  // Base proofing times for different yeast types at 72°F and 65% hydration
  const baseProofingTimes = {
    'active-dry': { min: 1.5, max: 2.5 },
    'instant': { min: 1, max: 2 },
    'fresh': { min: 1.5, max: 2.5 },
    'sourdough': { min: 4, max: 6 },
    'bread-machine': { min: 1, max: 2 }
  };

  // Starter strength multipliers
  const starterMultiplier = {
    'strong': 0.8,    // Reduces proofing time
    'moderate': 1,    // Standard proofing time
    'weak': 1.3       // Increases proofing time
  };

  // Temperature adjustment
  const tempDiff = temperature - 72;
  const tempMultiplier = Math.pow(0.85, tempDiff / 10); // Exponential adjustment

  // Hydration adjustment
  const hydrationDiff = hydration - 65;
  const hydrationMultiplier = Math.pow(0.95, hydrationDiff / 10);

  const base = baseProofingTimes[yeastType];
  const multiplier = tempMultiplier * hydrationMultiplier * 
    (yeastType === 'sourdough' ? starterMultiplier[starterStrength] : 1);

  return {
    minHours: Math.max(base.min * multiplier, 0.5),
    maxHours: Math.max(base.max * multiplier, 1)
  };
};

export const calculateConversion = (
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
    return { result: '', isSimplified: false };
  }

  // Convert to grams if using teaspoons
  let amountInGrams = numericAmount;
  if (useTsp && (fromType === 'active-dry' || fromType === 'instant')) {
    amountInGrams = numericAmount * 3;
  }

  // Use 1:1 conversion for small amounts between active-dry and instant
  const isSimplifiedConversion = 
    amountInGrams <= SIMPLIFIED_THRESHOLD && 
    ((fromType === 'active-dry' && toType === 'instant') || 
     (fromType === 'instant' && toType === 'active-dry'));

  if (isSimplifiedConversion) {
    return {
      result: amount,
      isSimplified: true
    };
  }

  // Calculate base conversion
  let result = amountInGrams * conversionFactors[fromType][toType];

  // Apply temperature and hydration adjustments for sourdough
  if (toType === 'sourdough') {
    // Temperature adjustment
    if (temperature < 70) {
      result *= 1.1; // Increase by 10% for lower temperatures
    } else if (temperature > 80) {
      result *= 0.9; // Decrease by 10% for higher temperatures
    }

    // Starter strength adjustment
    const strengthMultiplier = {
      'strong': 0.9,
      'moderate': 1.0,
      'weak': 1.2
    }[starterStrength];
    
    result *= strengthMultiplier;

    // Calculate flour and water adjustments
    const flourAdjustment = result / (1 + hydration/100);
    const waterAdjustment = (result * hydration/100) / (1 + hydration/100);

    // Convert back to teaspoons if needed
    if (useTsp) {
      result = result / 5; // Approximate conversion: 5g starter = 1 tsp
    }

    return {
      result: result.toFixed(2),
      isSimplified: false,
      flourAdjustment,
      waterAdjustment
    };
  }

  // For other conversions, convert back to teaspoons if needed
  if (useTsp && (toType === 'active-dry' || toType === 'instant')) {
    result = result / 3;
  }

  return {
    result: result.toFixed(2),
    isSimplified: false
  };
};

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