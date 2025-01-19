import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import ConversionResult from './ConversionResult';
import YeastCalculatorForm from './form/YeastCalculatorForm';
import CalculatorLayout from './layout/CalculatorLayout';
import { YeastType, UnitType } from '@/utils/yeastTypes';

const YeastCalculatorContainer = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState<YeastType>('active-dry');
  const [toType, setToType] = useState<YeastType>('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(true);
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

  useEffect(() => {
    const state = location.state as { prefill?: { amount: string; fromType: YeastType; toType: YeastType } };
    if (state?.prefill) {
      setAmount(state.prefill.amount);
      setFromType(state.prefill.fromType);
      setToType(state.prefill.toType);
    }
  }, [location.state]);

  const showResults = Boolean(amount && parseFloat(amount) > 0);

  return (
    <CalculatorLayout>
      <YeastCalculatorForm
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
        <ConversionResult
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          hydration={hydration}
          result={amount} // This should be calculated
          temperatureAdjustment=""
          hydrationAdjustment={null}
          fermentationTime={null}
          isLoading={isLoading}
          unit={unit}
          onReset={handleReset}
        />
      )}

      <Collapsible
        open={isAdjustmentsOpen}
        onOpenChange={setIsAdjustmentsOpen}
        className="w-full space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Additional Adjustments</h3>
          <CollapsibleTrigger className="hover:bg-muted p-2 rounded-full transition-colors">
            {isAdjustmentsOpen ? (
              <ChevronUp className="h-4 w-4 text-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-foreground" />
            )}
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-6">
          <YeastCalculatorForm
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
        </CollapsibleContent>
      </Collapsible>
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;