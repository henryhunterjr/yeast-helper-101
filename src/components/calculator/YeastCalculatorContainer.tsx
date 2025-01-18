import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import CalculatorHeader from './CalculatorHeader';
import YeastInputSection from './YeastInputSection';
import ConversionResult from './ConversionResult';
import FavoritesList from '../favorites/FavoritesList';
import { UnitType } from '@/utils/yeastTypes';
import { 
  calculateConversion, 
  getTemperatureAdjustment, 
  calculateHydrationAdjustment,
  calculateFermentationTime 
} from '../../utils/yeastCalculations';

const YeastCalculatorContainer = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');
  const [hydration, setHydration] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(true);
  const [unit, setUnit] = useState<UnitType>('g');
  const [useTsp, setUseTsp] = useState(false);

  useEffect(() => {
    if (useTsp) {
      setUnit('tsp');
    } else {
      const savedSettings = localStorage.getItem('yeastwise-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setUnit(settings.units === 'imperial' ? 'oz' : 'g');
      }
    }
  }, [useTsp]);

  const handleReset = () => {
    setAmount('');
    setFromType('active-dry');
    setToType('instant');
    setTemperature('72');
    setHydration('100');
  };

  const result = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return '';
    try {
      return calculateConversion(amount, fromType, toType, useTsp);
    } catch (error) {
      console.error('Calculation error:', error);
      return '';
    }
  }, [amount, fromType, toType, useTsp]);

  const temperatureAdjustment = useMemo(() => {
    if (!temperature || isNaN(parseFloat(temperature))) return '';
    try {
      return getTemperatureAdjustment(parseFloat(temperature));
    } catch (error) {
      console.error('Temperature adjustment error:', error);
      return '';
    }
  }, [temperature]);

  const hydrationAdjustment = useMemo(() => {
    if (!result || isNaN(parseFloat(hydration))) return null;
    try {
      return calculateHydrationAdjustment(
        parseFloat(hydration),
        parseFloat(result),
        fromType,
        toType
      );
    } catch (error) {
      console.error('Hydration calculation error:', error);
      return null;
    }
  }, [result, hydration, fromType, toType]);

  const fermentationTime = useMemo(() => {
    if (!temperature || isNaN(parseFloat(temperature))) return null;
    try {
      return calculateFermentationTime(
        parseFloat(temperature),
        parseFloat(hydration)
      );
    } catch (error) {
      console.error('Fermentation time calculation error:', error);
      return null;
    }
  }, [temperature, hydration]);

  useEffect(() => {
    const state = location.state as { prefill?: { amount: string; fromType: string; toType: string } };
    if (state?.prefill) {
      setAmount(state.prefill.amount);
      setFromType(state.prefill.fromType);
      setToType(state.prefill.toType);
    }
  }, [location.state]);

  const showResults = Boolean(amount && parseFloat(amount) > 0 && result);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-yeast-100">
          <CalculatorHeader />
          
          <div className="p-4 sm:p-6 space-y-6">
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
                result={result}
                temperatureAdjustment={temperatureAdjustment}
                hydrationAdjustment={hydrationAdjustment}
                fermentationTime={fermentationTime}
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
                  unit={unit}
                  setUnit={setUnit}
                  useTsp={useTsp}
                  setUseTsp={setUseTsp}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

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
