import React from 'react';

interface TotalRecipeProps {
  totalWeight: number;
  unit: 'g' | 'oz';
}

const TotalRecipe = ({ totalWeight, unit }: TotalRecipeProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Total Recipe</h3>
      <p className="text-xl font-medium">
        Total Weight: {totalWeight.toFixed(1)} {unit}
      </p>
    </section>
  );
};

export default TotalRecipe;