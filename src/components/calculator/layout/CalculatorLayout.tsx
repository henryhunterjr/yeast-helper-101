import React from 'react';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from '../../MeasurementToggle';
import { useDarkMode } from '@/hooks/useDarkMode';
import CalculatorHeader from '../CalculatorHeader';
import FavoritesList from '../../favorites/FavoritesList';

interface CalculatorLayoutProps {
  children: React.ReactNode;
}

const CalculatorLayout = ({ children }: CalculatorLayoutProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        <div className="bg-background dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-border">
          <CalculatorHeader />
          
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex justify-end">
              <DarkModeToggle 
                isDarkMode={isDarkMode} 
                onToggle={toggleDarkMode}
              />
            </div>
            {children}
          </div>
        </div>

        <div className="bg-background dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Saved Favorites</h2>
            <FavoritesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;