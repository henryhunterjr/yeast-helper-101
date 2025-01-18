import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="different-yeasts">
          <AccordionTrigger>What's the difference between yeast types?</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Active Dry Yeast:</strong> Needs to be dissolved in water first, slower acting</li>
              <li><strong>Instant Yeast:</strong> Can be mixed directly with dry ingredients, faster acting</li>
              <li><strong>Fresh Yeast:</strong> Perishable, preferred by professional bakers, needs refrigeration</li>
              <li><strong>Sourdough Starter:</strong> Natural levain, requires regular feeding, provides complex flavors</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="storage">
          <AccordionTrigger>How should I store different types of yeast?</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Dry Yeast:</strong> Store in a cool, dry place. Once opened, keep in the refrigerator</li>
              <li><strong>Fresh Yeast:</strong> Always refrigerate, use within 2 weeks</li>
              <li><strong>Sourdough Starter:</strong> Room temperature if feeding daily, refrigerate if feeding weekly</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="temperature">
          <AccordionTrigger>Why is temperature important in bread making?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Temperature affects yeast activity significantly. Warmer temperatures (up to 95°F) speed up fermentation, 
              while cooler temperatures slow it down. The ideal temperature range is 75-85°F for most bread recipes. 
              Our calculator helps adjust proofing times based on your room temperature.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hydration">
          <AccordionTrigger>What is dough hydration and why does it matter?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Hydration is the ratio of water to flour by weight, expressed as a percentage. Higher hydration (70-80%) 
              creates an open, airy crumb structure but can be harder to handle. Lower hydration (60-65%) produces a 
              tighter crumb and is easier to work with. Our calculator helps adjust recipes for different hydration levels.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;