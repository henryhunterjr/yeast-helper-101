import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNewBakersCalculator } from '@/hooks/useNewBakersCalculator';
import { recalculateIngredients } from '@/utils/bakersCalculatorUtils';
import { toast } from '@/components/ui/use-toast';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  useEffect(() => {
    const results = recalculateIngredients({
      flour,
      hydration,
      starterPercentage,
      saltPercentage,
      starterWeight: calculations.starter,
      starterHydration: 100, // Fixed at 100% for simplicity
      unit,
    });

    if (results.error) {
      toast({
        title: "Calculation Error",
        description: results.error,
        variant: "destructive",
      });
    }
  }, [flour, hydration, starterPercentage, saltPercentage, calculations.starter, unit]);

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

        {/* Core Inputs Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Core Inputs</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flour">Flour Weight ({unit})</Label>
              <Input
                id="flour"
                type="number"
                value={flour || ''}
                onChange={(e) => setFlour(Number(e.target.value))}
                min="0"
                step="1"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hydration">Hydration ({hydration}%)</Label>
              <Slider
                id="hydration"
                value={[hydration]}
                onValueChange={(value) => setHydration(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="starter">Starter Percentage ({starterPercentage}%)</Label>
              <Slider
                id="starter"
                value={[starterPercentage]}
                onValueChange={(value) => setStarterPercentage(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salt">Salt Percentage ({saltPercentage}%)</Label>
              <Slider
                id="salt"
                value={[saltPercentage]}
                onValueChange={(value) => setSaltPercentage(value[0])}
                min={0}
                max={100}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Ingredient Breakdown Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Ingredient Breakdown</h3>
          <div className="space-y-2 text-lg">
            <p>Water: {calculations.water.toFixed(1)} {unit}</p>
            <p>Starter: {calculations.starter.toFixed(1)} {unit}</p>
            <div className="pl-4 text-base text-gray-600">
              <p>• Flour from Starter: {calculations.flourFromStarter.toFixed(1)} {unit}</p>
              <p>• Water from Starter: {calculations.waterFromStarter.toFixed(1)} {unit}</p>
            </div>
            <p>Salt: {calculations.salt.toFixed(1)} {unit}</p>
          </div>
        </section>

        {/* Total Recipe Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Total Recipe</h3>
          <p className="text-xl font-medium">
            Total Weight: {calculations.totalWeight.toFixed(1)} {unit}
          </p>
        </section>
      </div>
    </Card>
  );
};

export default NewCalculator;