import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  convertToTeaspoons, 
  convertFromTeaspoons, 
  convertGramsToOunces,
  convertOuncesToGrams,
  tspToGramConversion,
  formatMeasurement,
  parseInputValue,
  UnitType
} from '../utils/yeastTypes';

interface YeastInputProps {
  amount: string;
  setAmount: (value: string) => void;
  yeastType: string;
  unit: UnitType;
  setUnit: (value: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (value: boolean) => void;
}

const YeastInput = ({ 
  amount, 
  setAmount, 
  yeastType,
  unit,
  setUnit,
  useTsp,
  setUseTsp 
}: YeastInputProps) => {
  const { toast } = useToast();
  const MIN_AMOUNT = 0.1;
  const MAX_AMOUNT = 1000;

  const handleAmountChange = (value: string) => {
    if (value === '') {
      setAmount('');
      return;
    }

    const parsedValue = parseInputValue(value, unit, yeastType as any);
    
    if (isNaN(parsedValue)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (parsedValue < MIN_AMOUNT) {
      toast({
        title: "Amount Too Small",
        description: `Minimum amount is ${MIN_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    if (parsedValue > MAX_AMOUNT) {
      toast({
        title: "Amount Too Large",
        description: `Maximum amount is ${MAX_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    setAmount(parsedValue.toString());
  };

  const displayValue = () => {
    if (!amount) return '';
    const numAmount = parseFloat(amount);
    
    return formatMeasurement(numAmount, unit, yeastType as any);
  };

  const getUnitLabel = () => {
    if (useTsp) return 'tsp';
    return unit === 'oz' ? 'ounces' : 'grams';
  };

  const canUseTsp = tspToGramConversion[yeastType as any] !== null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">
          Amount ({getUnitLabel()})
        </label>
        {canUseTsp && (
          <div className="flex items-center space-x-2">
            <Switch
              checked={useTsp}
              onCheckedChange={setUseTsp}
              id="tsp-toggle"
            />
            <Label htmlFor="tsp-toggle">Use teaspoons</Label>
          </div>
        )}
      </div>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="number"
          inputMode="decimal"
          value={displayValue()}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder={`Enter amount`}
          step={useTsp ? '0.25' : (unit === 'oz' ? '0.001' : '0.1')}
        />
      </div>
      {amount && (
        <p className="text-sm text-gray-500">
          {formatMeasurement(parseFloat(amount), unit, yeastType as any)}
        </p>
      )}
    </div>
  );
};

export default YeastInput;