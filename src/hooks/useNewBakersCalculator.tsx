import { useState, useMemo } from 'react';

interface Calculations {
  water: number;
  starter: number;
  salt: number;
  flourFromStarter: number;
  waterFromStarter: number;
  totalWeight: number;
}

export const useNewBakersCalculator = () => {
  const [flour, setFlour] = useState<number>(500);
  const [hydration, setHydration] = useState<number>(75);
  const [starterPercentage, setStarterPercentage] = useState<number>(20);
  const [saltPercentage, setSaltPercentage] = useState<number>(2);
  const [starterHydration] = useState<number>(100); // Fixed at 100% for simplicity

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

    const starter = (flour * starterPercentage) / 100;
    const flourFromStarter = starter / 2; // For 100% hydration starter
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
  }, [flour, hydration, starterPercentage, saltPercentage, starterHydration]);

  const validationError = useMemo(() => {
    if (flour < 0) return "Flour weight cannot be negative";
    if (hydration < 50) return "Hydration must be at least 50%";
    if (hydration > 120) return "Hydration cannot exceed 120%";
    if (starterPercentage < 0) return "Starter percentage cannot be negative";
    if (starterPercentage > 50) return "Starter percentage cannot exceed 50%";
    if (saltPercentage < 0) return "Salt percentage cannot be negative";
    if (saltPercentage > 5) return "Salt percentage cannot exceed 5%";
    return null;
  }, [flour, hydration, starterPercentage, saltPercentage]);

  return {
    flour,
    setFlour,
    hydration,
    setHydration,
    starterPercentage,
    setStarterPercentage,
    saltPercentage,
    setSaltPercentage,
    calculations,
    validationError
  };
};