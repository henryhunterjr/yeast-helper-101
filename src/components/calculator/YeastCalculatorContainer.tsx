import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { YeastType, UnitType } from '@/utils/yeastTypes';
import { calculateProofingTime, calculateConversion, getTemperatureAdjustment, calculateHydrationAdjustment } from '@/utils/yeastCalculations';
import CalculatorForm from './form/CalculatorForm';
import ConversionResult from './ConversionResult';
import CalculatorLayout from './layout/CalculatorLayout';

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
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<UnitType>('g');
  const [useTsp, setUseTsp] = useState(false);
  const [conversionResult, setConversionResult] = useState<string>('');
  const [isSimplified, setIsSimplified] = useState(false);

  useEffect(() => {
    if (amount && fromType && toType) {
      const { result, isSimplified } = onConvert(amount, fromType, toType);
      setConversionResult(result);
      setIsSimplified(isSimplified);
    } else {
      setConversionResult('');
      setIsSimplified(false);
    }
  }, [amount, fromType, toType, onConvert]);

  const handleReset = () => {
    setAmount('');
    setFromType('active-dry');
    setToType('instant');
    setTemperature('72');
    setHydration('100');
    setConversionResult('');
  };

  const fermentationTime = calculateProofingTime(fromType, parseFloat(hydration), parseFloat(temperature));
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
        />
      )}
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;