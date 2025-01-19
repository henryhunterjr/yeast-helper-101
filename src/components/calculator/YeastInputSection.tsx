import React from 'react';
import YeastInput from '../YeastInput';
import TemperatureInput from '../TemperatureInput';
import { Input } from "@/components/ui/input";
import { Droplets } from 'lucide-react';
import { UnitType } from '@/utils/yeastTypes';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface YeastInputSectionProps {
  amount: string;
  setAmount: (value: string) => void;
  temperature: string;
  setTemperature: (value: string) => void;
  hydration: string;
  setHydration: (value: string) => void;
  fromType: string;
  setFromType: (value: string) => void;
  toType: string;
  setToType: (value: string) => void;
  isLoading: boolean;
  showAdjustments?: boolean;
  hideMainInputs?: boolean;
  unit: UnitType;
  setUnit: (value: UnitType) => void;
  useTsp: boolean;
  setUseTsp: (value: boolean) => void;
}

const YeastInputSection = ({
  amount,
  setAmount,
  temperature,
  setTemperature,
  hydration,
  setHydration,
  fromType,
  setFromType,
  toType,
  setToType,
  isLoading,
  showAdjustments = false,
  hideMainInputs = false,
  unit,
  setUnit,
  useTsp,
  setUseTsp,
}: YeastInputSectionProps) => {
  return (
    <div className="space-y-8">
      {!hideMainInputs && (
        <div className="space-y-6">
          <YeastInput 
            amount={amount} 
            setAmount={setAmount}
            yeastType={fromType}
            unit={unit}
            setUnit={setUnit}
            useTsp={useTsp}
            setUseTsp={setUseTsp}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From</label>
              <Select
                value={fromType}
                onValueChange={setFromType}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-background text-foreground">
                  <SelectValue placeholder="Select yeast type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
                  <SelectItem value="instant">Instant Yeast</SelectItem>
                  <SelectItem value="fresh">Fresh Yeast</SelectItem>
                  <SelectItem value="sourdough">Sourdough Starter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To</label>
              <Select
                value={toType}
                onValueChange={setToType}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-background text-foreground">
                  <SelectValue placeholder="Select yeast type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
                  <SelectItem value="instant">Instant Yeast</SelectItem>
                  <SelectItem value="fresh">Fresh Yeast</SelectItem>
                  <SelectItem value="sourdough">Sourdough Starter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {showAdjustments && (
        <div className="space-y-6">
          <TemperatureInput temperature={temperature} setTemperature={setTemperature} />

          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">
              Starter Hydration (%)
              <Tooltip>
                <TooltipTrigger className="ml-1 inline-flex">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Hydration percentage affects fermentation speed. 100% means equal parts flour and water.
                  </p>
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="relative">
              <Droplets className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="number"
                inputMode="decimal"
                value={hydration}
                onChange={(e) => setHydration(e.target.value)}
                className="pl-10 w-full"
                placeholder="Enter hydration %"
                min="50"
                max="200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YeastInputSection;