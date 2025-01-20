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
  console.log('YeastInput rendering with amount:', amount);
  console.log('Current unit:', unit);

  // Listen for unit changes from settings
  useEffect(() => {
    const handleUnitChange = () => {
      console.log('Unit change event triggered');
      const savedSettings = localStorage.getItem('yeastwise-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        console.log('Loading settings:', settings);
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
    console.log('Input change detected:', value);
    // Allow empty input or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      console.log('Setting new amount:', value);
      setAmount(value);
    } else {
      console.log('Invalid input rejected:', value);
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