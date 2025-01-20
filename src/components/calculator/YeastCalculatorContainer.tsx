import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { YeastType, UnitType } from '@/utils/yeastTypes';
import { 
  calculateProofingTime, 
  calculateConversion, 
  getTemperatureAdjustment, 
  calculateHydrationAdjustment 
} from '@/utils/yeastCalculations';
import CalculatorForm from './form/CalculatorForm';
import ConversionResult from './ConversionResult';
import CalculatorLayout from './layout/CalculatorLayout';
import StarterStrengthSelect from './StarterStrengthSelect';

interface YeastCalculatorContainerProps {
  onConvert: (amount: string, fromType: YeastType, toType: YeastType) => {
    result: string;
    isSimplified: boolean;
  };
}

const YeastCalculatorContainer = ({ onConvert }: YeastCalculatorContainerProps) => {
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState<YeastType>('active-dry');
  const [toType, setToType] = useState<YeastType>('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [starterStrength, setStarterStrength] = useState<'strong' | 'moderate' | 'weak'>('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<UnitType>('g');
  const [useTsp, setUseTsp] = useState(false);
  const [conversionResult, setConversionResult] = useState<string>('');
  const [isSimplified, setIsSimplified] = useState(false);

  useEffect(() => {
    if (amount && fromType && toType) {
      const { result, isSimplified } = calculateConversion(
        amount,
        fromType,
        toType,
        useTsp,
        parseFloat(temperature),
        parseFloat(hydration),
        starterStrength
      );
      setConversionResult(result);
      setIsSimplified(isSimplified);
    } else {
      setConversionResult('');
      setIsSimplified(false);
    }
  }, [amount, fromType, toType, temperature, hydration, starterStrength, useTsp]);

  const handleReset = () => {
    setAmount('');
    setFromType('active-dry');
    setToType('instant');
    setTemperature('72');
    setHydration('100');
    setStarterStrength('moderate');
    setConversionResult('');
  };

  const fermentationTime = calculateProofingTime(
    fromType,
    parseFloat(hydration),
    parseFloat(temperature),
    starterStrength
  );
  
  const temperatureAdjustment = getTemperatureAdjustment(parseFloat(temperature));
  const hydrationAdjustment = calculateHydrationAdjustment(
    parseFloat(hydration),
    parseFloat(amount),
    fromType,
    toType
  );

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
        handleFromTypeChange={setFromType}
        handleToTypeChange={setToType}
        isLoading={isLoading}
        unit={unit}
        setUnit={setUnit}
        useTsp={useTsp}
        setUseTsp={setUseTsp}
      />

      {toType === 'sourdough' && (
        <StarterStrengthSelect
          value={starterStrength}
          onChange={setStarterStrength}
        />
      )}

      {conversionResult && (
        <ConversionResult
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          hydration={hydration}
          result={conversionResult}
          temperatureAdjustment={temperatureAdjustment}
          hydrationAdjustment={hydrationAdjustment}
          fermentationTime={fermentationTime}
          isLoading={isLoading}
          unit={unit}
          onReset={handleReset}
          isSimplified={isSimplified}
          starterStrength={starterStrength}
        />
      )}
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;