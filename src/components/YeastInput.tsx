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

    const parsedValue = parseFloat(value);
    
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
        description: `Minimum amount is ${MIN_AMOUNT}${useTsp ? ' tsp' : unit}`,
        variant: "destructive",
      });
      return;
    }

    if (parsedValue > MAX_AMOUNT) {
      toast({
        title: "Amount Too Large",
        description: `Maximum amount is ${MAX_AMOUNT}${useTsp ? ' tsp' : unit}`,
        variant: "destructive",
      });
      return;
    }

    // If using teaspoons, convert to grams for internal storage
    if (useTsp) {
      const gramsValue = convertFromTeaspoons(parsedValue, yeastType as any);
      if (gramsValue !== null) {
        setAmount(gramsValue.toString());
      } else {
        setAmount(value);
      }
    } else {
      setAmount(value);
    }
  };

  const getUnitLabel = () => {
    if (useTsp) return 'tsp';
    return unit === 'oz' ? 'ounces' : 'grams';
  };

  const getDisplayAmount = () => {
    if (!amount) return '';
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return '';
    
    if (useTsp) {
      const tspValue = convertToTeaspoons(parsedAmount, yeastType as any);
      return tspValue !== null ? `${tspValue.toFixed(2)} tsp` : `${parsedAmount} g`;
    } else {
      const value = unit === 'oz' ? 
        convertGramsToOunces(parsedAmount) : 
        parsedAmount;
      return `${value.toFixed(2)} ${unit}`;
    }
  };

  const getInputValue = () => {
    if (!amount) return '';
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return '';

    if (useTsp) {
      const tspValue = convertToTeaspoons(parsedAmount, yeastType as any);
      return tspValue !== null ? tspValue.toString() : '';
    }
    return amount;
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
          value={getInputValue()}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder={`Enter amount in ${getUnitLabel()}`}
          step={useTsp ? '0.25' : (unit === 'oz' ? '0.001' : '0.1')}
        />
      </div>
      {amount && (
        <p className="text-sm text-gray-500">
          {getDisplayAmount()}
        </p>
      )}
    </div>
  );
};

export default YeastInput;