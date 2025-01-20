import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StarterStrengthSelectProps {
  value: 'strong' | 'moderate' | 'weak';
  onChange: (value: 'strong' | 'moderate' | 'weak') => void;
}

const StarterStrengthSelect = ({ value, onChange }: StarterStrengthSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Starter Strength</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select starter strength" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="strong">Strong (Fed &lt;6 hours ago)</SelectItem>
          <SelectItem value="moderate">Moderate (Fed 6-12 hours ago)</SelectItem>
          <SelectItem value="weak">Weak (Fed &gt;12 hours ago)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StarterStrengthSelect;