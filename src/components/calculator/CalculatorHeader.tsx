import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle } from 'lucide-react';
import AboutUsButton from '../about/AboutUsButton';

const CalculatorHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yeast-50 p-4 sm:p-6 border-b">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-yeast-800">
          YeastWise Calculator
        </h1>
        <div className="flex gap-2">
          <AboutUsButton />
          <Button
            variant="outline"
            onClick={() => navigate('/help')}
            className="gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/settings')}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm sm:text-base">
        Convert between different types of yeast for perfect bread baking results
      </p>
    </div>
  );
};

export default CalculatorHeader;