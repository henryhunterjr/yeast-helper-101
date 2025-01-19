import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Recipe } from '@/types/recipe';

interface StarterSettingsProps {
  recipe: Recipe;
  onStarterChange: (weight: number | null, hydration: number) => void;
}

const StarterSettings = ({ recipe, onStarterChange }: StarterSettingsProps) => {
  const handleStarterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onStarterChange(value === '' ? null : Number(value), recipe.starter?.hydration || 100);
  };

  const handleStarterHydrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onStarterChange(recipe.starter?.weight || 0, value);
  };

  return (
    <div className="space-y-2">
      <Label>Starter Settings</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="starter-weight">Weight ({recipe.unit})</Label>
          <Input
            id="starter-weight"
            type="number"
            value={recipe.starter?.weight || ''}
            onChange={handleStarterChange}
            min="0"
            step="1"
            placeholder="Enter starter weight"
          />
        </div>
        <div>
          <Label htmlFor="starter-hydration">Hydration (%)</Label>
          <Input
            id="starter-hydration"
            type="number"
            value={recipe.starter?.hydration || 100}
            onChange={handleStarterHydrationChange}
            min="50"
            max="200"
            step="1"
          />
        </div>
      </div>
    </div>
  );
};

export default StarterSettings;