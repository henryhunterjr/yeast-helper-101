import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateIngredient } from '@/utils/bakersCalculatorHelpers';
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from 'lucide-react';

interface PercentageInputProps {
  name: string;
  weight: number;
  unit: 'g' | 'oz';
  percentage: number;
  flourWeight: number;
  onChange: (weight: number | null) => void;
  readOnly?: boolean;
}

const PercentageInput = ({
  name,
  weight,
  unit,
  percentage,
  flourWeight,
  onChange,
  readOnly = false
}: PercentageInputProps) => {
  const { toast } = useToast();

  const handleWeightChange = (value: string) => {
    if (value === '') {
      onChange(null);
      return;
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue) || numValue < 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    const validation = validateIngredient({ 
      id: '', 
      name, 
      weight: numValue, 
      percentage: flourWeight ? (numValue / flourWeight) * 100 : percentage 
    }, flourWeight);

    if (validation.message) {
      toast({
        title: "Notice",
        description: validation.message,
        variant: "default",
      });
    }

    onChange(numValue);
  };

  const showWarning = name.toLowerCase() === 'water' && percentage > 100;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Label htmlFor={`${name}-weight`}>{name}</Label>
        <Input
          id={`${name}-weight`}
          type="number"
          value={weight || ''}
          onChange={(e) => handleWeightChange(e.target.value)}
          placeholder={`Weight (${unit})`}
          min="0"
          step="1"
          readOnly={readOnly}
          className={readOnly ? 'bg-gray-50' : ''}
        />
      </div>
      <div className="w-24 text-right flex items-center justify-end gap-2">
        <span>{percentage.toFixed(1)}%</span>
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
    </div>
  );
};

export default PercentageInput;