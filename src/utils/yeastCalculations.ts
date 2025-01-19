import type { YeastType } from './yeastTypes';
import { conversionFactors } from './yeastTypes';

export const SIMPLIFIED_THRESHOLD = 14; // grams

export const calculateWaterTemperature = (roomTemp: number, yeastType: YeastType): number => {
  console.log('Water Temperature Calculation');
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
  useTsp: boolean,
  temperature: number = 72
): { 
  result: string; 
  isSimplified: boolean;
  flourAdjustment?: number;
  waterAdjustment?: number;
} => {
  console.log('Conversion Calculation');
  console.log('Inputs:', { amount, fromType, toType, useTsp, temperature });

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    console.log('Invalid amount, returning empty result');
    return { result: '', isSimplified: false };
  }

  // Convert to grams if using teaspoons for active dry or instant yeast
  let amountInGrams = numericAmount;
  if (useTsp && (fromType === 'active-dry' || fromType === 'instant')) {
    amountInGrams = numericAmount * 3; // 1 tsp = 3g for active dry/instant yeast
  }

  // Special handling for sourdough conversion
  if (toType === 'sourdough' && (fromType === 'active-dry' || fromType === 'instant')) {
    // Base conversion: 1g yeast = 5g starter
    let starterAmount = amountInGrams * 5;

    // Temperature adjustment
    if (temperature < 70) {
      starterAmount *= 1.1; // Increase by 10% for lower temperatures
    } else if (temperature > 80) {
      starterAmount *= 0.9; // Decrease by 10% for higher temperatures
    }

    // Calculate flour and water adjustments (assuming 100% hydration)
    const flourAdjustment = starterAmount / 2;
    const waterAdjustment = starterAmount / 2;

    // Convert back to teaspoons if needed
    if (useTsp) {
      starterAmount = starterAmount / 5; // Approximate conversion: 5g starter = 1 tsp
    }

    return {
      result: starterAmount.toFixed(2),
      isSimplified: false,
      flourAdjustment,
      waterAdjustment
    };
  }

  // For other conversions, use standard conversion factors
  let result = amountInGrams * conversionFactors[fromType][toType];
  
  // Convert back to teaspoons if needed
  if (useTsp) {
    if (toType === 'active-dry' || toType === 'instant') {
      result = result / 3; // Convert grams back to teaspoons
    }
  }

  console.log('Final conversion result:', result);
  
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

  // Calculate flour and water content in starter (assuming 100% hydration)
  const starterAmount = amount * 5; // New conversion ratio
  const flourAmount = starterAmount / 2;
  const waterAmount = flourAmount;

  return {
    flourAdjustment: flourAmount,
    waterAdjustment: waterAmount,
    showAdjustments: true
  };
};

export const calculateFermentationTime = calculateProofingTime;