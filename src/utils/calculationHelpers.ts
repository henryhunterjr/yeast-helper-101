import { YeastType } from './yeastTypes';

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 70) {
    return "Increase proofing time by 25%";
  } else if (temperature > 80) {
    return "Decrease proofing time by 25%";
  }
  return "Standard proofing time";
};

export const calculateHydrationAdjustment = (
  hydration: number,
  amount: number,
  fromType: YeastType,
  toType: YeastType
) => {
  const showAdjustments = fromType === 'sourdough' || toType === 'sourdough';
  
  if (!showAdjustments) {
    return {
      flourAdjustment: 0,
      waterAdjustment: 0,
      showAdjustments: false
    };
  }

  const flourRatio = 1 / (1 + hydration/100);
  const waterRatio = (hydration/100) / (1 + hydration/100);
  
  const sourdoughAmount = toType === 'sourdough' ? amount : -amount;
  
  return {
    flourAdjustment: sourdoughAmount * flourRatio,
    waterAdjustment: sourdoughAmount * waterRatio,
    showAdjustments: true
  };
};

export const calculateProofingTime = (
  fromType: YeastType,
  hydration: number,
  temperature: number,
  starterStrength: 'strong' | 'moderate' | 'weak' = 'moderate'
): { minHours: number; maxHours: number } => {
  let baseTime = {
    min: fromType === 'sourdough' ? 4 : 1.5,
    max: fromType === 'sourdough' ? 6 : 2.5
  };

  const tempFactor = Math.pow(0.8, (temperature - 75) / 10);
  const hydrationFactor = Math.pow(0.9, (hydration - 65) / 10);
  
  const strengthMultiplier = starterStrength === 'strong' ? 0.8 :
                            starterStrength === 'weak' ? 1.2 : 1;

  return {
    minHours: Math.round(baseTime.min * tempFactor * hydrationFactor * strengthMultiplier),
    maxHours: Math.round(baseTime.max * tempFactor * hydrationFactor * strengthMultiplier)
  };
};