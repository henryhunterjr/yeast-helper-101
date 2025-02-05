import { describe, it, expect } from 'vitest';
import { 
  calculateBakersPercentage,
  calculateStarterContributions,
  calculateWaterFromHydration,
  calculateSaltFromFlour
} from '../../utils/bakersCalculatorHelpers';

describe('Bakers Calculations', () => {
  describe('calculateBakersPercentage', () => {
    it('should calculate correct baker percentage', () => {
      expect(calculateBakersPercentage(650, 1000)).toBe(65);
      expect(calculateBakersPercentage(20, 1000)).toBe(2);
    });

    it('should handle zero flour weight', () => {
      expect(calculateBakersPercentage(100, 0)).toBe(0);
    });
  });

  describe('calculateStarterContributions', () => {
    it('should calculate correct flour and water from starter', () => {
      const result = calculateStarterContributions(200, 100);
      expect(result.flour).toBeCloseTo(100);
      expect(result.water).toBeCloseTo(100);
    });

    it('should handle different hydration levels', () => {
      const result = calculateStarterContributions(200, 80);
      expect(result.flour).toBeCloseTo(111.11, 1);
      expect(result.water).toBeCloseTo(88.89, 1);
    });

    it('should handle zero starter weight', () => {
      const result = calculateStarterContributions(0, 100);
      expect(result.flour).toBe(0);
      expect(result.water).toBe(0);
    });
  });

  describe('calculateWaterFromHydration', () => {
    it('should calculate correct water weight', () => {
      expect(calculateWaterFromHydration(1000, 65)).toBe(650);
      expect(calculateWaterFromHydration(1000, 75)).toBe(750);
    });
  });

  describe('calculateSaltFromFlour', () => {
    it('should calculate correct salt weight', () => {
      expect(calculateSaltFromFlour(1000)).toBe(20); // default 2%
      expect(calculateSaltFromFlour(1000, 2.5)).toBe(25);
    });
  });
});