
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle } from 'lucide-react';
import AboutUsButton from '../about/AboutUsButton';

const CalculatorHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-yeast-50 p-4 sm:p-6 border-b overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/lovable-uploads/b0d3f906-169b-46d0-a0ca-ab3082f87b18.png")',
          filter: 'grayscale(20%)',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <div className="flex flex-col items-center sm:items-start mb-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/8f3090b9-c87f-4a4b-8aa7-2444ba74de79.png" 
              alt="YeastWise Logo" 
              className="h-16"
            />
            <img 
              src="/lovable-uploads/d30b41b2-ab58-4bb5-90ea-93fa2a3ff7d3.png"
              alt="Baking Great Bread at Home Facebook Group"
              className="h-16 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-yeast-800">
              YeastWise and Baker's Percentage Calculator
            </h1>
            <h2 className="text-xl sm:text-2xl text-yeast-600 mt-1">
              Your Ultimate Baking Calculator
            </h2>
          </div>
          <div className="flex gap-2">
            <AboutUsButton />
            <Button
              variant="outline"
              onClick={() => navigate('/help')}
              className="gap-2"
              aria-label="Help"
            >
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
              className="gap-2"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Convert between different types of yeast and calculate baker's percentages for perfect bread baking results
        </p>
      </div>
    </div>
  );
};

export default CalculatorHeader;
