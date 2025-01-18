import { describe, it, expect } from 'vitest';
import { 
  calculateConversion, 
  getTemperatureAdjustment, 
  calculateHydrationAdjustment,
  calculateFermentationTime
} from '../../utils/yeastCalculations';

describe('Yeast Calculations', () => {
  describe('calculateConversion', () => {
    it('should correctly convert active dry to instant yeast', () => {
      const result = calculateConversion('10', 'active-dry', 'instant');
      expect(result).toBe('7.50');
    });

    it('should correctly convert instant to fresh yeast', () => {
      const result = calculateConversion('10', 'instant', 'fresh');
      expect(result).toBe('40.00');
    });

    it('should correctly convert fresh to sourdough starter', () => {
      const result = calculateConversion('10', 'fresh', 'sourdough');
      expect(result).toBe('46.70');
    });

    it('should throw error for invalid amounts', () => {
      expect(() => calculateConversion('-1', 'active-dry', 'instant')).toThrow();
      expect(() => calculateConversion('1001', 'active-dry', 'instant')).toThrow();
      expect(() => calculateConversion('abc', 'active-dry', 'instant')).toThrow();
    });

    it('should handle same type conversion', () => {
      const result = calculateConversion('10', 'instant', 'instant');
      expect(result).toBe('10');
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

    it('should suggest decreased proofing time for warm temperatures', () => {
      const result = getTemperatureAdjustment(82);
      expect(result).toContain('Decrease proofing time');
    });

    it('should throw error for invalid temperatures', () => {
      expect(() => getTemperatureAdjustment(31)).toThrow();
      expect(() => getTemperatureAdjustment(121)).toThrow();
    });
  });

  describe('calculateHydrationAdjustment', () => {
    it('should calculate correct hydration adjustments for sourdough conversion', () => {
      const result = calculateHydrationAdjustment(100, 10, 'active-dry', 'sourdough');
      expect(result.showAdjustments).toBe(true);
      expect(result.flourAdjustment).toBeDefined();
      expect(result.waterAdjustment).toBeDefined();
    });

    it('should not show adjustments for non-sourdough conversions', () => {
      const result = calculateHydrationAdjustment(100, 10, 'active-dry', 'instant');
      expect(result.showAdjustments).toBe(false);
    });

    it('should handle different hydration levels', () => {
      const result = calculateHydrationAdjustment(80, 10, 'active-dry', 'sourdough');
      expect(result.flourAdjustment).toBeDefined();
      expect(result.waterAdjustment).toBeDefined();
    });

    it('should throw error for invalid hydration values', () => {
      expect(() => calculateHydrationAdjustment(49, 10, 'active-dry', 'sourdough')).toThrow();
      expect(() => calculateHydrationAdjustment(201, 10, 'active-dry', 'sourdough')).toThrow();
    });
  });

  describe('calculateFermentationTime', () => {
    it('should calculate correct fermentation time range for standard conditions', () => {
      const result = calculateFermentationTime(72, 100);
      expect(result.minHours).toBeLessThan(result.maxHours);
      expect(result.minHours).toBeGreaterThan(0);
    });

    it('should adjust fermentation time for temperature variations', () => {
      const coldResult = calculateFermentationTime(62, 100);
      const warmResult = calculateFermentationTime(82, 100);
      expect(coldResult.minHours).toBeGreaterThan(warmResult.minHours);
    });

    it('should adjust fermentation time for hydration variations', () => {
      const dryResult = calculateFermentationTime(72, 65);
      const wetResult = calculateFermentationTime(72, 100);
      expect(dryResult.minHours).toBeGreaterThan(wetResult.minHours);
    });
  });
});