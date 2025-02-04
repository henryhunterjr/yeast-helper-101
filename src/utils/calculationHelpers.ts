export const calculateTemperatureMultiplier = (temperature: number): number => {
  const tempDiff = temperature - 72;
  return Math.pow(0.85, tempDiff / 10);
};

export const calculateHydrationMultiplier = (hydration: number): number => {
  const hydrationDiff = hydration - 65;
  return Math.pow(0.95, hydrationDiff / 10);
};

export const getStarterStrengthMultiplier = (strength: 'strong' | 'moderate' | 'weak'): number => {
  const multipliers = {
    'strong': 0.8,
    'moderate': 1.0,
    'weak': 1.3
  };
  return multipliers[strength];
};

export const memoizedCalculation = <T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};