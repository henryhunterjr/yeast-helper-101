import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface WaterInputProps {
  water: number | null;
  setWater: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  flour: number | null;
  unit: 'g' | 'oz';
  error?: string;
}

const WaterInput = ({ 
  water, 
  setWater, 
  hydration,
  setHydration,
  flour,
  unit,
  error 
}: WaterInputProps) => {
  const handleWaterChange = (value: string) => {
    const waterValue = value === '' ? null : Number(value);
    setWater(waterValue);
    
    if (waterValue !== null && flour) {
      const newHydration = (waterValue / flour) * 100;
      setHydration(Math.round(newHydration * 10) / 10);
    }
  };

  const handleHydrationChange = (value: number) => {
    setHydration(value);
    if (flour) {
      const newWater = (flour * value) / 100;
      setWater(Math.round(newWater * 10) / 10);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="water">Water ({unit})</Label>
      <Input
        id="water"
        type="number"
        value={water || ''}
        onChange={(e) => handleWaterChange(e.target.value)}
        min="0"
        step="1"
        className={error ? 'border-red-500 focus:ring-red-500' : ''}
      />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="hydration">Hydration</Label>
          <span className="text-sm text-muted-foreground">{hydration}%</span>
        </div>
        <Slider
          value={[hydration]}
          onValueChange={(value) => handleHydrationChange(value[0])}
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

export default WaterInput;