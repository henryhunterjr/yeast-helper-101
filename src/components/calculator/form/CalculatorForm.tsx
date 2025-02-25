
import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import YeastTypeSelector from '../YeastTypeSelector';
import AmountInput from '../inputs/AmountInput';
import UnitSelector from '../inputs/UnitSelector';
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CalculatorFormProps {
  amount: string;
  setAmount: (value: string) => void;
  fromType: YeastType;
  toType: YeastType;
  handleFromTypeChange: (type: YeastType) => void;
  handleToTypeChange: (type: YeastType) => void;
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (useTsp: boolean) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  amount,
  setAmount,
  fromType,
  toType,
  handleFromTypeChange,
  handleToTypeChange,
  unit,
  setUnit,
  useTsp,
  setUseTsp,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <YeastTypeSelector
          fromType={fromType}
          toType={toType}
          onFromTypeChange={handleFromTypeChange}
          onToTypeChange={handleToTypeChange}
        />
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <AmountInput
              amount={amount}
              setAmount={setAmount}
              unit={unit}
              yeastType={fromType}
            />
            <UnitSelector
              unit={unit}
              setUnit={setUnit}
              useTsp={useTsp}
              setUseTsp={setUseTsp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
