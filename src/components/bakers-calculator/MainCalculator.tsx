import React from 'react';
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import UnitToggle from './UnitToggle';
import IngredientInputs from './IngredientInputs';
import CalculationResults from './CalculationResults';
import StarterCalculations from './StarterCalculations';
import ValidationSystem from './ValidationSystem';
import { useRecipeCalculator } from '@/hooks/useRecipeCalculator';

const MainCalculator = () => {
  const {
    recipe,
    updateRecipeBasedOnFlour,
    updateRecipeBasedOnIngredient,
    updateRecipeBasedOnStarter,
    updateRecipeBasedOnHydration,
    handleReset
  } = useRecipeCalculator();

  const hasValidationErrors = recipe.hydrationTarget && recipe.hydrationTarget > 120;

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

          {hasValidationErrors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Warning: Hydration level is very high (>120%). This may result in an extremely wet dough.
              </AlertDescription>
            </Alert>
          )}

          <ValidationSystem warnings={[]} />

          <div className="grid gap-8">
            {/* Core Inputs Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Core Inputs</h3>
              <IngredientInputs
                recipe={recipe}
                onFlourChange={updateRecipeBasedOnFlour}
                onIngredientChange={updateRecipeBasedOnIngredient}
                onStarterChange={updateRecipeBasedOnStarter}
                onHydrationTargetChange={updateRecipeBasedOnHydration}
                onReset={handleReset}
              />
            </section>

            {/* Starter Calculations Section */}
            {recipe.starter && recipe.starter.weight > 0 && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Starter Contribution</h3>
                <StarterCalculations recipe={recipe} />
              </section>
            )}
            
            {/* Results Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Recipe Results</h3>
              <CalculationResults recipe={recipe} />
            </section>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Reset Calculator
            </button>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default MainCalculator;