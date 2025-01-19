import { describe, it, expect } from 'vitest';
import { 
  calculateWaterTemperature,
  calculateProofingTime,
  calculateActiveProofingTime,
  calculateInstantProofingTime
} from '../../utils/yeastCalculations';

describe('Yeast Calculations', () => {
  describe('calculateWaterTemperature', () => {
    it('should calculate correct water temperature', () => {
      expect(calculateWaterTemperature(72)).toBe(75);
      expect(calculateWaterTemperature(65)).toBe(80);
      expect(calculateWaterTemperature(85)).toBe(75);
    });

    it('should cap water temperature within practical range', () => {
      expect(calculateWaterTemperature(60)).toBe(80); // Would be too hot, capped at 80
      expect(calculateWaterTemperature(90)).toBe(75); // Would be too cold, capped at 75
    });
  });

  describe('calculateActiveProofingTime', () => {
    it('should calculate correct proofing time range for active dry yeast', () => {
      const result100 = calculateActiveProofingTime(100);
      expect(result100.minHours).toBe(2);
      expect(result100.maxHours).toBe(3);

      const result75 = calculateActiveProofingTime(75);
      expect(result75.minHours).toBe(2.2);
      expect(result75.maxHours).toBe(3.2);

      const result50 = calculateActiveProofingTime(50);
      expect(result50.minHours).toBe(2.5);
      expect(result50.maxHours).toBe(3.5);
    });
  });

  describe('calculateInstantProofingTime', () => {
    it('should calculate correct proofing time range for instant yeast', () => {
      const result100 = calculateInstantProofingTime(100);
      expect(result100.minHours).toBe(1.5);
      expect(result100.maxHours).toBe(2.3);

      const result75 = calculateInstantProofingTime(75);
      expect(result75.minHours).toBe(1.7);
      expect(result75.maxHours).toBe(2.4);
    });
  });

  describe('calculateProofingTime', () => {
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

      expect(instantResult.minHours).toBeLessThan(activeResult.minHours);
      expect(instantResult.maxHours).toBeLessThan(activeResult.maxHours);
    });

    it('should never return times below minimum thresholds', () => {
      const result = calculateProofingTime('instant', 100, 95); // Very warm temperature
      expect(result.minHours).toBeGreaterThanOrEqual(0.5);
      expect(result.maxHours).toBeGreaterThanOrEqual(1);
    });
  });
});