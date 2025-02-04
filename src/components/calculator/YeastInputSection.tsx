import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import UnitSelector from './inputs/UnitSelector';
import AmountInput from './inputs/AmountInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface YeastInputSectionProps {
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

const YeastInputSection = ({
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
}: YeastInputSectionProps) => {
  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Select value={fromType} onValueChange={handleFromTypeChange} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select yeast type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
              <SelectItem value="instant">Instant Yeast</SelectItem>
              <SelectItem value="fresh">Fresh Yeast</SelectItem>
              <SelectItem value="sourdough">Sourdough Starter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>To</Label>
          <Select value={toType} onValueChange={handleToTypeChange} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select yeast type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
              <SelectItem value="instant">Instant Yeast</SelectItem>
              <SelectItem value="fresh">Fresh Yeast</SelectItem>
              <SelectItem value="sourdough">Sourdough Starter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default YeastInputSection;