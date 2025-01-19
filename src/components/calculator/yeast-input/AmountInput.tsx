import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UnitType } from '@/utils/yeastTypes';

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  useTsp: boolean;
  unit: UnitType;
  getUnitLabel: () => string;
}

const AmountInput = ({ 
  amount, 
  setAmount, 
  useTsp, 
  unit, 
  getUnitLabel 
}: AmountInputProps) => {
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

    setAmount(value);
  };

  return (
    <div className="relative">
      <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
      <Input
        type="number"
        inputMode="decimal"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
        placeholder={`Enter amount in ${getUnitLabel()}`}
        step={useTsp ? '0.25' : (unit === 'oz' ? '0.001' : '0.1')}
      />
    </div>
  );
};

export default AmountInput;