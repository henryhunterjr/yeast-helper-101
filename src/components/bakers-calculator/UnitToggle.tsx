import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

interface UnitToggleProps {
  unit: 'g' | 'oz';
  onChange: (unit: 'g' | 'oz') => void;
}

const UnitToggle = ({ unit, onChange }: UnitToggleProps) => {
  return (
    <div className="space-y-2">
      <Label>Unit</Label>
      <ToggleGroup
        type="single"
        value={unit}
        onValueChange={(value) => value && onChange(value as 'g' | 'oz')}
      >
        <ToggleGroupItem value="g">Grams</ToggleGroupItem>
        <ToggleGroupItem value="oz">Ounces</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default UnitToggle;