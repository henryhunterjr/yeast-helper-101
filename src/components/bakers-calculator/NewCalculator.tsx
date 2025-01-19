import React from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNewBakersCalculator } from '@/hooks/useNewBakersCalculator';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
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
    validationWarnings
  } = useNewBakersCalculator();

  const [unit, setUnit] = React.useState<'g' | 'oz'>('g');
  const { toast } = useToast();

  const handleUnitChange = (value: 'g' | 'oz') => {
    if (value) {
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

        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validationError}
            </AlertDescription>
          </Alert>
        )}

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