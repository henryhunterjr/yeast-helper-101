import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface HydrationInputProps {
  hydration: number;
  setHydration: (value: number) => void;
  error?: string;
}

const HydrationInput = ({ hydration, setHydration, error }: HydrationInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="hydration">Hydration ({hydration}%)</Label>
      <div className="space-y-4">
        <Input
          id="hydration"
          type="number"
          value={hydration}
          onChange={(e) => setHydration(Number(e.target.value))}
          min="50"
          max="100"
          step="1"
          className={error ? 'border-red-500 focus:ring-red-500' : ''}
        />
        <Slider
          value={[hydration]}
          onValueChange={(value) => setHydration(value[0])}
          min={50}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default HydrationInput;