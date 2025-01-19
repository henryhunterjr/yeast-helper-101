import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import CalculatorHeader from './CalculatorHeader';
import YeastInputSection from './YeastInputSection';
import ConversionResult from './ConversionResult';
import FavoritesList from '../favorites/FavoritesList';
import DarkModeToggle from '../MeasurementToggle';
import { UnitType, YeastType } from '@/utils/yeastTypes';
import { 
  calculateConversion, 
  getTemperatureAdjustment, 
  calculateHydrationAdjustment,
  calculateFermentationTime,
} from '../../utils/yeastCalculations';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFromTypeChange = (value: YeastType) => {
    if (value === toType) {
      // Prevent selecting the same type for both inputs
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    setFromType(value as YeastType);
  };

  const handleToTypeChange = (value: YeastType) => {
    if (value === fromType) {
      // Prevent selecting the same type for both inputs
      toast({
        title: "Invalid Selection",
        description: "From and To types cannot be the same",
        variant: "destructive",
      });
      return;
    }
    setToType(value as YeastType);
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.darkMode || false);
      setUnit(settings.units === 'teaspoons' ? 'tsp' : settings.units === 'imperial' ? 'oz' : 'g');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleReset = () => {
    setAmount('');
    setFromType('active-dry');
    setToType('instant');
    setTemperature('72');
    setHydration('100');
  };

  const conversionResult = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return { result: '', isSimplified: false };
    try {
      return calculateConversion(amount, fromType, toType, useTsp);
    } catch (error) {
      console.error('Calculation error:', error);
      return { result: '', isSimplified: false };
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
    if (!conversionResult.result || isNaN(parseFloat(hydration))) return null;
    try {
      return calculateHydrationAdjustment(
        parseFloat(hydration),
        parseFloat(conversionResult.result),
        fromType,
        toType
      );
    } catch (error) {
      console.error('Hydration calculation error:', error);
      return null;
    }
  }, [conversionResult.result, hydration, fromType, toType]);

  const fermentationTime = useMemo(() => {
    if (!temperature || isNaN(parseFloat(temperature))) return null;
    try {
      return calculateFermentationTime(
        fromType,
        parseFloat(hydration),
        parseFloat(temperature)
      );
    } catch (error) {
      console.error('Fermentation time calculation error:', error);
      return null;
    }
  }, [temperature, hydration, fromType]);

  useEffect(() => {
    const state = location.state as { prefill?: { amount: string; fromType: YeastType; toType: YeastType } };
    if (state?.prefill) {
      setAmount(state.prefill.amount);
      setFromType(state.prefill.fromType);
      setToType(state.prefill.toType);
    }
  }, [location.state]);

  const showResults = Boolean(amount && parseFloat(amount) > 0 && conversionResult.result);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-yeast-100 dark:border-gray-700">
          <CalculatorHeader />
          
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex justify-end">
              <DarkModeToggle 
                isDarkMode={isDarkMode} 
                onToggle={(value) => {
                  setIsDarkMode(value);
                  const savedSettings = localStorage.getItem('yeastwise-settings');
                  const settings = savedSettings ? JSON.parse(savedSettings) : {};
                  localStorage.setItem('yeastwise-settings', JSON.stringify({
                    ...settings,
                    darkMode: value
                  }));
                }}
              />
            </div>
            
            <YeastInputSection
              amount={amount}
              setAmount={setAmount}
              temperature={temperature}
              setTemperature={setTemperature}
              hydration={hydration}
              setHydration={setHydration}
              fromType={fromType}
              setFromType={handleFromTypeChange}
              toType={toType}
              setToType={handleToTypeChange}
              isLoading={isLoading}
              showAdjustments={false}
              unit={unit}
              setUnit={setUnit}
              useTsp={unit === 'tsp'}
              setUseTsp={() => {}} // This is now handled through settings
            />

            {showResults && (
              <ConversionResult
                amount={amount}
                fromType={fromType}
                toType={toType}
                temperature={temperature}
                hydration={hydration}
                result={conversionResult.result}
                temperatureAdjustment={temperatureAdjustment}
                hydrationAdjustment={hydrationAdjustment}
                fermentationTime={fermentationTime}
                isLoading={isLoading}
                unit={unit}
                onReset={handleReset}
                isSimplified={conversionResult.isSimplified}
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
                  setFromType={handleFromTypeChange}
                  toType={toType}
                  setToType={handleToTypeChange}
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
