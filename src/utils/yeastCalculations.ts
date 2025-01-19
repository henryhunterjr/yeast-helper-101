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

const calculateActiveProofingTime = (hydrationPercentage: number): ProofingTime => {
  const baseTime = 2.5;
  const variation = (100 - hydrationPercentage) / 50;
  
  return {
    minHours: Math.round((baseTime - variation) * 10) / 10,
    maxHours: Math.round((baseTime + variation) * 10) / 10
  };
};

export const calculateWaterTemperature = (
  roomTemp: number,
  yeastType: YeastType
): number => {
  const desiredTemp = yeastType === 'sourdough' ? 78 : 75;
  const waterTemp = (desiredTemp * 3) - roomTemp;
  
  // Apply caps based on yeast type
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
  // Temperature adjustment factor (every 17°F difference changes time by ~50%)
  const tempDiff = temperature - 72;
  const tempFactor = Math.pow(0.5, tempDiff / 17);
  
  let minHours: number;
  let maxHours: number;
  
  switch (yeastType) {
    case 'instant':
      const activeTime = calculateActiveProofingTime(hydrationPercentage);
      minHours = activeTime.minHours * 0.75;
      maxHours = activeTime.maxHours * 0.75;
      break;
    case 'fresh':
      const freshTime = calculateActiveProofingTime(hydrationPercentage);
      minHours = freshTime.minHours * 1.1;
      maxHours = freshTime.maxHours * 1.1;
      break;
    case 'sourdough':
      const baseTime = (hydrationPercentage / 100) * 6;
      minHours = baseTime * 0.8;
      maxHours = baseTime * 1.2;
      break;
    default: // active-dry
      const defaultTime = calculateActiveProofingTime(hydrationPercentage);
      minHours = defaultTime.minHours;
      maxHours = defaultTime.maxHours;
  }
  
  // Apply temperature factor and round to 1 decimal
  return {
    minHours: Math.round(minHours * tempFactor * 10) / 10,
    maxHours: Math.round(maxHours * tempFactor * 10) / 10
  };
};

// Alias for backward compatibility
export const calculateFermentationTime = calculateProofingTime;

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 68) return "Increase proofing time by 15-20%";
  if (temperature > 76) return "Decrease proofing time by 15-20%";
  return "Temperature is in optimal range";
};

export const calculateHydrationAdjustment = (
  hydrationPercentage: number,
  amount: number,
  fromType: YeastType,
  toType: YeastType
): { flourAdjustment: number; waterAdjustment: number; showAdjustments: boolean; } => {
  if (toType !== 'sourdough') return {
    flourAdjustment: 0,
    waterAdjustment: 0,
    showAdjustments: false
  };
  
  const flourNeeded = amount * (100 / hydrationPercentage);
  const waterNeeded = amount - flourNeeded;
  
  return {
    flourAdjustment: Math.round(flourNeeded * 10) / 10,
    waterAdjustment: Math.round(waterNeeded * 10) / 10,
    showAdjustments: true
  };
};

export const calculateConversion = (
  amount: string | number,
  fromType: YeastType,
  toType: YeastType,
  useTsp: boolean = false
): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount) || numAmount <= 0) {
    throw new Error("Invalid amount");
  }

  const conversionRates: Record<YeastType, Record<YeastType, number>> = {
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

  if (fromType === toType) return numAmount.toString();
  
  const rate = conversionRates[fromType][toType];
  if (!rate) throw new Error("Invalid conversion");
  
  const result = numAmount * rate;
  const rounded = Math.round(result * 100) / 100;
  
  if (useTsp) {
    // Convert to teaspoons (approximate conversion)
    const tsp = rounded * 3;
    return `${Math.round(tsp * 10) / 10}`;
  }
  
  return rounded.toString();
};