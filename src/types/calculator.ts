export interface CalculatorInputs {
  flour: number;
  water: number;
  starter: {
    weight: number;
    hydration: number;
  };
  salt: number;
  hydrationTarget: number;
  unit: 'g' | 'oz';
}

export interface CalculatorResults {
  water: number;
  starter: number;
  salt: number;
  flourFromStarter: number;
  waterFromStarter: number;
  totalWeight: number;
  hydrationPercentage?: number;
}