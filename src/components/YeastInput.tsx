import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnitType } from '@/utils/yeastTypes';

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
  // Listen for unit changes from settings
  useEffect(() => {
    const handleUnitChange = () => {
      const savedSettings = localStorage.getItem('yeastwise-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setUnit(settings.units);
        setUseTsp(settings.units === 'tsp');
      }
    };

    window.addEventListener('unitChange', handleUnitChange);
    
    // Initial load
    handleUnitChange();

    return () => {
      window.removeEventListener('unitChange', handleUnitChange);
    };
  }, [setUnit, setUseTsp]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="yeast-amount">Amount ({unit})</Label>
      <Input
        id="yeast-amount"
        type="text"
        pattern="[0-9]*\.?[0-9]*"
        value={amount}
        onChange={handleInputChange}
        className="w-full"
        placeholder={`Enter amount in ${unit}`}
        min="0"
        step={unit === 'tsp' ? '0.25' : '0.1'}
      />
    </div>
  );
};

export default YeastInput;
