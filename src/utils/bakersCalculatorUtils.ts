import { CalculatorInputs, CalculatorResults } from '../types/calculator';

export const calculateStarterContributions = (starterWeight: number, starterHydration: number) => {
  const flourFromStarter = starterWeight / (1 + starterHydration / 100);
  const waterFromStarter = starterWeight - flourFromStarter;
  
  return {
    flour: flourFromStarter,
    water: waterFromStarter
  };
};

export const validateCalculatorInputs = (inputs: CalculatorInputs): string[] => {
  const warnings: string[] = [];
  
  if (inputs.flour <= 0) {
    warnings.push('Flour weight must be greater than 0');
  }
  
  if (inputs.water < 0) {
    warnings.push('Water weight cannot be negative');
  }
  
  if (inputs.starter.weight < 0) {
    warnings.push('Starter weight cannot be negative');
  }
  
  if (inputs.salt < 0) {
    warnings.push('Salt weight cannot be negative');
  }
  
  return warnings;
};

export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const { flour, water, starter, salt, hydrationTarget } = inputs;
  const { flour: flourFromStarter, water: waterFromStarter } = calculateStarterContributions(
    starter.weight,
    starter.hydration
  );
  
  return {
    water,
    starter: starter.weight,
    salt,
    flourFromStarter,
    waterFromStarter,
    totalWeight: flour + water + starter.weight + salt
  };
};