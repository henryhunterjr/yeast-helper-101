export interface Ingredient {
  id: string;
  name: string;
  weight: number;
  percentage?: number;
  isCustom?: boolean;
}

export interface Recipe {
  flour: number;
  ingredients: Ingredient[];
  unit: 'g' | 'oz';
}

export type IngredientType = 'water' | 'salt' | 'yeast' | 'custom';

export const DEFAULT_PERCENTAGES = {
  water: 65,
  salt: 2,
  yeast: 1,
} as const;

export const TYPICAL_RANGES = {
  water: { min: 50, max: 100, warning: 'Hydration is outside typical range (50-100%)' },
  salt: { min: 1.5, max: 2.5, warning: 'Salt percentage is outside typical range (1.5-2.5%)' },
  yeast: { min: 0.5, max: 2, warning: 'Yeast percentage is outside typical range (0.5-2%)' },
} as const;

export const UNIT_CONVERSION = {
  gToOz: 0.03527396,
  ozToG: 28.3495,
} as const;