import { describe, it, expect } from 'vitest';
import { 
  convertGramsToOunces,
  convertOuncesToGrams,
  convertToTeaspoons,
  convertFromTeaspoons,
  formatMeasurement,
  parseInputValue
} from '../../utils/yeastTypes';

describe('Unit Conversions', () => {
  describe('Gram/Ounce Conversions', () => {
    it('should convert grams to ounces accurately', () => {
      expect(convertGramsToOunces(1000)).toBeCloseTo(35.27, 2);
      expect(convertGramsToOunces(28.35)).toBeCloseTo(1, 2);
    });

    it('should convert ounces to grams accurately', () => {
      expect(convertOuncesToGrams(1)).toBeCloseTo(28.35, 1);
      expect(convertOuncesToGrams(35.27)).toBeCloseTo(1000, 0);
    });
  });

  describe('Teaspoon Conversions', () => {
    it('should convert grams to teaspoons for different yeast types', () => {
      expect(convertToTeaspoons(3, 'active-dry')).toBe(1);
      expect(convertToTeaspoons(3, 'instant')).toBe(1);
      expect(convertToTeaspoons(10, 'fresh')).toBe(1);
    });

    it('should convert teaspoons to grams for different yeast types', () => {
      expect(convertFromTeaspoons(1, 'active-dry')).toBe(3);
      expect(convertFromTeaspoons(1, 'instant')).toBe(3);
      expect(convertFromTeaspoons(1, 'fresh')).toBe(10);
    });
  });

  describe('Measurement Formatting', () => {
    it('should format measurements correctly', () => {
      expect(formatMeasurement(100, 'g', 'active-dry')).toBe('100.00g');
      expect(formatMeasurement(3, 'tsp', 'active-dry')).toBe('3.00 tsp');
      expect(formatMeasurement(1000, 'oz', 'active-dry')).toBe('35.27 oz');
    });
  });

  describe('Input Value Parsing', () => {
    it('should parse input values correctly', () => {
      expect(parseInputValue('100', 'g', 'active-dry')).toBe(100);
      expect(parseInputValue('1', 'oz', 'active-dry')).toBeCloseTo(28.35, 1);
      expect(parseInputValue('3', 'tsp', 'active-dry')).toBe(3);
    });

    it('should handle invalid inputs', () => {
      expect(parseInputValue('', 'g', 'active-dry')).toBe(0);
      expect(parseInputValue('invalid', 'g', 'active-dry')).toBe(0);
    });
  });
});