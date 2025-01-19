import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { YeastType, UnitType } from '@/utils/yeastTypes';
import CalculatorForm from './form/CalculatorForm';
import CalculationResults from './results/CalculationResults';
import CalculatorLayout from './layout/CalculatorLayout';

const YeastCalculatorContainer = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState<YeastType>('active-dry');
  const [toType, setToType] = useState<YeastType>('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<UnitType>('g');
  const [useTsp, setUseTsp] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUnit(settings.units === 'teaspoons' ? 'tsp' : settings.units === 'imperial' ? 'oz' : 'g');
      setUseTsp(settings.units === 'teaspoons');
    }
  }, []);

  const handleFromTypeChange = (value: YeastType) => {
    if (value === toType) {
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    setFromType(value);
  };

  const handleToTypeChange = (value: YeastType) => {
    if (value === fromType) {
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    setToType(value);
  };

  const handleReset = () => {
    setAmount('');
    setFromType('active-dry');
    setToType('instant');
    setTemperature('72');
    setHydration('100');
  };

  const showResults = Boolean(amount && parseFloat(amount) > 0);

  return (
    <CalculatorLayout>
      <CalculatorForm
        amount={amount}
        setAmount={setAmount}
        temperature={temperature}
        setTemperature={setTemperature}
        hydration={hydration}
        setHydration={setHydration}
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

      {showResults && (
        <CalculationResults
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          hydration={hydration}
          result={amount}
          temperatureAdjustment=""
          hydrationAdjustment={null}
          fermentationTime={{ minHours: 2, maxHours: 4 }}
          unit={unit}
          onReset={handleReset}
        />
      )}
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;