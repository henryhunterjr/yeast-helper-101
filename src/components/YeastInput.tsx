import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { convertToTeaspoons, convertFromTeaspoons, tspToGramConversion } from '../utils/yeastTypes';

interface YeastInputProps {
  amount: string;
  setAmount: (value: string) => void;
  yeastType: string;
}

const YeastInput = ({ amount, setAmount, yeastType }: YeastInputProps) => {
  const { toast } = useToast();
  const MIN_AMOUNT = 0.1;
  const MAX_AMOUNT = 1000;
  const [units, setUnits] = React.useState('metric');
  const [useTsp, setUseTsp] = React.useState(false);

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUnits(settings.units);
    }
  }, []);

  const convertToMetric = (imperialValue: number): number => {
    return imperialValue * 28.3495; // Convert ounces to grams
  };

  const convertToImperial = (metricValue: number): number => {
    return metricValue / 28.3495; // Convert grams to ounces
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    
    if (value === '') {
      setAmount('');
      return;
    }

    if (isNaN(numValue)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    let finalValue = numValue;
    
    // Convert from teaspoons if necessary
    if (useTsp) {
      const gramsValue = convertFromTeaspoons(numValue, yeastType as keyof typeof tspToGramConversion);
      if (gramsValue === null) {
        toast({
          title: "Invalid Conversion",
          description: "This type of yeast cannot be measured in teaspoons",
          variant: "destructive",
        });
        return;
      }
      finalValue = gramsValue;
    }

    // Convert to metric if using imperial
    if (units === 'imperial' && !useTsp) {
      finalValue = convertToMetric(numValue);
    }

    // Check limits
    if (finalValue < MIN_AMOUNT) {
      toast({
        title: "Amount Too Small",
        description: `Minimum amount is ${MIN_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    if (finalValue > MAX_AMOUNT) {
      toast({
        title: "Amount Too Large",
        description: `Maximum amount is ${MAX_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    setAmount(finalValue.toString());
  };

  const displayValue = () => {
    if (!amount) return '';
    
    const numAmount = parseFloat(amount);
    
    if (useTsp) {
      const tspValue = convertToTeaspoons(numAmount, yeastType as keyof typeof tspToGramConversion);
      return tspValue?.toString() || '';
    }
    
    return units === 'imperial' ? convertToImperial(numAmount).toFixed(3) : amount;
  };

  const getUnitLabel = () => {
    if (useTsp) return 'tsp';
    return units === 'imperial' ? 'ounces' : 'grams';
  };

  const canUseTsp = tspToGramConversion[yeastType as keyof typeof tspToGramConversion] !== null;

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
          step={useTsp ? '0.25' : (units === 'imperial' ? '0.001' : '0.1')}
        />
      </div>
      {amount && (
        <p className="text-sm text-gray-500">
          {useTsp ? 
            `${amount}g` :
            units === 'imperial' ? 
              `${amount}g` : 
              convertToTeaspoons(parseFloat(amount), yeastType as keyof typeof tspToGramConversion)?.toFixed(2) + ' tsp'
          }
        </p>
      )}
    </div>
  );
};

export default YeastInput;