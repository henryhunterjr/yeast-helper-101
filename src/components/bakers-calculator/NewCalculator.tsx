import React from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNewBakersCalculator } from '@/hooks/useNewBakersCalculator';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CoreInputs from './CoreInputs';
import IngredientBreakdown from './IngredientBreakdown';
import TotalRecipe from './TotalRecipe';

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
    validationError
  } = useNewBakersCalculator();

  const [unit, setUnit] = React.useState<'g' | 'oz'>('g');

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
          <ToggleGroup type="single" value={unit} onValueChange={(value: 'g' | 'oz') => setUnit(value)}>
            <ToggleGroupItem value="g">Grams</ToggleGroupItem>
            <ToggleGroupItem value="oz">Ounces</ToggleGroupItem>
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

        <CoreInputs
          flour={flour}
          setFlour={setFlour}
          hydration={hydration}
          setHydration={setHydration}
          starterPercentage={starterPercentage}
          setStarterPercentage={setStarterPercentage}
          saltPercentage={saltPercentage}
          setSaltPercentage={setSaltPercentage}
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
    </Card>
  );
};

export default NewCalculator;