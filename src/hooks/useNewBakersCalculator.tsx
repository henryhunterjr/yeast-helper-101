import { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Calculations {
  water: number;
  starter: number;
  salt: number;
  flourFromStarter: number;
  waterFromStarter: number;
  totalWeight: number;
}

interface ValidationErrors {
  flour?: string;
  hydration?: string;
  water?: string;
  starter?: string;
  salt?: string;
}

export const useNewBakersCalculator = () => {
  const [flour, setFlour] = useState<number | null>(500);
  const [water, setWater] = useState<number | null>(375);
  const [hydration, setHydration] = useState<number>(75);
  const [starterPercentage, setStarterPercentage] = useState<number>(20);
  const [saltPercentage, setSaltPercentage] = useState<number>(2);
  const [starterHydration] = useState<number>(100);
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

  const calculations = useMemo<Calculations>(() => {
    if (!flour || flour <= 0) {
      return {
        water: 0,
        starter: 0,
        salt: 0,
        flourFromStarter: 0,
        waterFromStarter: 0,
        totalWeight: 0
      };
    }

    try {
      const starter = (flour * starterPercentage) / 100;
      const flourFromStarter = starter / 2;
      const waterFromStarter = starter / 2;
      const water = (flour * hydration) / 100 - waterFromStarter;
      const salt = (flour * saltPercentage) / 100;
      const totalWeight = flour + water + starter + salt;

      return {
        water,
        starter,
        salt,
        flourFromStarter,
        waterFromStarter,
        totalWeight
      };
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "An error occurred during calculations",
        variant: "destructive",
      });
      
      return {
        water: 0,
        starter: 0,
        salt: 0,
        flourFromStarter: 0,
        waterFromStarter: 0,
        totalWeight: 0
      };
    }
  }, [flour, hydration, starterPercentage, saltPercentage, starterHydration, toast]);

  return {
    flour,
    setFlour,
    water,
    setWater,
    hydration,
    setHydration,
    starterPercentage,
    setStarterPercentage,
    saltPercentage,
    setSaltPercentage,
    calculations,
    validationError,
    validationWarnings,
    validationErrors
  };
};