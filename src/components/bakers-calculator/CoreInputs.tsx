import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

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
}: CoreInputsProps) => {
  const { toast } = useToast();

  const handleFlourChange = (value: string) => {
    const numValue = value === '' ? null : Number(value);
    if (numValue !== null && numValue < 0) {
      toast({
        title: "Invalid Input",
        description: "Flour weight cannot be negative",
        variant: "destructive",
      });
      return;
    }
    setFlour(numValue);
  };

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Core Inputs</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="flour">Flour Weight ({unit})</Label>
          <Input
            id="flour"
            type="number"
            value={flour || ''}
            onChange={(e) => handleFlourChange(e.target.value)}
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
            min={50}
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
            max={50}
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
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CoreInputs;