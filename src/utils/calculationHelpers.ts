import { YeastType } from './yeastTypes';

export const calculateTemperatureMultiplier = (temperature: number): number => {
  return Math.pow(0.8, (temperature - 75) / 10);
};

export const calculateHydrationMultiplier = (hydration: number): number => {
  return Math.pow(0.9, (hydration - 65) / 10);
};

export const getStarterStrengthMultiplier = (strength: 'strong' | 'moderate' | 'weak'): number => {
  switch (strength) {
    case 'strong':
      return 0.8;
    case 'weak':
      return 1.2;
    default:
      return 1;
  }
};

export const memoizedCalculation = <T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const getTemperatureAdjustment = (temperature: number): string => {
  if (temperature < 70) {
    return "Increase proofing time by 10-15%";
  } else if (temperature > 80) {
    return "Decrease proofing time by 10-15%";
  }
  return "Temperature is in optimal range";
};

export const calculateHydrationAdjustment = (
  hydration: number,
  amount: number,
  fromType: YeastType,
  toType: YeastType
): {
  flourAdjustment: number;
  waterAdjustment: number;
  showAdjustments: boolean;
} => {
  const baseHydration = 100;
  const hydrationDiff = hydration - baseHydration;
  
  if (fromType === toType || (!['sourdough'].includes(fromType) && !['sourdough'].includes(toType))) {
    return {
      flourAdjustment: 0,
      waterAdjustment: 0,
      showAdjustments: false
    };
  }
  
  return {
    flourAdjustment: amount * (hydrationDiff / 100),
    waterAdjustment: amount * (hydrationDiff / 100),
    showAdjustments: true
  };
};

export const calculateProofingTime = (
  yeastType: YeastType,
  hydration: number,
  temperature: number,
  starterStrength: 'strong' | 'moderate' | 'weak' = 'moderate'
): { minHours: number; maxHours: number } => {
  const tempMultiplier = calculateTemperatureMultiplier(temperature);
  const hydrationMultiplier = calculateHydrationMultiplier(hydration);
  const strengthMultiplier = getStarterStrengthMultiplier(starterStrength);

  const baseTime = {
    minHours: yeastType === 'sourdough' ? 4 : 1.5,
    maxHours: yeastType === 'sourdough' ? 6 : 2.5
  };

  return {
    minHours: baseTime.minHours * tempMultiplier * hydrationMultiplier * strengthMultiplier,
    maxHours: baseTime.maxHours * tempMultiplier * hydrationMultiplier * strengthMultiplier
  };
};