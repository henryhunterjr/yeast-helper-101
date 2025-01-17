import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface ThemeSettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ThemeSettings = ({ isDarkMode, setIsDarkMode }: ThemeSettingsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label className="text-base">Dark Mode</Label>
        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
      </div>
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className="data-[state=checked]:bg-yeast-600"
      />
    </div>
  );
};

export default ThemeSettings;