import React from 'react';
import YeastInput from '../YeastInput';
import TemperatureInput from '../TemperatureInput';
import { Input } from "@/components/ui/input";
import { Droplets } from 'lucide-react';
import { yeastTypes } from '../../utils/yeastCalculations';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  showAdjustments = true,
  hideMainInputs = false,
}: YeastInputSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Primary Conversion Section */}
      {!hideMainInputs && (
        <div className="space-y-6">
          <YeastInput amount={amount} setAmount={setAmount} />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={fromType}
                onChange={(e) => setFromType(e.target.value)}
                className="w-full p-3 sm:p-2 text-lg sm:text-base border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
                disabled={isLoading}
              >
                {Object.entries(yeastTypes).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={toType}
                onChange={(e) => setToType(e.target.value)}
                className="w-full p-3 sm:p-2 text-lg sm:text-base border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
                disabled={isLoading}
              >
                {Object.entries(yeastTypes).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Adjustments Section */}
      {showAdjustments && (
        <div className="space-y-6">
          <TemperatureInput temperature={temperature} setTemperature={setTemperature} />

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">
              Starter Hydration (%)
              <Tooltip>
                <TooltipTrigger className="ml-1 inline-flex">
                  <Droplets className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Hydration percentage affects fermentation speed. 100% means equal parts flour and water.
                  </p>
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="relative">
              <Droplets className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <Input
                type="number"
                inputMode="decimal"
                value={hydration}
                onChange={(e) => setHydration(e.target.value)}
                className="pl-10 w-full text-lg sm:text-base h-12 sm:h-10"
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