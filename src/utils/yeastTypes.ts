export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export const conversionFactors = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 2.5,
    'sourdough': 6.0
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 3.33,
    'sourdough': 8.0
  },
  'fresh': {
    'active-dry': 0.4,
    'instant': 0.3,
    'sourdough': 2.4
  },
  'sourdough': {
    'active-dry': 0.167,
    'instant': 0.125,
    'fresh': 0.417
  }
};

export const getWaterTemperature = (
  roomTemp: number,
  flourTemp: number = roomTemp,
  starterTemp: number = roomTemp,
  desiredDoughTemp: number = 72
): number => {
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