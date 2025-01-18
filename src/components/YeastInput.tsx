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

    if (numValue < MIN_AMOUNT) {
      toast({
        title: "Amount Too Small",
        description: `Minimum amount is ${MIN_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    if (numValue > MAX_AMOUNT) {
      toast({
        title: "Amount Too Large",
        description: `Maximum amount is ${MAX_AMOUNT}g`,
        variant: "destructive",
      });
      return;
    }

    setAmount(value);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">Amount (grams)</label>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder="Enter amount (0.1-1000g)"
          step="0.1"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
        />
      </div>
    </div>
  );
};

export default YeastInput;