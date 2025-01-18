import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface YeastInputProps {
  amount: string;
  setAmount: (value: string) => void;
}

const YeastInput = ({ amount, setAmount }: YeastInputProps) => {
  const { toast } = useToast();
  const MIN_AMOUNT = 0.1;
  const MAX_AMOUNT = 1000;
  const [units, setUnits] = React.useState('metric');

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

    // Convert limits based on current unit
    const minLimit = units === 'imperial' ? MIN_AMOUNT / 28.3495 : MIN_AMOUNT;
    const maxLimit = units === 'imperial' ? MAX_AMOUNT / 28.3495 : MAX_AMOUNT;

    if (numValue < minLimit) {
      toast({
        title: "Amount Too Small",
        description: `Minimum amount is ${minLimit.toFixed(3)}${units === 'imperial' ? 'oz' : 'g'}`,
        variant: "destructive",
      });
      return;
    }

    if (numValue > maxLimit) {
      toast({
        title: "Amount Too Large",
        description: `Maximum amount is ${maxLimit.toFixed(2)}${units === 'imperial' ? 'oz' : 'g'}`,
        variant: "destructive",
      });
      return;
    }

    // Store the value in metric internally
    const metricValue = units === 'imperial' ? convertToMetric(numValue) : numValue;
    setAmount(metricValue.toString());
  };

  const displayValue = units === 'imperial' ? 
    (amount ? convertToImperial(parseFloat(amount)).toFixed(3) : '') : 
    amount;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        Amount ({units === 'imperial' ? 'ounces' : 'grams'})
      </label>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="number"
          inputMode="decimal"
          value={displayValue}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder={`Enter amount (${units === 'imperial' ? '0.004-35.27oz' : '0.1-1000g'})`}
          step={units === 'imperial' ? '0.001' : '0.1'}
          min={units === 'imperial' ? MIN_AMOUNT / 28.3495 : MIN_AMOUNT}
          max={units === 'imperial' ? MAX_AMOUNT / 28.3495 : MAX_AMOUNT}
        />
      </div>
    </div>
  );
};

export default YeastInput;