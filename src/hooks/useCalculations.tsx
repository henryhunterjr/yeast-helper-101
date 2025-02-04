import { useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Calculations {
  water: number;
  starter: number;
  salt: number;
  flourFromStarter: number;
  waterFromStarter: number;
  totalWeight: number;
}

export const useCalculations = (
  flour: number | null,
  hydration: number,
  starterPercentage: number,
  saltPercentage: number,
  starterHydration: number
) => {
  const { toast } = useToast();

  return useMemo<Calculations>(() => {
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
};