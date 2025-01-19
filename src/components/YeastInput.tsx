import React from 'react';
import { UnitType } from '../utils/yeastTypes';
import { tspToGramConversion } from '../utils/yeastTypes';
import UnitToggle from './calculator/yeast-input/UnitToggle';
import AmountInput from './calculator/yeast-input/AmountInput';

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
        <UnitToggle
          useTsp={useTsp}
          setUseTsp={setUseTsp}
          canUseTsp={canUseTsp}
        />
      </div>
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        useTsp={useTsp}
        unit={unit}
        getUnitLabel={getUnitLabel}
      />
      {amount && (
        <p className="text-sm text-gray-500">
          {amount} {getUnitLabel()}
        </p>
      )}
    </div>
  );
};

export default YeastInput;