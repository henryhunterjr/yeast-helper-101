import React from 'react';
import { Calculator, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const CalculatorHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-yeast-600" />
          YeastWise Calculator
        </h2>
        <p className="text-gray-600">Convert between different types of yeast</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/help')}
          className="text-gray-600 hover:text-gray-900"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="text-gray-600 hover:text-gray-900"
        >
          <SettingsIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default CalculatorHeader;