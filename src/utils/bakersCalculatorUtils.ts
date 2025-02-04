import { CalculatorInputs, CalculatorResults } from '../types/calculator';

export const calculateStarterContributions = (starterWeight: number, starterHydration: number) => {
  if (!starterWeight) return { flour: 0, water: 0 };
  
  const totalParts = 1 + (starterHydration / 100);
  const flourPart = 1 / totalParts;
  
  const flourContribution = starterWeight * flourPart;
  const waterContribution = starterWeight * (1 - flourPart);

  return {
    flour: flourContribution,
    water: waterContribution,
  };
};

export const validateCalculatorInputs = (inputs: CalculatorInputs): string[] => {
  const warnings: string[] = [];
  
  if (!inputs.flour || inputs.flour <= 0) {
    warnings.push('Flour weight must be greater than 0');
  }
  
  if (!inputs.water || inputs.water < 0) {
    warnings.push('Water weight cannot be negative');
  }
  
  if (!inputs.starter?.weight || inputs.starter.weight < 0) {
    warnings.push('Starter weight cannot be negative');
  }
  
  if (!inputs.salt || inputs.salt < 0) {
    warnings.push('Salt weight cannot be negative');
  }
  
  if (inputs.hydrationTarget < 50 || inputs.hydrationTarget > 100) {
    warnings.push('Hydration target should be between 50% and 100%');
  }
  
  return warnings;
};

export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const { flour, water, starter, salt, hydrationTarget } = inputs;
  
  const { flour: flourFromStarter, water: waterFromStarter } = calculateStarterContributions(
    starter.weight,
    starter.hydration
  );
  
  const totalFlour = flour + flourFromStarter;
  const totalWater = water + waterFromStarter;
  const hydrationPercentage = (totalWater / totalFlour) * 100;
  
  return {
    water,
    starter: starter.weight,
    salt,
    flourFromStarter,
    waterFromStarter,
    totalWeight: flour + water + starter.weight + salt,
    hydrationPercentage
  };
};