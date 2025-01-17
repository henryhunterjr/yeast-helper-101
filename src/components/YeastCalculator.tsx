import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import YeastInput from './YeastInput';
import TemperatureInput from './TemperatureInput';
import { yeastTypes, calculateConversion, getTemperatureAdjustment } from '../utils/yeastCalculations';

const YeastCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-yeast-600" />
          YeastWise Calculator
        </h2>
        <p className="text-gray-600">Convert between different types of yeast</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
              >
                {Object.entries(yeastTypes).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-yeast-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Conversion Result</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="text-lg font-mono">{amount || '0'}g {yeastTypes[fromType]} =</p>
              <p className="text-2xl font-bold text-yeast-600 font-mono">
                {calculateConversion(amount, fromType, toType)}g {yeastTypes[toType]}
              </p>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium">Adjustments for {temperature}°F:</p>
              <ul className="list-disc pl-4 mt-2">
                <li>{getTemperatureAdjustment(parseFloat(temperature))}</li>
                <li>Water temperature: {temperature ? `${Math.round(105 - parseFloat(temperature))}°F` : 'Room temperature'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YeastCalculator;