import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UnitType } from '@/utils/yeastTypes';

interface UnitSelectorProps {
  unit: UnitType;
  setUnit: (value: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (value: boolean) => void;
}

const UnitSelector = ({ unit, setUnit, useTsp, setUseTsp }: UnitSelectorProps) => {
  const handleUnitChange = (value: string) => {
    if (value === 'tsp') {
      setUseTsp(true);
      setUnit('tsp');
    } else {
      setUseTsp(false);
      setUnit(value as UnitType);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Measurement Unit</Label>
      <Select value={unit} onValueChange={handleUnitChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="g">Grams (g)</SelectItem>
          <SelectItem value="oz">Ounces (oz)</SelectItem>
          <SelectItem value="tsp">Teaspoons (tsp)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnitSelector;