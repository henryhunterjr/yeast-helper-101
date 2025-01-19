import React from 'react';
import YeastTypeSelector from '../YeastTypeSelector';
import YeastInputSection from '../YeastInputSection';
import { YeastType, UnitType } from '@/utils/yeastTypes';

interface YeastCalculatorFormProps {
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

const YeastCalculatorForm = ({
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
}: YeastCalculatorFormProps) => {
  return (
    <>
      <YeastTypeSelector
        fromType={fromType}
        toType={toType}
        onFromTypeChange={handleFromTypeChange}
        onToTypeChange={handleToTypeChange}
      />

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
        showAdjustments={false}
        unit={unit}
        setUnit={setUnit}
        useTsp={useTsp}
        setUseTsp={setUseTsp}
      />
    </>
  );
};

export default YeastCalculatorForm;