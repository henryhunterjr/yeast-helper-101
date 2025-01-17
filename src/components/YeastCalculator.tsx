import React, { useState } from 'react';
import { Calculator, Scale, Thermometer } from 'lucide-react';

const YeastCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');

  const yeastTypes = {
    'active-dry': 'Active Dry Yeast',
    'instant': 'Instant Yeast',
    'fresh': 'Fresh Yeast',
    'sourdough': 'Sourdough Starter'
  };

  const calculateConversion = (amount: string, from: string, to: string): string => {
    if (!amount) return '0';
    const ratios: Record<string, Record<string, number>> = {
      'active-dry': { 'instant': 0.89, 'fresh': 3, 'sourdough': 48 },
      'instant': { 'active-dry': 1.125, 'fresh': 3.375, 'sourdough': 54 },
      'fresh': { 'active-dry': 0.333, 'instant': 0.296, 'sourdough': 16 },
      'sourdough': { 'active-dry': 0.021, 'instant': 0.019, 'fresh': 0.0625 }
    };
    
    if (from === to) return amount;
    const ratio = ratios[from]?.[to] || 1;
    return (parseFloat(amount) * ratio).toFixed(2);
  };

  const getTemperatureAdjustment = (temp: number): string => {
    if (temp < 65) return 'Increase proofing time by 15-20%';
    if (temp > 80) return 'Decrease proofing time by 15-20%';
    return 'Standard proofing time';
  };

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
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount (grams)</label>
            <div className="relative">
              <Scale className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-yeast-500 outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Temperature Input */}
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

          {/* Yeast Type Selectors */}
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

        {/* Results Panel */}
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