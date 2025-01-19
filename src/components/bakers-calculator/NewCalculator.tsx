import React from 'react';
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { useNewBakersCalculator } from '@/hooks/useNewBakersCalculator';
import CoreInputs from './CoreInputs';
import IngredientBreakdown from './IngredientBreakdown';
import TotalRecipe from './TotalRecipe';
import ValidationWarnings from './ValidationWarnings';

const NewCalculator = () => {
  const {
    flour,
    setFlour,
    hydration,
    setHydration,
    starterPercentage,
    setStarterPercentage,
    saltPercentage,
    setSaltPercentage,
    calculations,
    validationError,
    validationWarnings,
    validationErrors
  } = useNewBakersCalculator();

  const [unit, setUnit] = React.useState<'g' | 'oz'>('g');
  const { toast } = useToast();

  const handleUnitChange = (value: string) => {
    if (value === 'g' || value === 'oz') {
      setUnit(value);
      toast({
        title: "Unit Changed",
        description: `Measurements updated to ${value === 'g' ? 'grams' : 'ounces'}`,
      });
    }
  };

  return (
    <Card className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
          <ToggleGroup 
            type="single" 
            value={unit} 
            onValueChange={handleUnitChange}
            className="border rounded-lg"
          >
            <ToggleGroupItem value="g" className="px-3 py-2">Grams</ToggleGroupItem>
            <ToggleGroupItem value="oz" className="px-3 py-2">Ounces</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <ValidationWarnings warnings={validationWarnings} />

        <div className="grid gap-6">
          <CoreInputs
            flour={flour}
            setFlour={setFlour}
            hydration={hydration}
            setHydration={setHydration}
            starterPercentage={starterPercentage}
            setStarterPercentage={setStarterPercentage}
            saltPercentage={saltPercentage}
            setSaltPercentage={setSaltPercentage}
            unit={unit}
            validationErrors={validationErrors}
          />

          <IngredientBreakdown
            calculations={calculations}
            unit={unit}
          />

          <TotalRecipe
            totalWeight={calculations.totalWeight}
            unit={unit}
          />
        </div>
      </div>
    </Card>
  );
};

export default NewCalculator;