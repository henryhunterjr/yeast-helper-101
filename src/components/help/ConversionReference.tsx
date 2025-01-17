import React from 'react';

const ConversionReference = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Conversion Reference</h2>
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
              <td className="px-4 py-2 border">0.89</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Active Dry</td>
              <td className="px-4 py-2 border">Fresh</td>
              <td className="px-4 py-2 border">3.0</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Instant</td>
              <td className="px-4 py-2 border">Fresh</td>
              <td className="px-4 py-2 border">3.375</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConversionReference;