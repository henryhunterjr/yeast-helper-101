import React from 'react';
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import UnitToggle from './UnitToggle';
import IngredientInputs from './IngredientInputs';
import CalculationResults from './CalculationResults';
import ValidationSystem from './ValidationSystem';
import { useRecipeCalculator } from '@/hooks/useRecipeCalculator';

const MainCalculator = () => {
  const {
    recipe,
    updateRecipeBasedOnFlour,
    updateRecipeBasedOnStarter,
    updateRecipeBasedOnHydration,
    handleReset
  } = useRecipeCalculator();

  return (
    <TooltipProvider>
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>
            <UnitToggle
              unit={recipe.unit}
              onChange={(unit) => recipe.unit = unit}
            />
          </div>

          <ValidationSystem warnings={[]} />

          <IngredientInputs
            recipe={recipe}
            onFlourChange={updateRecipeBasedOnFlour}
            onIngredientChange={() => {}}
            onStarterChange={updateRecipeBasedOnStarter}
            onHydrationTargetChange={updateRecipeBasedOnHydration}
            onReset={handleReset}
          />

          <CalculationResults recipe={recipe} />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;