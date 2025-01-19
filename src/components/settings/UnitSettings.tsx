import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface UnitSettingsProps {
  units: string;
  setUnits: (value: string) => void;
  tempScale: string;
  setTempScale: (value: string) => void;
}

const UnitSettings = ({ units, setUnits, tempScale, setTempScale }: UnitSettingsProps) => {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-base">Units</Label>
        <RadioGroup value={units} onValueChange={setUnits} className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metric" id="metric" />
            <Label htmlFor="metric">Metric (g)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="imperial" id="imperial" />
            <Label htmlFor="imperial">Imperial (oz)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teaspoons" id="teaspoons" />
            <Label htmlFor="teaspoons">Teaspoons (tsp)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Temperature Scale</Label>
        <RadioGroup value={tempScale} onValueChange={setTempScale} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="F" id="fahrenheit" />
            <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="celsius" />
            <Label htmlFor="celsius">Celsius (°C)</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default UnitSettings;