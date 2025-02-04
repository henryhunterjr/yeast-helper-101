import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UnitType } from '@/utils/yeastTypes';

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  unit: UnitType;
  yeastType: string;
}

const AmountInput = ({ amount, setAmount, unit, yeastType }: AmountInputProps) => {
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (value === '' || (numValue >= 0 && numValue <= 1000)) {
        setAmount(value);
      } else {
        toast({
          title: "Invalid Amount",
          description: "Please enter a value between 0 and 1000",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="yeast-amount">Amount ({unit})</Label>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          id="yeast-amount"
          type="text"
          pattern="[0-9]*\.?[0-9]*"
          value={amount}
          onChange={handleInputChange}
          className="pl-10 w-full"
          placeholder={`Enter amount in ${unit}`}
          min="0"
          step={unit === 'tsp' ? '0.25' : '0.1'}
        />
      </div>
    </div>
  );
};

export default AmountInput;