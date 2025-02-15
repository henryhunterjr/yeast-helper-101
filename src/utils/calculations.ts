import { validateAmount, validateTemperature, validateHydration, BASE_TEMPERATURE, BASE_HYDRATION } from './validations';
import { conversionFactors, getWaterTemperature, getFermentationTimeRange } from './yeastTypes';

export const calculateConversion = (
  amount: string,
  fromType: string,
  toType: string,
  useTsp: boolean = false
): string => {
  const numAmount = parseFloat(amount);
  
  const amountError = validateAmount(numAmount);
  if (amountError) throw new Error(amountError);
  
  if (fromType === toType) return amount;

  // Get the conversion factor
  const factor = conversionFactors[fromType as keyof typeof conversionFactors]?.[toType as keyof typeof conversionFactors[keyof typeof conversionFactors]];
  if (!factor) throw new Error(`Cannot convert from ${fromType} to ${toType}`);
  
  // Calculate the result using the conversion factor
  const result = numAmount * factor;

  // Apply validation based on the unit being used
  if (useTsp) {
    if (result < 0.1) {
      throw new Error(`Resulting amount (${result.toFixed(3)} tsp) is too small. Minimum is 0.1 tsp`);
    }
    if (result > 1000) {
      throw new Error(`Resulting amount (${result.toFixed(2)} tsp) is too large. Maximum is 1000 tsp`);
    }
  } else {
    if (result < 0.1) {
      throw new Error(`Resulting amount (${result.toFixed(3)}g) is too small. Minimum is 0.1g`);
    }
    if (result > 1000) {
      throw new Error(`Resulting amount (${result.toFixed(2)}g) is too large. Maximum is 1000g`);
    }
  }

  return result.toFixed(2);
};

export const getTemperatureAdjustment = (temperature: number): string => {
  const tempError = validateTemperature(temperature);
  if (tempError) throw new Error(tempError);
  
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
  weight: number,
  fromType: string,
  toType: string
): { 
  flourAdjustment: number;
  waterAdjustment: number;
  showAdjustments: boolean;
  recommendedWaterTemp?: number;
} => {
  const hydrationError = validateHydration(hydration);
  if (hydrationError) throw new Error(hydrationError);

  const showAdjustments = fromType === 'sourdough' || toType === 'sourdough';

  if (!showAdjustments) {
    return {
      flourAdjustment: 0,
      waterAdjustment: 0,
      showAdjustments: false
    };
  }

  // Calculate flour and water adjustments based on hydration percentage
  let flourRatio: number;
  let waterRatio: number;

  if (hydration === 100) {
    // For 100% hydration, equal parts flour and water
    flourRatio = 0.5;
    waterRatio = 0.5;
  } else {
    // For other hydration levels, calculate the ratios
    const totalParts = 1 + (hydration / 100);
    flourRatio = 1 / totalParts;
    waterRatio = (hydration / 100) / totalParts;
  }

  const sourdoughAmount = toType === 'sourdough' ? weight : -weight;
  const flourAdjustment = sourdoughAmount * flourRatio;
  const waterAdjustment = sourdoughAmount * waterRatio;

  // Calculate recommended water temperature
  const recommendedWaterTemp = getWaterTemperature(BASE_TEMPERATURE);

  if (Math.abs(flourAdjustment) > 1000 || Math.abs(waterAdjustment) > 1000) {
    throw new Error('Adjustment amounts exceed maximum allowed values');
  }

  return {
    flourAdjustment: Number(flourAdjustment.toFixed(2)),
    waterAdjustment: Number(waterAdjustment.toFixed(2)),
    showAdjustments: true,
    recommendedWaterTemp
  };
};

export const calculateFermentationTime = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  const tempError = validateTemperature(temperature);
  if (tempError) throw new Error(tempError);
  
  const hydrationError = validateHydration(hydration);
  if (hydrationError) throw new Error(hydrationError);

  return getFermentationTimeRange(temperature, hydration);
};

export const getDoughReadinessIndicators = (
  hydration: number,
  temperature: number
): string[] => {
  const indicators = [
    "Dough should increase in volume by 50-100%",
    "Perform the poke test: gently poke the dough with a floured finger"
  ];

  if (hydration > 75) {
    indicators.push("Dough will be more slack and may spread more");
  }

  if (temperature < 68) {
    indicators.push("Cold temperature may require longer proofing time");
  } else if (temperature > 76) {
    indicators.push("Watch carefully as warmer temperatures speed up fermentation");
  }

  return indicators;
};
