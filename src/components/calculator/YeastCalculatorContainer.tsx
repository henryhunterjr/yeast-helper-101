import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import CalculatorHeader from './CalculatorHeader';
import YeastInputSection from './YeastInputSection';
import ConversionResult from './ConversionResult';
import FavoritesList from '../favorites/FavoritesList';
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
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(true);

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
      return calculateHydrationAdjustment(
        parseFloat(hydration),
        parseFloat(calculationResult),
        fromType,
        toType
      );
    } catch (error) {
      console.error('Hydration calculation error:', error);
      return null;
    }
  }, [calculationResult, hydration, fromType, toType]);

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
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-6">
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-white to-yeast-50 rounded-lg shadow-lg overflow-hidden border border-yeast-100">
          <CalculatorHeader />

          <div className="p-4 sm:p-6 space-y-6">
            {/* Primary Conversion Section */}
            <div className="space-y-6">
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
                showAdjustments={false}
              />

              {/* Conversion Result */}
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

              {/* Collapsible Adjustments Section */}
              <Collapsible
                open={isAdjustmentsOpen}
                onOpenChange={setIsAdjustmentsOpen}
                className="w-full space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Additional Adjustments</h3>
                  <CollapsibleTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                    {isAdjustmentsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="space-y-6">
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
                    showAdjustments={true}
                    hideMainInputs={true}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-yeast-100">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4 text-yeast-800">Saved Favorites</h2>
            <FavoritesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YeastCalculatorContainer;