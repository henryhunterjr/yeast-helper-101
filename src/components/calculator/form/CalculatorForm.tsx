
import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import YeastTypeSelector from '../YeastTypeSelector';
import UnitSelector from '../inputs/UnitSelector';
import AmountInput from '../inputs/AmountInput';
import TemperatureInput from '@/components/TemperatureInput';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorFormProps {
  amount: string;
  setAmount: (value: string) => void;
  temperature: string;
  setTemperature: (value: string) => void;
  hydration: string;
  setHydration: (value: string) => void;
  fromType: YeastType;
  toType: YeastType;
  handleFromTypeChange: (value: YeastType) => void;
  handleToTypeChange: (value: YeastType) => void;
  isLoading: boolean;
  unit: UnitType;
  setUnit: (value: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (value: boolean) => void;
}

const CalculatorForm = ({
  amount,
  setAmount,
  temperature,
  setTemperature,
  hydration,
  setHydration,
  fromType,
  toType,
  handleFromTypeChange,
  handleToTypeChange,
  isLoading,
  unit,
  setUnit,
  useTsp,
  setUseTsp,
}: CalculatorFormProps) => {
  return (
    <div className="space-y-6">
      {/* 1. Yeast Type Selection */}
      <div className="space-y-4">
        <YeastTypeSelector
          fromType={fromType}
          toType={toType}
          onFromTypeChange={handleFromTypeChange}
          onToTypeChange={handleToTypeChange}
        />
      </div>

      {/* 2. Measurement Unit Selection */}
      <div className="space-y-2">
        <UnitSelector
          unit={unit}
          setUnit={setUnit}
          useTsp={useTsp}
          setUseTsp={setUseTsp}
        />
      </div>

      {/* 3. Amount Input */}
      <div className="space-y-2">
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          unit={unit}
          yeastType={fromType}
        />
      </div>

      {/* 4. Temperature and Hydration */}
      <div className="space-y-4">
        <TemperatureInput
          temperature={temperature}
          setTemperature={setTemperature}
        />

        <div className="space-y-2">
          <Label htmlFor="hydration">Dough Hydration (%)</Label>
          <Input
            id="hydration"
            type="number"
            value={hydration}
            onChange={(e) => setHydration(e.target.value)}
            min="0"
            max="200"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
