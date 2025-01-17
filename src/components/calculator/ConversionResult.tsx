import React from 'react';
import { yeastTypes } from '../../utils/yeastCalculations';

interface ConversionResultProps {
  amount: string;
  fromType: string;
  toType: string;
  temperature: string;
  result: string;
  temperatureAdjustment: string;
  isLoading?: boolean;
}

const ConversionResult = ({ 
  amount, 
  fromType, 
  toType, 
  temperature, 
  result, 
  temperatureAdjustment,
  isLoading = false
}: ConversionResultProps) => {
  if (isLoading) {
    return (
      <div className="bg-yeast-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Calculating...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yeast-50 p-6 rounded-lg">
      <h3 className="font-semibold mb-4">Conversion Result</h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-lg font-mono">{amount || '0'}g {yeastTypes[fromType]} =</p>
          <p className="text-2xl font-bold text-yeast-600 font-mono">
            {result}g {yeastTypes[toType]}
          </p>
        </div>
        
        <div className="text-sm text-gray-600">
          <p className="font-medium">Adjustments for {temperature}°F:</p>
          <ul className="list-disc pl-4 mt-2">
            <li>{temperatureAdjustment}</li>
            <li>Water temperature: {temperature ? `${Math.round(105 - parseFloat(temperature))}°F` : 'Room temperature'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;