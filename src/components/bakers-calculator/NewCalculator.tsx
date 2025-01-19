import React from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNewBakersCalculator } from '@/hooks/useNewBakersCalculator';

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

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Baker's Percentage Calculator</h2>

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
              <Label htmlFor="flour">Flour Weight (g)</Label>
              <Input
                id="flour"
                type="number"
                value={flour}
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
                min={50}
                max={120}
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
                max={50}
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
                max={5}
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
            <p>Water: {calculations.water.toFixed(1)}g</p>
            <p>Starter: {calculations.starter.toFixed(1)}g</p>
            <div className="pl-4 text-base text-gray-600">
              <p>• Flour from Starter: {calculations.flourFromStarter.toFixed(1)}g</p>
              <p>• Water from Starter: {calculations.waterFromStarter.toFixed(1)}g</p>
            </div>
            <p>Salt: {calculations.salt.toFixed(1)}g</p>
          </div>
        </section>

        {/* Total Recipe Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Total Recipe</h3>
          <p className="text-xl font-medium">
            Total Weight: {calculations.totalWeight.toFixed(1)}g
          </p>
        </section>
      </div>
    </Card>
  );
};

export default NewCalculator;