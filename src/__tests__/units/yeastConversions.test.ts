import { describe, it, expect } from 'vitest';
import { 
  calculateYeastConversion,
  adjustForTemperature,
  adjustForHydration,
  validateInputs
} from '../../utils/yeastCalculations';

describe('Yeast Conversion Calculations', () => {
  describe('Basic Conversions', () => {
    it('should convert active dry to instant yeast correctly', () => {
      const result = calculateYeastConversion(10, 'active-dry', 'instant');
      expect(result).toBe(10);
    });

    it('should convert active dry to fresh yeast correctly', () => {
      const result = calculateYeastConversion(10, 'active-dry', 'fresh');
      expect(result).toBe(33.3);
    });

    it('should handle small amount conversions differently', () => {
      const result = calculateYeastConversion(5, 'active-dry', 'instant');
      expect(result.simplified).toBe(true);
    });
  });

  describe('Temperature Adjustments', () => {
    it('should adjust for high temperatures', () => {
      const adjustment = adjustForTemperature(85);
      expect(adjustment).toBe(0.9);
    });

    it('should adjust for low temperatures', () => {
      const adjustment = adjustForTemperature(65);
      expect(adjustment).toBe(1.1);
    });
  });

  describe('Hydration Adjustments', () => {
    it('should calculate correct hydration adjustments', () => {
      const { flour, water } = adjustForHydration(100, 100);
      expect(flour).toBe(50);
      expect(water).toBe(50);
    });

    it('should handle different hydration levels', () => {
      const { flour, water } = adjustForHydration(100, 80);
      expect(flour).toBe(55.56);
      expect(water).toBe(44.44);
    });
  });

  describe('Input Validation', () => {
    it('should validate temperature ranges', () => {
      expect(validateInputs({ temperature: 120 })).toBe(false);
      expect(validateInputs({ temperature: 72 })).toBe(true);
    });

    it('should validate hydration ranges', () => {
      expect(validateInputs({ hydration: 200 })).toBe(false);
      expect(validateInputs({ hydration: 100 })).toBe(true);
    });
  });
});