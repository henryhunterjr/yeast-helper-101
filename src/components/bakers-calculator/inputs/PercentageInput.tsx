import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PercentageInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  error?: string;
}

const PercentageInput = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step,
  error 
}: PercentageInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label} ({value}%)</Label>
      <div className="space-y-4">
        <Input
          id={label.toLowerCase()}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className={error ? 'border-red-500 focus:ring-red-500' : ''}
        />
        <Slider
          value={[value]}
          onValueChange={(value) => onChange(value[0])}
          min={min}
          max={max}
          step={step}
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

export default PercentageInput;