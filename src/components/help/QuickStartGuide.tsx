import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const QuickStartGuide = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yeast-800">Quick Start Guide</h2>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yeast-700">Yeast Conversion</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Enter the amount of yeast you want to convert</li>
                <li>Select the type of yeast you're converting from</li>
                <li>Select the type of yeast you're converting to</li>
                <li>Input your room temperature (optional)</li>
                <li>View your conversion result and temperature adjustments</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-yeast-700">Baker's Percentages</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Enter your total flour weight</li>
                <li>Adjust hydration percentage (typically 65-75%)</li>
                <li>Set your starter percentage if using sourdough</li>
                <li>Adjust salt percentage (typically 1.8-2.2%)</li>
                <li>Toggle between grams and ounces as needed</li>
                <li>View your complete recipe breakdown</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStartGuide;