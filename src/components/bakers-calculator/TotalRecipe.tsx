import React from 'react';
import { Card } from "@/components/ui/card";

interface TotalRecipeProps {
  totalWeight: number;
  unit: 'g' | 'oz';
}

const TotalRecipe = ({ totalWeight, unit }: TotalRecipeProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Total Recipe</h3>
      <p className="text-xl font-medium">
        Total Weight: {totalWeight.toFixed(1)} {unit}
      </p>
    </Card>
  );
};

export default TotalRecipe;