import React from 'react';
import { Scale } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface YeastInputProps {
  amount: string;
  setAmount: (value: string) => void;
}

const YeastInput = ({ amount, setAmount }: YeastInputProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">Amount (grams)</label>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
          placeholder="Enter amount"
          step="0.1"
          min="0"
        />
      </div>
    </div>
  );
};

export default YeastInput;