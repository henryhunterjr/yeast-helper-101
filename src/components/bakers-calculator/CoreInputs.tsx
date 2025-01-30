import React from 'react';
import FlourInput from './inputs/FlourInput';
import WaterInput from './inputs/WaterInput';
import PercentageInput from './inputs/PercentageInput';

interface CoreInputsProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  water: number | null;
  setWater: (value: number | null) => void;
  starterPercentage: number;
  setStarterPercentage: (value: number) => void;
  saltPercentage: number;
  setSaltPercentage: (value: number) => void;
  unit: 'g' | 'oz';
  validationErrors: {
    flour?: string;
    hydration?: string;
    water?: string;
    starter?: string;
    salt?: string;
  };
}

const CoreInputs = ({
  flour,
  setFlour,
  hydration,
  setHydration,
  water,
  setWater,
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

        <WaterInput
          water={water}
          setWater={setWater}
          hydration={hydration}
          setHydration={setHydration}
          flour={flour}
          unit={unit}
          error={validationErrors.water}
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