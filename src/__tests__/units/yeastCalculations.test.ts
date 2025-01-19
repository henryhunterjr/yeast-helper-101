import { describe, it, expect } from 'vitest';
import { 
  calculateWaterTemperature,
  calculateProofingTime,
  calculateActiveProofingTime,
  calculateInstantProofingTime,
  calculateFreshProofingTime,
  calculateSourdoughProofingTime
} from '../../utils/yeastCalculations';

describe('Yeast Calculations', () => {
  describe('calculateWaterTemperature', () => {
    it('should calculate correct water temperature for different yeast types', () => {
      // Regular yeast types (active-dry, instant, fresh)
      expect(calculateWaterTemperature(72, 'active-dry')).toBe(75);
      expect(calculateWaterTemperature(65, 'instant')).toBe(80);
      expect(calculateWaterTemperature(85, 'fresh')).toBe(75);

      // Sourdough starter
      expect(calculateWaterTemperature(72, 'sourdough')).toBe(78);
      expect(calculateWaterTemperature(65, 'sourdough')).toBe(82);
      expect(calculateWaterTemperature(85, 'sourdough')).toBe(78);
    });

    it('should cap water temperature within practical range', () => {
      // Regular yeast types
      expect(calculateWaterTemperature(60, 'active-dry')).toBe(80);
      expect(calculateWaterTemperature(90, 'active-dry')).toBe(75);

      // Sourdough starter
      expect(calculateWaterTemperature(60, 'sourdough')).toBe(82);
      expect(calculateWaterTemperature(90, 'sourdough')).toBe(78);
    });
  });

  describe('calculateProofingTime', () => {
    it('should calculate correct proofing time range for active dry yeast', () => {
      const result = calculateActiveProofingTime(100);
      expect(result.minHours).toBe(2);
      expect(result.maxHours).toBe(3);

      const result75 = calculateActiveProofingTime(75);
      expect(result75.minHours).toBe(2.2);
      expect(result75.maxHours).toBe(3.2);
    });

    it('should calculate correct proofing time range for instant yeast', () => {
      const result = calculateInstantProofingTime(100);
      expect(result.minHours).toBe(1.5);
      expect(result.maxHours).toBe(2.3);
    });

    it('should calculate correct proofing time range for fresh yeast', () => {
      const result = calculateFreshProofingTime(100);
      expect(result.minHours).toBe(2.2);
      expect(result.maxHours).toBe(3.3);
    });

    it('should calculate correct proofing time range for sourdough starter', () => {
      const result = calculateSourdoughProofingTime(100);
      expect(result.minHours).toBe(4.8);
      expect(result.maxHours).toBe(7.2);
    });

    it('should adjust proofing time based on temperature', () => {
      const baseResult = calculateProofingTime('active-dry', 100, 72);
      const warmerResult = calculateProofingTime('active-dry', 100, 89);
      const coolerResult = calculateProofingTime('active-dry', 100, 55);

      expect(warmerResult.minHours).toBeLessThan(baseResult.minHours);
      expect(coolerResult.minHours).toBeGreaterThan(baseResult.minHours);
    });

    it('should handle different yeast types', () => {
      const activeResult = calculateProofingTime('active-dry', 100, 72);
      const instantResult = calculateProofingTime('instant', 100, 72);
      const freshResult = calculateProofingTime('fresh', 100, 72);
      const sourdoughResult = calculateProofingTime('sourdough', 100, 72);

      expect(instantResult.minHours).toBeLessThan(activeResult.minHours);
      expect(freshResult.minHours).toBeGreaterThan(activeResult.minHours);
      expect(sourdoughResult.minHours).toBeGreaterThan(activeResult.minHours);
    });

    it('should never return times below minimum thresholds', () => {
      const result = calculateProofingTime('instant', 100, 95); // Very warm temperature
      expect(result.minHours).toBeGreaterThanOrEqual(0.5);
      expect(result.maxHours).toBeGreaterThanOrEqual(1);
    });
  });
});