import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, AlertCircle } from 'lucide-react';
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
  const showWarning = ingredient.name.toLowerCase() === 'water' && ingredient.percentage! > 100;

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
      <div className="w-24 text-right flex items-center justify-end gap-2">
        <span>{ingredient.percentage?.toFixed(1)}%</span>
        {showWarning && (
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>High hydration detected. This may result in a very wet dough.</p>
            </TooltipContent>
          </Tooltip>
        )}
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