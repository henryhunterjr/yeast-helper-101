import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";

interface MeasurementToggleProps {
  useTeaspoons: boolean;
  onToggle: (value: boolean) => void;
}

const MeasurementToggle = ({ useTeaspoons, onToggle }: MeasurementToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Toggle
        pressed={useTeaspoons}
        onPressedChange={onToggle}
        aria-label="Toggle teaspoon measurements"
      >
        {useTeaspoons ? 'tsp' : 'g'}
      </Toggle>
      <Label htmlFor="measurement-toggle">
        {useTeaspoons ? 'Teaspoons' : 'Grams'}
      </Label>
    </div>
  );
};

export default MeasurementToggle;