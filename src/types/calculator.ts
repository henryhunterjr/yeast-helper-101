export interface CalculatorInputs {
  flour?: number;
  hydration: number;
  starterPercentage: number;
  saltPercentage: number;
  starterWeight?: number;
  starterHydration?: number;
  unit?: 'g' | 'oz';
}

export interface CalculatorResults {
  flour: number;
  water: number;
  starter: number;
  salt: number;
  totalWeight: number;
  error?: string;
}