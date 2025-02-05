import { describe, it, expect } from 'vitest';
import { 
  calculateConversion,
  calculateTemperatureMultiplier,
  calculateHydrationMultiplier,
  TEMPERATURE_RANGES
} from '../../utils/yeastCalculations';

describe('Yeast Conversion Calculations', () => {
  describe('Basic Conversions', () => {
    it('should convert active dry to instant yeast correctly', () => {
      const result = calculateConversion('10', 'active-dry', 'instant', false, 72, 100, 'moderate');
      expect(result.result).toBe('10.00');
    });

    it('should convert active dry to fresh yeast correctly', () => {
      const result = calculateConversion('10', 'active-dry', 'fresh', false, 72, 100, 'moderate');
      expect(result.result).toBe('33.30');
    });

    it('should handle small amount conversions differently', () => {
      const result = calculateConversion('5', 'active-dry', 'instant', false, 72, 100, 'moderate');
      expect(result.isSimplified).toBe(true);
    });
  });

  describe('Temperature Adjustments', () => {
    it('should adjust for high temperatures', () => {
      const adjustment = calculateTemperatureMultiplier(85);
      expect(adjustment).toBeCloseTo(0.8, 1);
    });

    it('should adjust for low temperatures', () => {
      const adjustment = calculateTemperatureMultiplier(65);
      expect(adjustment).toBeCloseTo(1.2, 1);
    });
  });

  describe('Hydration Adjustments', () => {
    it('should calculate correct hydration multiplier', () => {
      const multiplier = calculateHydrationMultiplier(100);
      expect(multiplier).toBeCloseTo(0.729, 3);
    });

    it('should handle different hydration levels', () => {
      const multiplier = calculateHydrationMultiplier(80);
      expect(multiplier).toBeCloseTo(0.843, 3);
    });
  });

  describe('Temperature Ranges', () => {
    it('should have correct temperature ranges for standard yeast', () => {
      expect(TEMPERATURE_RANGES.STANDARD.MIN).toBe(75);
      expect(TEMPERATURE_RANGES.STANDARD.MAX).toBe(80);
    });

    it('should have correct temperature ranges for sourdough', () => {
      expect(TEMPERATURE_RANGES.SOURDOUGH.MIN).toBe(78);
      expect(TEMPERATURE_RANGES.SOURDOUGH.MAX).toBe(82);
    });
  });
});