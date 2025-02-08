
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
        description: "Please enter a flour amount between 0 and 10,000 grams for best results.",
        variant: "destructive",
      });
      return;
    }

    console.log("Setting new flour value:", flourValue);
    setFlour(flourValue);
  };

  return (
    <div className="space-y-2 transition-all duration-200">
      <div className="flex items-center justify-between">
        <Label htmlFor="flour" className="text-sm font-medium">Flour Weight ({unit})</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs p-3">
            <p className="text-sm">Flour is the foundation (100%) for baker's percentages. All other ingredients are calculated relative to the total flour weight. For best results, use between 250-1000g of flour.</p>
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
        className={`transition-all duration-200 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-primary'}`}
        placeholder={`Enter flour weight in ${unit}`}
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
