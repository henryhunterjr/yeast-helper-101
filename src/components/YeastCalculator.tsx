import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import YeastInput from './YeastInput';
import TemperatureInput from './TemperatureInput';
import CalculatorHeader from './calculator/CalculatorHeader';
import ConversionResult from './calculator/ConversionResult';
import { yeastTypes, calculateConversion, getTemperatureAdjustment } from '../utils/yeastCalculations';

const YeastCalculator = () => {
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [fromType, setFromType] = useState('active-dry');
  const [toType, setToType] = useState('instant');
  const [temperature, setTemperature] = useState('72');

  useEffect(() => {
    const state = location.state as { prefill?: { amount: string; fromType: string; toType: string } };
    if (state?.prefill) {
      setAmount(state.prefill.amount);
      setFromType(state.prefill.fromType);
      setToType(state.prefill.toType);
    }
  }, [location.state]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <CalculatorHeader />

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

        <ConversionResult
          amount={amount}
          fromType={fromType}
          toType={toType}
          temperature={temperature}
          result={calculateConversion(amount, fromType, toType)}
          temperatureAdjustment={getTemperatureAdjustment(parseFloat(temperature))}
        />
      </div>
    </div>
  );
};

export default YeastCalculator;