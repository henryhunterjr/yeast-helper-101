import React from 'react';

const TroubleshootingGuide = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Troubleshooting Guide</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Common Issues:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <span className="font-medium">Dough not rising properly:</span>
              <p className="ml-6">Check room temperature and adjust proofing time accordingly</p>
            </li>
            <li>
              <span className="font-medium">Conversion seems incorrect:</span>
              <p className="ml-6">Double-check your input measurements and yeast types</p>
            </li>
            <li>
              <span className="font-medium">Temperature adjustments:</span>
              <p className="ml-6">Follow the recommended water temperature for optimal results</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;