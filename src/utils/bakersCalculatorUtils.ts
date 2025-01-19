interface CalculatorInputs {
  flour: number;
  hydration: number;
  starterPercentage: number;
  saltPercentage: number;
  starterWeight?: number;
  starterHydration?: number;
  unit?: 'g' | 'oz';
}

interface CalculatorResults {
  flour: number;
  water: number;
  starter: number;
  salt: number;
  totalWeight: number;
  error?: string;
}

const CONVERSION = {
  gToOz: 0.03527396,
  ozToG: 28.3495,
};

export function calculateWater(flour: number, hydration: number): number {
  if (flour < 0 || hydration < 0 || hydration > 100) {
    throw new Error("Invalid input: Flour must be non-negative and hydration must be between 0% and 100%");
  }
  return (flour * hydration) / 100;
}

export function calculateStarter(flour: number, starterPercentage: number): number {
  return (flour * starterPercentage) / 100;
}

export function calculateSalt(flour: number, saltPercentage: number): number {
  return (flour * saltPercentage) / 100;
}

export function calculateStarterContributions(starterWeight: number, starterHydration: number) {
  const flourFromStarter = (starterWeight * 100) / (100 + starterHydration);
  const waterFromStarter = starterWeight - flourFromStarter;
  return { flourFromStarter, waterFromStarter };
}

export function convertUnits(value: number, from: 'g' | 'oz', to: 'g' | 'oz'): number {
  if (from === to) return value;
  const factor = from === 'g' ? CONVERSION.gToOz : CONVERSION.ozToG;
  return Number((value * factor).toFixed(2));
}

export function recalculateIngredients(inputs: CalculatorInputs): CalculatorResults {
  try {
    const {
      flour,
      hydration,
      starterPercentage,
      saltPercentage,
      starterWeight,
      starterHydration = 100,
      unit = 'g'
    } = inputs;

    if (!flour && !starterWeight) {
      throw new Error("Either flour weight or starter weight must be provided");
    }

    if (hydration < 0 || hydration > 100) {
      throw new Error("Hydration must be between 0% and 100%");
    }

    if (starterPercentage < 0 || starterPercentage > 100) {
      throw new Error("Starter percentage must be between 0% and 100%");
    }

    if (saltPercentage < 0 || saltPercentage > 100) {
      throw new Error("Salt percentage must be between 0% and 100%");
    }

    let calculatedFlour = flour || 0;
    let calculatedWater = calculateWater(calculatedFlour, hydration);
    let calculatedStarter = calculateStarter(calculatedFlour, starterPercentage);
    let calculatedSalt = calculateSalt(calculatedFlour, saltPercentage);

    if (starterWeight) {
      const contributions = calculateStarterContributions(starterWeight, starterHydration);
      if (!flour) {
        calculatedFlour = contributions.flourFromStarter * (100 / (100 - starterPercentage));
      }
      calculatedWater -= contributions.waterFromStarter;
    }

    let results: CalculatorResults = {
      flour: calculatedFlour,
      water: calculatedWater,
      starter: calculatedStarter,
      salt: calculatedSalt,
      totalWeight: calculatedFlour + calculatedWater + calculatedStarter + calculatedSalt,
    };

    if (unit === 'oz') {
      results = {
        flour: convertUnits(results.flour, 'g', 'oz'),
        water: convertUnits(results.water, 'g', 'oz'),
        starter: convertUnits(results.starter, 'g', 'oz'),
        salt: convertUnits(results.salt, 'g', 'oz'),
        totalWeight: convertUnits(results.totalWeight, 'g', 'oz'),
      };
    }

    return results;
  } catch (error) {
    console.error("Error in recalculateIngredients:", error instanceof Error ? error.message : String(error));
    return {
      flour: 0,
      water: 0,
      starter: 0,
      salt: 0,
      totalWeight: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}