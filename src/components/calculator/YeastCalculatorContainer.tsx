import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import CalculatorHeader from './CalculatorHeader';
import YeastInputSection from './YeastInputSection';
import ConversionResult from './ConversionResult';
import { calculateConversion, getTemperatureAdjustment, calculateHydrationAdjustment } from '../../utils/yeastCalculations';
import { useIsMobile } from '@/hooks/use-mobile';

const YeastCalculatorContainer = () => {
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [isLoading, setIsLoading] = useState(false);

  // Real-time calculation effect
  const calculationResult = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return '0';
    
    try {
      return calculateConversion(amount, fromType, toType);
    } catch (error) {
      console.error('Calculation error:', error);
      return '0';
    }
  }, [amount, fromType, toType]);

  const hydrationAdjustment = useMemo(() => {
    if (!calculationResult || isNaN(parseFloat(hydration))) return null;
    
    try {
      const { flourAdjustment, waterAdjustment } = calculateHydrationAdjustment(
        parseFloat(hydration),
        parseFloat(calculationResult)
      );
      return { flourAdjustment, waterAdjustment };
    } catch (error) {
      console.error('Hydration calculation error:', error);
      return null;
    }
  }, [calculationResult, hydration]);

  useEffect(() => {
    const state = location.state as { prefill?: { amount: string; fromType: string; toType: string } };
    if (state?.prefill) {
      try {
        setAmount(state.prefill.amount);
        setFromType(state.prefill.fromType);
        setToType(state.prefill.toType);
      } catch (error) {
        toast({
          title: "Error loading preferences",
          description: "There was an error loading your preferences. Default values will be used.",
          variant: "destructive",
        });
      }
    }
  }, [location.state, toast]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-6 bg-white rounded-lg shadow-lg">
      <CalculatorHeader />

      <div className={`grid gap-4 sm:gap-6 ${isMobile ? '' : 'md:grid-cols-2'}`}>
        <YeastInputSection
          amount={amount}
          setAmount={setAmount}
          temperature={temperature}
          setTemperature={setTemperature}
          hydration={hydration}
          setHydration={setHydration}
          fromType={fromType}
          setFromType={setFromType}
          toType={toType}
          setToType={setToType}
          isLoading={isLoading}
        />

        <ConversionResult
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          hydration={hydration}
          result={calculationResult}
          temperatureAdjustment={getTemperatureAdjustment(parseFloat(temperature))}
          hydrationAdjustment={hydrationAdjustment}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default YeastCalculatorContainer;