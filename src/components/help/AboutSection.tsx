import React from 'react';
import { Info } from 'lucide-react';
import { Separator } from '../ui/separator';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const AboutSection = () => {
  return (
    <AccordionItem value="about">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-yeast-600" />
          About
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            YeastWise v1.0.0 - Your professional companion for accurate yeast conversions
          </p>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Quick Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Always use room temperature ingredients unless specified</li>
              <li>Store yeast in a cool, dry place</li>
              <li>Check yeast expiration dates regularly</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Feedback</h3>
            <p className="text-gray-600">
              We value your input! Contact us at{' '}
              <a href="mailto:feedback@yeastwise.app" className="text-yeast-600 hover:underline">
                feedback@yeastwise.app
              </a>
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AboutSection;