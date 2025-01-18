import { describe, it, expect } from 'vitest';
import { 
  calculateConversion, 
  getTemperatureAdjustment, 
  calculateHydrationAdjustment 
} from '../../utils/yeastCalculations';

describe('Yeast Calculations', () => {
  describe('calculateConversion', () => {
    it('should correctly convert active dry to instant yeast', () => {
      const result = calculateConversion('10', 'active-dry', 'instant');
      expect(result).toBe('7.50');
    });

    it('should throw error for invalid amounts', () => {
      expect(() => calculateConversion('-1', 'active-dry', 'instant')).toThrow();
    });
  });

  describe('getTemperatureAdjustment', () => {
    it('should return standard proofing time for optimal temperature', () => {
      expect(getTemperatureAdjustment(72)).toBe('Standard proofing time');
    });

    it('should suggest increased proofing time for cold temperatures', () => {
      const result = getTemperatureAdjustment(62);
      expect(result).toContain('Increase proofing time');
    });
  });

  describe('calculateHydrationAdjustment', () => {
    it('should calculate correct hydration adjustments for sourdough conversion', () => {
      const result = calculateHydrationAdjustment(100, 10, 'active-dry', 'sourdough');
      expect(result.showAdjustments).toBe(true);
      expect(result.flourAdjustment).toBeDefined();
      expect(result.waterAdjustment).toBeDefined();
    });
  });
});