import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: (value: boolean) => void;
}

const DarkModeToggle = ({ isDarkMode, onToggle }: DarkModeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-muted-foreground" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default DarkModeToggle;