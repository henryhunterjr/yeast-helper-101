
import React, { useState } from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import CalculatorForm from './form/CalculatorForm';
import ConversionResult from './ConversionResult';
import CalculatorLayout from './layout/CalculatorLayout';
import StarterStrengthSelect from './StarterStrengthSelect';
import { calculateConversion } from '@/utils/yeastCalculations';
import { 
  getTemperatureAdjustment,
  calculateHydrationAdjustment,
  calculateProofingTime
} from '@/utils/calculationHelpers';

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

  const { result, isSimplified } = amount && fromType && toType 
    ? calculateConversion(
        amount,
        fromType,
        toType,
        useTsp,
        parseFloat(temperature),
        parseFloat(hydration),
        starterStrength
      )
    : { result: '', isSimplified: false };

  return (
    <CalculatorLayout>
      <div className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-6">
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

            {result && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
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
              </div>
            )}
          </div>

          {toType === 'sourdough' && (
            <StarterStrengthSelect
              value={starterStrength}
              onChange={setStarterStrength}
            />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;
