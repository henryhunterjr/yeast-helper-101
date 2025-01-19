export type YeastType = 'active-dry' | 'instant' | 'fresh' | 'sourdough';

export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

interface ProofingTime {
  minHours: number;
  maxHours: number;
}

export const calculateWaterTemperature = (
  roomTemp: number,
  yeastType: YeastType
): number => {
  // Target dough temperature is different for sourdough vs regular yeast
  const targetTemp = yeastType === 'sourdough' ? 78 : 75;
  
  // Formula: Water Temp = (3 × Target Temp) - Room Temp - Flour Temp
  // Assuming flour temp is same as room temp for simplicity
  const waterTemp = (3 * targetTemp) - (2 * roomTemp);
  
  // Apply safe temperature ranges
  if (yeastType === 'sourdough') {
    return Math.min(Math.max(waterTemp, 78), 82);
  }
  return Math.min(Math.max(waterTemp, 75), 80);
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydrationPercentage: number,
  temperature: number = 72
): ProofingTime => {
  // Base proofing times for each yeast type at 72°F and 65% hydration
  const baseProofingTimes = {
    'active-dry': { min: 2, max: 3 },
    'instant': { min: 1.5, max: 2.3 },
    'fresh': { min: 2.2, max: 3.3 },
    'sourdough': { min: 4.8, max: 7.2 }
  };

  // Temperature adjustment factor
  // Every 17°F difference changes time by approximately 50%
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.5, tempDiff / 17);

  // Hydration adjustment factor
  // Higher hydration speeds up fermentation
  const hydrationDiff = hydrationPercentage - 65;
  const hydrationFactor = Math.pow(0.95, hydrationDiff / 5);

  const base = baseProofingTimes[yeastType];
  
  return {
    minHours: Math.max(base.min * tempFactor * hydrationFactor, 0.5),
    maxHours: Math.max(base.max * tempFactor * hydrationFactor, 1)
  };
};

export const calculateConversion = (
  amount: string,
  fromType: YeastType,
  toType: YeastType,
  useTsp: boolean = false
): string => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return '';
  
  const conversionFactors = {
    'active-dry': { 'instant': 0.75, 'fresh': 2.5, 'sourdough': 20 },
    'instant': { 'active-dry': 1.33, 'fresh': 3.33, 'sourdough': 26.67 },
    'fresh': { 'active-dry': 0.4, 'instant': 0.3, 'sourdough': 8 },
    'sourdough': { 'active-dry': 0.05, 'instant': 0.0375, 'fresh': 0.125 }
  };

  if (fromType === toType) return amount;
  
  const factor = conversionFactors[fromType]?.[toType];
  if (!factor) return '';
  
  const result = numAmount * factor;
  return result.toFixed(2);
};

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 65) {
    return 'Increase proofing time by 50%';
  } else if (temperature > 85) {
    return 'Decrease proofing time by 50%';
  }
  return 'Temperature is in optimal range';
};

export const calculateHydrationAdjustment = (
  hydration: number,
  result: number,
  fromType: YeastType,
  toType: YeastType
): { flourAdjustment: number; waterAdjustment: number; showAdjustments: boolean } => {
  const showAdjustments = fromType === 'sourdough' || toType === 'sourdough';
  
  if (!showAdjustments) {
    return { flourAdjustment: 0, waterAdjustment: 0, showAdjustments: false };
  }

  const flourAdjustment = result * (hydration / (100 + hydration));
  const waterAdjustment = result * (100 / (100 + hydration));

  return {
    flourAdjustment: parseFloat(flourAdjustment.toFixed(2)),
    waterAdjustment: parseFloat(waterAdjustment.toFixed(2)),
    showAdjustments: true
  };
};

// Alias for calculateProofingTime to maintain compatibility
export const calculateFermentationTime = calculateProofingTime;