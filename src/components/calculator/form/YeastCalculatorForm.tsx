import React from 'react';
import YeastTypeSelector from '../YeastTypeSelector';
import YeastInputSection from '../YeastInputSection';
import { YeastType, UnitType } from '@/utils/yeastTypes';

interface YeastCalculatorFormProps {
  amount: string;
  setAmount: (value: string) => void;
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
        fromType={fromType}
        toType={toType}
        handleFromTypeChange={handleFromTypeChange}
        handleToTypeChange={handleToTypeChange}
        isLoading={isLoading}
        unit={unit}
        setUnit={setUnit}
        useTsp={useTsp}
        setUseTsp={setUseTsp}
      />
    </>
  );
};

export default YeastCalculatorForm;