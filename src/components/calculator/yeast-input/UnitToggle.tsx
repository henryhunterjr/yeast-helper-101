import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UnitType } from '@/utils/yeastTypes';

interface UnitToggleProps {
  useTsp: boolean;
  setUseTsp: (value: boolean) => void;
  canUseTsp: boolean;
}

const UnitToggle = ({ useTsp, setUseTsp, canUseTsp }: UnitToggleProps) => {
  if (!canUseTsp) return null;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={useTsp}
        onCheckedChange={setUseTsp}
        id="tsp-toggle"
      />
      <Label htmlFor="tsp-toggle">Use teaspoons</Label>
    </div>
  );
};

export default UnitToggle;