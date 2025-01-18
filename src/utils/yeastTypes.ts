export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter',
  'bread-machine': 'Bread Machine Yeast'
} as const;

export const conversionFactors = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 2.5,
    'sourdough': 13.0,
    'bread-machine': 0.75
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 3.33,
    'sourdough': 16.0,
    'bread-machine': 1.0
  },
  'fresh': {
    'active-dry': 0.4,
    'instant': 0.3,
    'sourdough': 4.0,
    'bread-machine': 0.225 // 0.3 × 0.75
  },
  'sourdough': {
    'active-dry': 0.0769,
    'instant': 0.0625,
    'fresh': 0.25,
    'bread-machine': 0.0625
  },
  'bread-machine': {
    'active-dry': 1.33,
    'instant': 1.0,
    'fresh': 4.44,
    'sourdough': 16.0
  }
};

export const tspToGramConversion = {
  'active-dry': 3.1,
  'instant': 3.3,
  'fresh': 10,
  'bread-machine': 3.3,
  'sourdough': null // Sourdough is always measured in grams
} as const;

export const getWaterTemperature = (
  roomTemp: number,
  flourTemp: number = roomTemp,
  starterTemp: number = roomTemp,
  desiredDoughTemp: number = 72
): number => {
  // Water Temp = (Desired Dough Temp × 4) − (Flour Temp + Room Temp + Starter Temp)
  return (desiredDoughTemp * 4) - (flourTemp + roomTemp + starterTemp);
};

export const getFermentationTimeRange = (
  temperature: number,
  hydration: number
): { minHours: number; maxHours: number } => {
  // Base times based on hydration
  let baseMin = 6;
  let baseMax = 8;
  
  if (hydration > 75) {
    baseMin = 3;
    baseMax = 5;
  } else if (hydration > 65) {
    baseMin = 4;
    baseMax = 6;
  }

  // Temperature adjustment (20% per 5°F difference)
  const tempDiff = temperature - 72;
  const tempAdjustment = 1 + (tempDiff / 5 * 0.2);
  
  return {
    minHours: Math.max(1, Math.round(baseMin / tempAdjustment)),
    maxHours: Math.round(baseMax / tempAdjustment)
  };
};

export const calculateHydrationWithStarter = (
  flourWeight: number,
  waterWeight: number,
  starterWeight: number,
  starterHydration: number
): number => {
  const starterFlour = starterWeight / (1 + starterHydration / 100);
  const starterWater = starterWeight - starterFlour;
  
  const totalFlour = flourWeight + starterFlour;
  const totalWater = waterWeight + starterWater;
  
  return (totalWater / totalFlour) * 100;
};

export const convertToTeaspoons = (grams: number, yeastType: keyof typeof yeastTypes): number | null => {
  const conversionFactor = tspToGramConversion[yeastType];
  if (!conversionFactor) return null;
  return Number((grams / conversionFactor).toFixed(2));
};

export const convertFromTeaspoons = (tsp: number, yeastType: keyof typeof yeastTypes): number | null => {
  const conversionFactor = tspToGramConversion[yeastType];
  if (!conversionFactor) return null;
  return Number((tsp * conversionFactor).toFixed(2));
};
