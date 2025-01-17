import React from 'react';

const QuickStartGuide = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quick Start Guide</h2>
      <ol className="list-decimal list-inside space-y-3 text-gray-600">
        <li>Enter the amount of yeast you want to convert</li>
        <li>Select the type of yeast you're converting from</li>
        <li>Select the type of yeast you're converting to</li>
        <li>Input your room temperature (optional)</li>
        <li>View your conversion result and temperature adjustments</li>
      </ol>
    </div>
  );
};

export default QuickStartGuide;