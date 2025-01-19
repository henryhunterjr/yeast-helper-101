import React from 'react';
import FlourInput from './inputs/FlourInput';
import HydrationInput from './inputs/HydrationInput';
import PercentageInput from './inputs/PercentageInput';

interface CoreInputsProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  starterPercentage: number;
  setStarterPercentage: (value: number) => void;
  saltPercentage: number;
  setSaltPercentage: (value: number) => void;
  unit: 'g' | 'oz';
  validationErrors: {
    flour?: string;
    hydration?: string;
    starter?: string;
    salt?: string;
  };
}

const CoreInputs = ({
  flour,
  setFlour,
  hydration,
  setHydration,
  starterPercentage,
  setStarterPercentage,
  saltPercentage,
  setSaltPercentage,
  unit,
  validationErrors,
}: CoreInputsProps) => {
  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">Core Inputs</h3>
      
      <div className="space-y-6">
        <FlourInput
          flour={flour}
          setFlour={setFlour}
          unit={unit}
          error={validationErrors.flour}
        />

        <HydrationInput
          hydration={hydration}
          setHydration={setHydration}
          error={validationErrors.hydration}
        />

        <PercentageInput
          label="Starter Percentage"
          value={starterPercentage}
          onChange={setStarterPercentage}
          min={0}
          max={50}
          step={1}
          error={validationErrors.starter}
        />

        <PercentageInput
          label="Salt Percentage"
          value={saltPercentage}
          onChange={setSaltPercentage}
          min={0}
          max={5}
          step={0.1}
          error={validationErrors.salt}
        />
      </div>
    </section>
  );
};

export default CoreInputs;