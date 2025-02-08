
import React from 'react';
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

  React.useEffect(() => {
    if (flour) {
      console.log("Calculating water from flour and hydration:", { flour, hydration });
      const calculatedWater = (flour * hydration) / 100;
      setWater(Math.round(calculatedWater * 10) / 10);
    }
  }, [flour, hydration, setWater]);

  const handleWaterChange = (value: string) => {
    console.log("Water input changed:", value);
    const waterValue = value === '' ? null : Number(value);
    
    if (waterValue !== null && (waterValue < 0 || waterValue > 10000)) {
      toast({
        title: "Invalid Water Amount",
        description: "Please enter a water amount between 0 and 10,000 grams for best results.",
        variant: "destructive",
      });
      return;
    }

    console.log("Setting new water value:", waterValue);
    setWater(waterValue);
    
    if (waterValue !== null && flour) {
      const newHydration = (waterValue / flour) * 100;
      console.log("Calculating new hydration:", newHydration);
      setHydration(Math.round(newHydration * 10) / 10);
    }
  };

  const handleHydrationChange = (value: number) => {
    console.log("Hydration slider changed:", value);
    setHydration(value);
    if (flour) {
      const newWater = (flour * value) / 100;
      console.log("Calculating new water from hydration:", newWater);
      setWater(Math.round(newWater * 10) / 10);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="water" className="text-sm font-medium">Water ({unit})</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs p-3">
            <p className="text-sm">Water amount determines the dough's hydration percentage. Higher hydration creates a more open crumb structure but can make the dough harder to handle. Adjust the slider to find your preferred hydration level.</p>
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
        className={`transition-all duration-200 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-primary'}`}
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
              <TooltipContent side="top" className="max-w-xs p-3">
                <p className="text-sm">Hydration is the ratio of water to flour, expressed as a percentage. It significantly affects your dough's texture and handling characteristics.</p>
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
        <Alert variant="destructive" className="py-2 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WaterInput;
