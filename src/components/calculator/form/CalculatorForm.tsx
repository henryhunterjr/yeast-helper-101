import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import YeastInputSection from '../YeastInputSection';
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
      <YeastInputSection
        amount={amount}
        setAmount={setAmount}
        temperature={temperature}
        setTemperature={setTemperature}
        hydration={hydration}
        setHydration={setHydration}
        fromType={fromType}
        setFromType={handleFromTypeChange}
        toType={toType}
        setToType={handleToTypeChange}
        isLoading={isLoading}
        unit={unit}
        setUnit={setUnit}
        useTsp={useTsp}
        setUseTsp={setUseTsp}
      />
      
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
  );
};

export default CalculatorForm;