import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const QuickStartGuide = () => {
  return (
    <AccordionItem value="quick-start">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-yeast-600" />
          Quick Start Guide
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Basic Usage</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter the amount of yeast you have</li>
                <li>Select your current yeast type</li>
                <li>Choose the yeast type you want to convert to</li>
                <li>Input the room temperature (optional)</li>
                <li>View your conversion result and temperature adjustments</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuickStartGuide;