import React, { useState } from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import CalculatorForm from './form/CalculatorForm';
import ConversionResult from './ConversionResult';
import CalculatorLayout from './layout/CalculatorLayout';
import StarterStrengthSelect from './StarterStrengthSelect';
import { calculateConversion } from '@/utils/yeastCalculations';

const YeastCalculatorContainer = () => {
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState<YeastType>('active-dry');
  const [toType, setToType] = useState<YeastType>('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [starterStrength, setStarterStrength] = useState<'strong' | 'moderate' | 'weak'>('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<UnitType>('g');
  const [useTsp, setUseTsp] = useState(false);

  const handleConversion = () => {
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
      return { result, isSimplified };
    }
    return { result: '', isSimplified: false };
  };

  const { result, isSimplified } = handleConversion();

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

      {result && (
        <ConversionResult
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          hydration={hydration}
          result={result}
          temperatureAdjustment={getTemperatureAdjustment(parseFloat(temperature))}
          hydrationAdjustment={calculateHydrationAdjustment(
            parseFloat(hydration),
            parseFloat(amount),
            fromType,
            toType
          )}
          fermentationTime={calculateProofingTime(
            fromType,
            parseFloat(hydration),
            parseFloat(temperature),
            starterStrength
          )}
          isLoading={isLoading}
          unit={unit}
          onReset={() => setAmount('')}
          isSimplified={isSimplified}
          starterStrength={starterStrength}
        />
      )}
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;