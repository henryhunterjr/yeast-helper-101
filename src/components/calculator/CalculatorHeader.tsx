import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';

const CalculatorHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/65c95981-4fac-4d91-8751-e6804d8412e6.png" 
            alt="Baking Great Bread at Home Logo" 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-yeast-800">Yeast Converter</h1>
            <p className="text-sm text-gray-600">Convert between different types of yeast</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/help')}
          className="text-yeast-600 hover:text-yeast-700"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Copyright 2025. Baking Great Bread at Home by Henry Hunter
      </p>
    </div>
  );
};

export default CalculatorHeader;