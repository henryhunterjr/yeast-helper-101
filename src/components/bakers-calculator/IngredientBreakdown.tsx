import React from 'react';

interface IngredientBreakdownProps {
  calculations: {
    water: number;
    starter: number;
    salt: number;
    flourFromStarter: number;
    waterFromStarter: number;
  };
  unit: 'g' | 'oz';
}

const IngredientBreakdown = ({ calculations, unit }: IngredientBreakdownProps) => {
  return (
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
  );
};

export default IngredientBreakdown;