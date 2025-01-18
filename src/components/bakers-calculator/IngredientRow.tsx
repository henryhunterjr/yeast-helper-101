import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Ingredient } from '@/types/recipe';

interface IngredientRowProps {
  ingredient: Ingredient;
  unit: 'g' | 'oz';
  onChangeField: (field: 'name' | 'weight', value: string | number) => void;
  onRemove: () => void;
  isRemovable?: boolean;
}

const IngredientRow = ({
  ingredient,
  unit,
  onChangeField,
  onRemove,
  isRemovable = false,
}: IngredientRowProps) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        value={ingredient.name}
        onChange={(e) => onChangeField('name', e.target.value)}
        placeholder="Ingredient name"
        className="flex-1"
        readOnly={!isRemovable}
      />
      <Input
        type="number"
        value={ingredient.weight}
        onChange={(e) => onChangeField('weight', Number(e.target.value))}
        placeholder={`Weight (${unit})`}
        className="w-32"
        min="0"
        step="1"
      />
      <div className="w-20 text-right">
        {ingredient.percentage?.toFixed(1)}%
      </div>
      {isRemovable && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default IngredientRow;