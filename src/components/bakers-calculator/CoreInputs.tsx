import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CoreInputsProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  starterPercentage: number;
  setStarterPercentage: (value: number) => void;
  saltPercentage: number;
  setSaltPercentage: (value: number) => void;
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
}: CoreInputsProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Core Inputs</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="flour">Flour Weight (g)</Label>
          <Input
            id="flour"
            type="number"
            value={flour || ''}
            onChange={(e) => setFlour(e.target.value === '' ? null : Number(e.target.value))}
            min="0"
            step="1"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hydration">Hydration ({hydration}%)</Label>
          <Slider
            id="hydration"
            value={[hydration]}
            onValueChange={(value) => setHydration(value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="starter">Starter Percentage ({starterPercentage}%)</Label>
          <Slider
            id="starter"
            value={[starterPercentage]}
            onValueChange={(value) => setStarterPercentage(value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salt">Salt Percentage ({saltPercentage}%)</Label>
          <Slider
            id="salt"
            value={[saltPercentage]}
            onValueChange={(value) => setSaltPercentage(value[0])}
            min={0}
            max={100}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CoreInputs;