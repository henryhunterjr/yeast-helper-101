import React from 'react';

const AboutSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">About Yeast Converter</h2>
      <p className="text-gray-600">
        The Yeast Converter is a tool designed to help bakers convert between different types of yeast,
        taking into account temperature adjustments and providing accurate measurements for your recipes.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Convert between Active Dry, Instant, Fresh, and Sourdough Starter</li>
          <li>Temperature-based proofing time adjustments</li>
          <li>Water temperature recommendations</li>
          <li>Simple and intuitive interface</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSection;