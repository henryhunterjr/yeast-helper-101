
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface FlourInputProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  unit: 'g' | 'oz';
  error?: string;
}

const FlourInput = ({ flour, setFlour, unit, error }: FlourInputProps) => {
  const { toast } = useToast();

  const handleFlourChange = (value: string) => {
    console.log("Flour input changed:", value);
    const flourValue = value === '' ? null : Number(value);
    
    if (flourValue !== null && (flourValue < 0 || flourValue > 10000)) {
      toast({
        title: "Invalid Flour Amount",
        description: "Flour amount must be between 0 and 10,000 grams",
        variant: "destructive",
      });
      return;
    }

    setFlour(flourValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="flour">Flour Weight ({unit})</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Flour is the base ingredient (100%) for calculating baker's percentages. All other ingredients are calculated as a percentage of the flour weight.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Input
        id="flour"
        type="number"
        value={flour || ''}
        onChange={(e) => handleFlourChange(e.target.value)}
        min="0"
        step="1"
        className={`transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && (
        <Alert variant="destructive" className="py-2 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FlourInput;
