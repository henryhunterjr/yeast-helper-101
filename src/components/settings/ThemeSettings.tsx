import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface ThemeSettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ThemeSettings = ({ isDarkMode, setIsDarkMode }: ThemeSettingsProps) => {
  useEffect(() => {
    // Update the HTML class when dark mode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Dark Mode</Label>
        <p className="text-sm text-muted-foreground">
          Switch between light and dark themes
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Sun className="h-5 w-5 text-muted-foreground" />
        <Switch
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
          className="data-[state=checked]:bg-primary"
        />
        <Moon className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default ThemeSettings;