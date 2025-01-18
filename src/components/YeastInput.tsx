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
}

const YeastInput = ({ amount, setAmount, yeastType }: YeastInputProps) => {
  const { toast } = useToast();
  const MIN_AMOUNT = 0.1;
  const MAX_AMOUNT = 1000;
  const [units, setUnits] = React.useState<UnitType>('g');
  const [useTsp, setUseTsp] = React.useState(false);

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUnits(settings.units === 'imperial' ? 'oz' : 'g');
    }
  }, []);

  const handleAmountChange = (value: string) => {
    if (value === '') {
      setAmount('');
      return;
    }

    const parsedValue = parseInputValue(value, units, yeastType as any);
    
    if (isNaN(parsedValue)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    // Check limits in grams
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
    
    switch (units) {
      case 'tsp':
        const tspValue = convertToTeaspoons(numAmount, yeastType as any);
        return tspValue?.toString() || '';
      case 'oz':
        return convertGramsToOunces(numAmount).toFixed(3);
      default:
        return amount;
    }
  };

  const getUnitLabel = () => {
    if (useTsp) return 'tsp';
    return units === 'oz' ? 'ounces' : 'grams';
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
          step={useTsp ? '0.25' : (units === 'oz' ? '0.001' : '0.1')}
        />
      </div>
      {amount && (
        <p className="text-sm text-gray-500">
          {formatMeasurement(parseFloat(amount), units, yeastType as any)}
        </p>
      )}
    </div>
  );
};

export default YeastInput;