import { useState } from 'react';
import { useValidation } from './useValidation';
import { useCalculations } from './useCalculations';

export const useNewBakersCalculator = () => {
  const [flour, setFlour] = useState<number | null>(500);
  const [water, setWater] = useState<number | null>(375);
  const [hydration, setHydration] = useState<number>(75);
  const [starterPercentage, setStarterPercentage] = useState<number>(20);
  const [saltPercentage, setSaltPercentage] = useState<number>(2);
  const [starterHydration] = useState<number>(100);

  const { validationErrors, validationWarnings, validationError } = useValidation(
    flour,
    water,
    hydration,
    starterPercentage,
    saltPercentage
  );

  const calculations = useCalculations(
    flour,
    hydration,
    starterPercentage,
    saltPercentage,
    starterHydration
  );

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