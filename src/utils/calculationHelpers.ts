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