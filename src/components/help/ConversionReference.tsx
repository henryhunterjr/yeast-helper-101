import React from 'react';
import { Scale } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const ConversionReference = () => {
  return (
    <AccordionItem value="conversion">
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-yeast-600" />
          Conversion Reference
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yeast-50">
                <th className="p-2 text-left border">From / To</th>
                <th className="p-2 text-left border">Active Dry</th>
                <th className="p-2 text-left border">Instant</th>
                <th className="p-2 text-left border">Fresh</th>
                <th className="p-2 text-left border">Sourdough</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border font-medium bg-yeast-50">Active Dry</td>
                <td className="p-2 border">1</td>
                <td className="p-2 border">0.89</td>
                <td className="p-2 border">3</td>
                <td className="p-2 border">48</td>
              </tr>
              <tr>
                <td className="p-2 border font-medium bg-yeast-50">Instant</td>
                <td className="p-2 border">1.125</td>
                <td className="p-2 border">1</td>
                <td className="p-2 border">3.375</td>
                <td className="p-2 border">54</td>
              </tr>
              <tr>
                <td className="p-2 border font-medium bg-yeast-50">Fresh</td>
                <td className="p-2 border">0.333</td>
                <td className="p-2 border">0.296</td>
                <td className="p-2 border">1</td>
                <td className="p-2 border">16</td>
              </tr>
              <tr>
                <td className="p-2 border font-medium bg-yeast-50">Sourdough</td>
                <td className="p-2 border">0.021</td>
                <td className="p-2 border">0.019</td>
                <td className="p-2 border">0.0625</td>
                <td className="p-2 border">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ConversionReference;