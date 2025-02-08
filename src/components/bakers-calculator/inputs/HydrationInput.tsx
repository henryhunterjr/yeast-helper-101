
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface HydrationInputProps {
  hydration: number;
  setHydration: (value: number) => void;
  error?: string;
}

const HydrationInput = ({ hydration, setHydration, error }: HydrationInputProps) => {
  const { toast } = useToast();

  const handleHydrationChange = (value: string | number) => {
    console.log("Hydration input changed:", value);
    const hydrationValue = typeof value === 'string' ? Number(value) : value;
    
    if (hydrationValue < 50 || hydrationValue > 100) {
      toast({
        title: "Invalid Hydration Level",
        description: "Hydration must be between 50% and 100%",
        variant: "destructive",
      });
      return;
    }

    setHydration(hydrationValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="hydration">Hydration ({hydration}%)</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Hydration percentage affects dough texture and handling. Lower hydration (50-65%) makes firmer dough, while higher hydration (70-85%) creates more open crumb but can be harder to handle.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-4">
        <Input
          id="hydration"
          type="number"
          value={hydration}
          onChange={(e) => handleHydrationChange(e.target.value)}
          min="50"
          max="100"
          step="1"
          className={`transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        <Slider
          value={[hydration]}
          onValueChange={(value) => handleHydrationChange(value[0])}
          min={50}
          max={100}
          step={1}
          className="w-full transition-opacity hover:opacity-100"
        />
      </div>
      {error && (
        <Alert variant="destructive" className="py-2 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default HydrationInput;
