import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationError {
  message: string;
  type: 'error' | 'warning';
}

interface CoreInputsProps {
  flour: number | null;
  setFlour: (value: number | null) => void;
  hydration: number;
  setHydration: (value: number) => void;
  starterPercentage: number;
  setStarterPercentage: (value: number) => void;
  saltPercentage: number;
  setSaltPercentage: (value: number) => void;
  unit: 'g' | 'oz';
}

const CoreInputs = ({
  flour,
  setFlour,
  hydration,
  setHydration,
  starterPercentage,
  setStarterPercentage,
  saltPercentage,
  setSaltPercentage,
  unit,
}: CoreInputsProps) => {
  const { toast } = useToast();

  const validateFlour = (value: number | null): ValidationError | null => {
    if (value === null || value <= 0) {
      return { message: "Flour weight must be greater than 0", type: 'error' };
    }
    return null;
  };

  const validateHydration = (value: number): ValidationError | null => {
    if (value < 50) {
      return { message: "Hydration should be at least 50%", type: 'error' };
    }
    if (value > 100) {
      return { message: "Very high hydration may result in extremely wet dough", type: 'warning' };
    }
    return null;
  };

  const validateStarter = (value: number): ValidationError | null => {
    if (value < 0) {
      return { message: "Starter percentage cannot be negative", type: 'error' };
    }
    if (value > 50) {
      return { message: "High starter percentage may lead to faster fermentation", type: 'warning' };
    }
    return null;
  };

  const validateSalt = (value: number): ValidationError | null => {
    if (value < 0) {
      return { message: "Salt percentage cannot be negative", type: 'error' };
    }
    if (value > 2.5) {
      return { message: "Salt percentage is higher than typical (2%)", type: 'warning' };
    }
    return null;
  };

  const handleFlourChange = (value: string) => {
    const numValue = value === '' ? null : Number(value);
    const error = validateFlour(numValue);
    
    if (error?.type === 'error') {
      toast({
        title: "Invalid Input",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setFlour(numValue);
  };

  const flourError = validateFlour(flour);
  const hydrationError = validateHydration(hydration);
  const starterError = validateStarter(starterPercentage);
  const saltError = validateSalt(saltPercentage);

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Core Inputs</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="flour">Flour Weight ({unit})</Label>
          <Input
            id="flour"
            type="number"
            value={flour || ''}
            onChange={(e) => handleFlourChange(e.target.value)}
            min="0"
            step="1"
            className={`w-full ${flourError?.type === 'error' ? 'border-red-500' : ''}`}
          />
          {flourError && (
            <Alert variant={flourError.type === 'error' ? 'destructive' : 'default'} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{flourError.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hydration">Hydration ({hydration}%)</Label>
          <Slider
            id="hydration"
            value={[hydration]}
            onValueChange={(value) => setHydration(value[0])}
            min={50}
            max={100}
            step={1}
            className="w-full"
          />
          {hydrationError && (
            <Alert variant={hydrationError.type === 'error' ? 'destructive' : 'default'} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{hydrationError.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="starter">Starter Percentage ({starterPercentage}%)</Label>
          <Slider
            id="starter"
            value={[starterPercentage]}
            onValueChange={(value) => setStarterPercentage(value[0])}
            min={0}
            max={50}
            step={1}
            className="w-full"
          />
          {starterError && (
            <Alert variant={starterError.type === 'error' ? 'destructive' : 'default'} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{starterError.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salt">Salt Percentage ({saltPercentage}%)</Label>
          <Slider
            id="salt"
            value={[saltPercentage]}
            onValueChange={(value) => setSaltPercentage(value[0])}
            min={0}
            max={5}
            step={0.1}
            className="w-full"
          />
          {saltError && (
            <Alert variant={saltError.type === 'error' ? 'destructive' : 'default'} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{saltError.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoreInputs;