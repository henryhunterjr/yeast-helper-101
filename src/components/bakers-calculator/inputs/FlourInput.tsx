
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
  const startTime = React.useRef<number>();

  const handleFlourChange = (value: string) => {
    startTime.current = performance.now();
    console.log("Flour input changed:", value);
    const flourValue = value === '' ? null : Number(value);
    
    if (flourValue !== null && (flourValue < 0 || flourValue > 10000)) {
      toast({
        title: "Invalid Flour Amount",
        description: `Please enter a flour amount between 0 and 10,000 ${unit} for optimal dough consistency and handling.`,
        variant: "destructive",
      });
      return;
    }

    console.log("Setting new flour value:", flourValue);
    setFlour(flourValue);
    
    const endTime = performance.now();
    console.log(`Flour calculation completed in ${Math.round(endTime - (startTime.current || endTime))}ms`);
  };

  return (
    <div className="space-y-2 transition-all duration-200 animate-in fade-in-50">
      <div className="flex items-center justify-between">
        <Label htmlFor="flour" className="text-sm font-medium">
          Flour Weight ({unit})
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs p-3 animate-in zoom-in-50">
            <p className="text-sm">
              Flour is the foundation (100%) for baker's percentages. All other ingredients 
              are calculated relative to the total flour weight. For the best results with most bread recipes:
              <br/>• Standard loaf: 250-500g flour
              <br/>• Double batch: 500-1000g flour
              <br/>• Large batch: 1000g+ flour
            </p>
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
        className={`transition-all duration-200 hover:border-primary focus-visible:ring-offset-2 ${
          error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-primary'
        }`}
        placeholder={`Enter flour weight in ${unit}`}
      />
      {error && (
        <Alert variant="destructive" className="py-2 animate-in slide-in-from-top-1">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FlourInput;
