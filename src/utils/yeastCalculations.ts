export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

const conversionFactors = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 3,
    'sourdough': 14
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 4,
    'sourdough': 18.67
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'sourdough': 4.67
  },
  'sourdough': {
    'active-dry': 0.071,
    'instant': 0.054,
    'fresh': 0.214
  }
};

const BASE_TEMPERATURE = 72; // °F
const BASE_HYDRATION = 100; // %
const MIN_TEMP = 32;
const MAX_TEMP = 120;
const MIN_HYDRATION = 50;
const MAX_HYDRATION = 200;
const MIN_AMOUNT = 0.1;
const MAX_AMOUNT = 1000;

export const validateAmount = (amount: number): string | null => {
  if (isNaN(amount)) return "Please enter a valid number";
  if (amount < MIN_AMOUNT) return `Minimum amount is ${MIN_AMOUNT}g`;
  if (amount > MAX_AMOUNT) return `Maximum amount is ${MAX_AMOUNT}g`;
  return null;
};

export const validateTemperature = (temp: number): string | null => {
  if (isNaN(temp)) return "Please enter a valid temperature";
  if (temp < MIN_TEMP) return `Minimum temperature is ${MIN_TEMP}°F`;
  if (temp > MAX_TEMP) return `Maximum temperature is ${MAX_TEMP}°F`;
  return null;
};

export const validateHydration = (hydration: number): string | null => {
  if (isNaN(hydration)) return "Please enter a valid hydration percentage";
  if (hydration < MIN_HYDRATION) return `Minimum hydration is ${MIN_HYDRATION}%`;
  if (hydration > MAX_HYDRATION) return `Maximum hydration is ${MAX_HYDRATION}%`;
  return null;
};

export const calculateConversion = (
  amount: string,
  fromType: string,
  toType: string
): string => {
  const numAmount = parseFloat(amount);
  
  // Input validation
  const amountError = validateAmount(numAmount);
  if (amountError) throw new Error(amountError);
  
  // Same type conversion
  if (fromType === toType) return amount;

  // Check if conversion is possible
  const factor = conversionFactors[fromType as keyof typeof conversionFactors]?.[toType as keyof typeof conversionFactors[keyof typeof conversionFactors]];
  if (!factor) throw new Error(`Cannot convert from ${yeastTypes[fromType as keyof typeof yeastTypes]} to ${yeastTypes[toType as keyof typeof yeastTypes]}`);

  // Handle very small amounts
  const result = numAmount * factor;
  if (result < MIN_AMOUNT) {
    throw new Error(`Resulting amount (${result.toFixed(3)}g) is too small. Minimum is ${MIN_AMOUNT}g`);
  }

  // Handle very large amounts
  if (result > MAX_AMOUNT) {
    throw new Error(`Resulting amount (${result.toFixed(2)}g) is too large. Maximum is ${MAX_AMOUNT}g`);
  }

  return result.toFixed(2);
};

export const getTemperatureAdjustment = (temperature: number): string => {
  // Validate temperature
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
} => {
  // Validate hydration
  const hydrationError = validateHydration(hydration);
  if (hydrationError) throw new Error(hydrationError);

  // Only show adjustments when converting to/from sourdough
  const showAdjustments = fromType === 'sourdough' || toType === 'sourdough';

  if (!showAdjustments) {
    return {
      flourAdjustment: 0,
      waterAdjustment: 0,
      showAdjustments: false
    };
  }

  // Calculate adjustments based on sourdough conversion
  const sourdoughAmount = toType === 'sourdough' ? weight : -weight;
  
  // For 100% hydration starter, each gram contains 0.5g flour and 0.5g water
  const flourAdjustment = -sourdoughAmount * 0.5;
  const waterAdjustment = -sourdoughAmount * 0.5;

  // Validate final adjustments
  if (Math.abs(flourAdjustment) > MAX_AMOUNT || Math.abs(waterAdjustment) > MAX_AMOUNT) {
    throw new Error('Adjustment amounts exceed maximum allowed values');
  }

  return {
    flourAdjustment,
    waterAdjustment,
    showAdjustments: true
  };
};

export const calculateFermentationTime = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  // Validate inputs
  const tempError = validateTemperature(temperature);
  if (tempError) throw new Error(tempError);
  
  const hydrationError = validateHydration(hydration);
  if (hydrationError) throw new Error(hydrationError);

  let baseTime = 6;
  const tempFactor = Math.pow(2, (temperature - BASE_TEMPERATURE) / 10);
  baseTime /= tempFactor;
  const hydrationFactor = 1 + (hydration - BASE_HYDRATION) / 100;
  baseTime /= hydrationFactor;

  return {
    minHours: Math.max(1, Math.round(baseTime * 0.75)),
    maxHours: Math.round(baseTime * 1.25)
  };
};