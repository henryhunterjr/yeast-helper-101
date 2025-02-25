
import React from 'react';
import { YeastType, UnitType } from '@/utils/yeastTypes';
import YeastTypeSelector from '../YeastTypeSelector';
import AmountInput from '../inputs/AmountInput';
import UnitSelector from '../inputs/UnitSelector';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from 'lucide-react';

interface CalculatorFormProps {
  amount: string;
  setAmount: (value: string) => void;
  temperature: string;
  setTemperature: (value: string) => void;
  hydration: string;
  setHydration: (value: string) => void;
  fromType: YeastType;
  toType: YeastType;
  handleFromTypeChange: (type: YeastType) => void;
  handleToTypeChange: (type: YeastType) => void;
  isLoading: boolean;
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (useTsp: boolean) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  amount,
  setAmount,
  temperature,
  setTemperature,
  hydration,
  setHydration,
  fromType,
  toType,
  handleFromTypeChange,
  handleToTypeChange,
  isLoading,
  unit,
  setUnit,
  useTsp,
  setUseTsp,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <YeastTypeSelector
          fromType={fromType}
          toType={toType}
          onFromTypeChange={handleFromTypeChange}
          onToTypeChange={handleToTypeChange}
        />
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <AmountInput
              amount={amount}
              setAmount={setAmount}
              unit={unit}
              yeastType={fromType}
            />
            <UnitSelector
              unit={unit}
              setUnit={setUnit}
              useTsp={useTsp}
              setUseTsp={setUseTsp}
            />
          </div>
        </div>
      </div>

      <Card className="p-6 bg-muted/50">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="room-temp">Room Temperature (°F)</Label>
            </div>
            <Input
              id="room-temp"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter room temperature"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="hydration">Hydration (%)</Label>
            </div>
            <Input
              id="hydration"
              type="number"
              value={hydration}
              onChange={(e) => setHydration(e.target.value)}
              placeholder="Enter hydration percentage"
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalculatorForm;
