
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yeast-800 dark:text-white">About YeastWise</h2>
      <p className="text-gray-600 dark:text-gray-200">
        YeastWise is your companion for precise bread baking calculations. Our tools help you convert between different types of yeast and calculate baker's percentages for perfect results every time.
      </p>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3 text-yeast-700 dark:text-white">What are Baker's Percentages?</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-4">
            Baker's percentages are a professional method for expressing recipe ingredients as a percentage of the total flour weight. The flour is always considered 100%, and all other ingredients are expressed as a percentage relative to the flour weight.
          </p>
          <div className="bg-yeast-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <p className="font-medium text-yeast-800 dark:text-white mb-2">Example:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-200">
              <li>Flour: 1000g (100%)</li>
              <li>Water: 650g (65%)</li>
              <li>Salt: 20g (2%)</li>
              <li>Yeast: 10g (1%)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
