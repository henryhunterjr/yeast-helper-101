import React from 'react';
import { Thermometer } from 'lucide-react';

interface TemperatureInputProps {
  temperature: string;
  setTemperature: (value: string) => void;
}

const TemperatureInput = ({ temperature, setTemperature }: TemperatureInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Room Temperature (°F)</label>
      <div className="relative">
        <Thermometer className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
          placeholder="Temperature (°F)"
        />
      </div>
    </div>
  );
};

export default TemperatureInput;