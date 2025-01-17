import React from 'react';
import YeastInput from '../YeastInput';
import TemperatureInput from '../TemperatureInput';
import { yeastTypes } from '../../utils/yeastCalculations';

interface YeastInputSectionProps {
  amount: string;
  setAmount: (value: string) => void;
  temperature: string;
  setTemperature: (value: string) => void;
  fromType: string;
  setFromType: (value: string) => void;
  toType: string;
  setToType: (value: string) => void;
  isLoading: boolean;
}

const YeastInputSection = ({
  amount,
  setAmount,
  temperature,
  setTemperature,
  fromType,
  setFromType,
  toType,
  setToType,
  isLoading
}: YeastInputSectionProps) => {
  return (
    <div className="space-y-4">
      <YeastInput amount={amount} setAmount={setAmount} />
      <TemperatureInput temperature={temperature} setTemperature={setTemperature} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select
            value={fromType}
            onChange={(e) => setFromType(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
            disabled={isLoading}
          >
            {Object.entries(yeastTypes).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            value={toType}
            onChange={(e) => setToType(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
            disabled={isLoading}
          >
            {Object.entries(yeastTypes).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default YeastInputSection;