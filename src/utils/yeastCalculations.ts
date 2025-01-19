export type YeastType = 'active-dry' | 'instant' | 'fresh' | 'sourdough';

export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export const calculateWaterTemperature = (
  roomTemp: number,
  yeastType: YeastType
): number => {
  const desiredTemp = yeastType === 'sourdough' ? 78 : 75;
  const waterTemp = (desiredTemp * 3) - roomTemp;
  
  if (yeastType === 'sourdough') {
    return Math.min(Math.max(waterTemp, 78), 82);
  }
  return Math.min(Math.max(waterTemp, 75), 80);
};

interface ProofingTime {
  minHours: number;
  maxHours: number;
}

export const calculateProofingTime = (
  yeastType: YeastType,
  hydrationPercentage: number,
  temperature: number = 72
): ProofingTime => {
  // Base calculation for active dry yeast
  const baseTime = 2.5;
  const hydrationFactor = (100 - hydrationPercentage) / 50;
  const tempFactor = Math.max(0.5, (72 - temperature) / 20);
  
  let minTime = (baseTime - hydrationFactor) * (1 + tempFactor);
  let maxTime = (baseTime + hydrationFactor) * (1 + tempFactor);

  // Adjust times based on yeast type
  switch (yeastType) {
    case 'instant':
      minTime *= 0.75;
      maxTime *= 0.75;
      break;
    case 'fresh':
      minTime *= 1.1;
      maxTime *= 1.1;
      break;
    case 'sourdough':
      minTime = (hydrationPercentage / 100) * 4 * (1 + tempFactor);
      maxTime = (hydrationPercentage / 100) * 6 * (1 + tempFactor);
      break;
  }

  return {
    minHours: Math.max(minTime, 0.5),
    maxHours: Math.max(maxTime, 1)
  };
};

// Helper functions for specific yeast types
export const calculateActiveProofingTime = (hydrationPercentage: number): ProofingTime => 
  calculateProofingTime('active-dry', hydrationPercentage);

export const calculateInstantProofingTime = (hydrationPercentage: number): ProofingTime => 
  calculateProofingTime('instant', hydrationPercentage);

export const calculateFreshProofingTime = (hydrationPercentage: number): ProofingTime => 
  calculateProofingTime('fresh', hydrationPercentage);

export const calculateSourdoughProofingTime = (hydrationPercentage: number): ProofingTime => 
  calculateProofingTime('sourdough', hydrationPercentage);

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
  if (temperature < 65) return 'cold';
  if (temperature > 85) return 'hot';
  return 'optimal';
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