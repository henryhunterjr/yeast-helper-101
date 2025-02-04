import { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";

interface ValidationErrors {
  flour?: string;
  hydration?: string;
  water?: string;
  starter?: string;
  salt?: string;
}

export const useValidation = (
  flour: number | null,
  water: number | null,
  hydration: number,
  starterPercentage: number,
  saltPercentage: number
) => {
  const { toast } = useToast();

  const validationErrors = useMemo<ValidationErrors>(() => {
    const errors: ValidationErrors = {};
    
    if (!flour || flour <= 0) {
      errors.flour = "Flour weight must be greater than 0";
    }
    
    if (!water || water <= 0) {
      errors.water = "Water weight must be greater than 0";
    }
    
    if (hydration < 50) {
      errors.hydration = "Hydration must be at least 50%";
    } else if (hydration > 100) {
      errors.hydration = "Hydration cannot exceed 100%";
    }
    
    if (starterPercentage < 0) {
      errors.starter = "Starter percentage cannot be negative";
    } else if (starterPercentage > 100) {
      errors.starter = "Starter percentage cannot exceed 100%";
    }
    
    if (saltPercentage < 0) {
      errors.salt = "Salt percentage cannot be negative";
    } else if (saltPercentage > 5) {
      errors.salt = "Salt percentage cannot exceed 5%";
    }
    
    return errors;
  }, [flour, water, hydration, starterPercentage, saltPercentage]);

  const validationWarnings = useMemo(() => {
    const warnings: string[] = [];
    
    if (hydration > 85) {
      warnings.push("High hydration detected. This may result in a very wet dough.");
    }
    if (starterPercentage > 30) {
      warnings.push("High starter percentage may lead to faster fermentation.");
    }
    if (saltPercentage > 2.5) {
      warnings.push("Salt percentage is higher than typical. This may affect fermentation.");
    }
    
    return warnings;
  }, [hydration, starterPercentage, saltPercentage]);

  const validationError = useMemo(() => {
    if (Object.keys(validationErrors).length > 0) {
      return "Please correct the input errors before proceeding.";
    }
    return null;
  }, [validationErrors]);

  return {
    validationErrors,
    validationWarnings,
    validationError
  };
};