
import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface WaterInputProps {
  water: number | null;
  setWater: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  flour: number | null;
  unit: 'g' | 'oz';
  error?: string;
}

const WaterInput = ({ 
  water, 
  setWater, 
  hydration,
  setHydration,
  flour,
  unit,
  error 
}: WaterInputProps) => {
  const { toast } = useToast();
  const startTime = React.useRef<number>();

  useEffect(() => {
    if (flour) {
      startTime.current = performance.now();
      console.log("Calculating water from flour and hydration:", { flour, hydration });
      const calculatedWater = Math.round((flour * hydration) / 100);
      setWater(calculatedWater);
      const endTime = performance.now();
      console.log(`Water calculation completed in ${Math.round(endTime - (startTime.current || endTime))}ms`);
    }
  }, [flour, hydration, setWater]);

  const handleWaterChange = (value: string) => {
    startTime.current = performance.now();
    console.log("Water input changed:", value);
    const waterValue = value === '' ? null : Number(value);
    
    if (waterValue !== null && (waterValue < 0 || waterValue > 10000)) {
      toast({
        title: "Invalid Water Amount",
        description: `Please enter a water amount between 0 and 10,000 ${unit} for optimal dough consistency.`,
        variant: "destructive",
      });
      return;
    }

    console.log("Setting new water value:", waterValue);
    setWater(waterValue);
    
    if (waterValue !== null && flour) {
      const newHydration = Math.round((waterValue / flour) * 100);
      console.log("Calculating new hydration:", newHydration);
      setHydration(newHydration);
    }
    
    const endTime = performance.now();
    console.log(`Water and hydration calculations completed in ${Math.round(endTime - (startTime.current || endTime))}ms`);
  };

  const handleHydrationChange = (value: number) => {
    startTime.current = performance.now();
    console.log("Hydration slider changed:", value);
    setHydration(value);
    if (flour) {
      const newWater = Math.round((flour * value) / 100);
      console.log("Calculating new water from hydration:", newWater);
      setWater(newWater);
    }
    const endTime = performance.now();
    console.log(`Hydration-based water calculation completed in ${Math.round(endTime - (startTime.current || endTime))}ms`);
  };

  return (
    <div className="space-y-2 transition-all duration-200 animate-in fade-in-50">
      <div className="flex items-center justify-between">
        <Label htmlFor="water" className="text-sm font-medium">Water ({unit})</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs p-3 animate-in zoom-in-50">
            <p className="text-sm">
              Water amount determines your dough's hydration level:
              <br/>• Less water = firmer dough
              <br/>• More water = softer, more open crumb
              <br/>• Adjust using either the input or slider
              <br/>• Water temperature affects fermentation
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Input
        id="water"
        type="number"
        value={water || ''}
        onChange={(e) => handleWaterChange(e.target.value)}
        min="0"
        step="1"
        className={`transition-all duration-200 hover:border-primary focus-visible:ring-offset-2 ${
          error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-primary'
        }`}
        placeholder={`Enter water amount in ${unit}`}
      />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="hydration" className="text-sm font-medium">Hydration</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs p-3 animate-in zoom-in-50">
                <p className="text-sm">
                  Hydration is the ratio of water to flour:
                  <br/>• Lower = firmer, easier to handle
                  <br/>• Higher = softer, more open crumb
                  <br/>• Choose based on your recipe type
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="text-sm text-muted-foreground">{hydration}%</span>
        </div>
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
        <Alert variant="destructive" className="py-2 animate-in slide-in-from-top-1">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WaterInput;
