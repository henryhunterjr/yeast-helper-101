import React from 'react';
import { Scale } from 'lucide-react';

interface YeastInputProps {
  amount: string;
  setAmount: (value: string) => void;
}

const YeastInput = ({ amount, setAmount }: YeastInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Amount (grams)</label>
      <div className="relative">
        <Scale className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
          placeholder="Enter amount"
        />
      </div>
    </div>
  );
};

export default YeastInput;