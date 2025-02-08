
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
        description: "For best results, keep hydration between 50% and 100%. Lower hydration creates firmer dough, while higher hydration gives more open crumb.",
        variant: "destructive",
      });
      return;
    }

    console.log("Setting new hydration value:", hydrationValue);
    setHydration(hydrationValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="hydration" className="text-sm font-medium">Hydration ({hydration}%)</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs p-3">
            <p className="text-sm">Hydration affects dough texture and handling:
              <br/>• 50-65%: Firmer, easier to handle
              <br/>• 65-75%: Standard bread dough
              <br/>• 75-85%: Rustic breads, more open crumb
              <br/>• 85%+: Very wet dough, harder to handle</p>
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
          className={`transition-all duration-200 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-primary'}`}
          placeholder="Enter hydration percentage"
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
