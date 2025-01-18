import React from 'react';

const ConversionReference = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Conversion Reference</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Yeast Conversions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border">From</th>
                <th className="px-4 py-2 border">To</th>
                <th className="px-4 py-2 border">Multiply By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Active Dry</td>
                <td className="px-4 py-2 border">Instant</td>
                <td className="px-4 py-2 border">0.75</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Active Dry</td>
                <td className="px-4 py-2 border">Fresh</td>
                <td className="px-4 py-2 border">2.5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Instant</td>
                <td className="px-4 py-2 border">Fresh</td>
                <td className="px-4 py-2 border">3.33</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-6">Sourdough Starter Hydration Guide</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-600">
            For 100% hydration starter (equal parts flour and water):
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>100g starter = 50g flour + 50g water</li>
            <li>50g starter = 25g flour + 25g water</li>
            <li>25g starter = 12.5g flour + 12.5g water</li>
          </ul>
          
          <p className="text-sm text-gray-600 mt-4">
            For other hydration levels (e.g., 75% hydration):
          </p>
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-sm font-mono">
              Flour = Starter Weight × (1 ÷ (1 + Hydration%))
              <br />
              Water = Starter Weight × (Hydration% ÷ (1 + Hydration%))
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6">Temperature Adjustments</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Below 68°F: Increase proofing time by 20-30%</li>
            <li>68-76°F: Standard proofing time</li>
            <li>Above 76°F: Decrease proofing time by 20-30%</li>
            <li>Water temperature = (Desired Dough Temp × 4) − (Room Temp + Flour Temp + Friction Factor)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversionReference;