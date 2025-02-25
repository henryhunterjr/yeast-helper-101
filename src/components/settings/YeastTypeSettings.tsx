
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface YeastTypeSettingsProps {
  defaultYeast: string;
  setDefaultYeast: (value: string) => void;
}

const YeastTypeSettings = ({ defaultYeast, setDefaultYeast }: YeastTypeSettingsProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base">Default Yeast Type</Label>
      <Select value={defaultYeast} onValueChange={setDefaultYeast}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select default yeast type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
          <SelectItem value="instant">Instant Yeast</SelectItem>
          <SelectItem value="fresh">Fresh Yeast</SelectItem>
          <SelectItem value="sourdough">Sourdough Starter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YeastTypeSettings;
