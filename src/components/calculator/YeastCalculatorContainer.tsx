
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isOpen, setIsOpen] = useState(false);

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
              fromType={fromType}
              toType={toType}
              handleFromTypeChange={setFromType}
              handleToTypeChange={setToType}
              unit={unit}
              setUnit={setUnit}
              useTsp={useTsp}
              setUseTsp={setUseTsp}
            />

            {result && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
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

                {toType === 'sourdough' && (
                  <div className="border rounded-lg shadow-sm">
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                      <div className="border-b">
                        <Button
                          variant="ghost"
                          className="w-full flex items-center justify-between p-4"
                          asChild
                        >
                          <CollapsibleTrigger>
                            <div className="flex items-center gap-2">
                              <InfoIcon className="h-4 w-4" />
                              <span>Sourdough Starter Information</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {isOpen ? 'Hide' : 'Show'}
                            </span>
                          </CollapsibleTrigger>
                        </Button>
                      </div>
                      <CollapsibleContent>
                        <div className="p-4">
                          <Alert>
                            <AlertDescription>
                              When converting to sourdough starter, remember that it contains both flour and water. 
                              To maintain the right balance, reduce the recipe's flour and water by half the weight 
                              of the starter added. Also, expect longer fermentation times compared to commercial yeast.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </div>
            )}

            {toType === 'sourdough' && (
              <StarterStrengthSelect
                value={starterStrength}
                onChange={setStarterStrength}
              />
            )}

            <div className="space-y-4">
              <Input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Enter room temperature"
              />
              <Input
                type="number"
                value={hydration}
                onChange={(e) => setHydration(e.target.value)}
                placeholder="Enter hydration"
              />
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default YeastCalculatorContainer;
