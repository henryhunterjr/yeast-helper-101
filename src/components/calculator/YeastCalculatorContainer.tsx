import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import CalculatorHeader from './CalculatorHeader';
import YeastInputSection from './YeastInputSection';
import ConversionResult from './ConversionResult';
import { calculateConversion, getTemperatureAdjustment } from '../../utils/yeastCalculations';

const YeastCalculatorContainer = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');
  const [isLoading, setIsLoading] = useState(false);

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

  const calculationResult = useMemo(() => {
    try {
      return calculateConversion(amount, fromType, toType);
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error performing the calculation. Please check your inputs.",
        variant: "destructive",
      });
      return null;
    }
  }, [amount, fromType, toType, toast]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <CalculatorHeader />

      <div className="grid md:grid-cols-2 gap-6">
        <YeastInputSection
          amount={amount}
          setAmount={setAmount}
          temperature={temperature}
          setTemperature={setTemperature}
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
          result={calculationResult || '0'}
          temperatureAdjustment={getTemperatureAdjustment(parseFloat(temperature))}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default YeastCalculatorContainer;