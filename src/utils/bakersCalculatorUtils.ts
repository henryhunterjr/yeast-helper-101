interface CalculatorInputs {
  flour: number;
  hydration: number;
  starterPercentage: number;
  saltPercentage: number;
  starterWeight: number;
  starterHydration: number;
}

interface CalculatorResults {
  flour: number;
  water: number;
  starter: number;
  salt: number;
  totalWeight: number;
  error?: string;
}

export function calculateWater(flour: number, hydration: number): number {
  if (flour < 0 || hydration < 50 || hydration > 120) {
    throw new Error("Invalid input: Flour must be non-negative and hydration must be between 50% and 120%.");
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

export function recalculateIngredients(inputs: CalculatorInputs): CalculatorResults {
  try {
    const {
      flour,
      hydration,
      starterPercentage,
      saltPercentage,
      starterWeight,
      starterHydration,
    } = inputs;

    if (!flour && !starterWeight) {
      throw new Error("Either flour weight or starter weight must be provided.");
    }

    if (hydration < 50 || hydration > 120) {
      throw new Error("Hydration must be between 50% and 120%.");
    }

    if (starterPercentage < 0 || starterPercentage > 50) {
      throw new Error("Starter percentage must be between 0% and 50%.");
    }

    if (saltPercentage < 0 || saltPercentage > 5) {
      throw new Error("Salt percentage must be between 0% and 5%.");
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

    return {
      flour: calculatedFlour,
      water: calculatedWater,
      starter: calculatedStarter,
      salt: calculatedSalt,
      totalWeight: calculatedFlour + calculatedWater + calculatedStarter + calculatedSalt,
    };
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