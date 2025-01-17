import React, { useState } from 'react';
import { Info, Check } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const AboutSection = () => {
  const { toast } = useToast();
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedbackClick = () => {
    setFeedbackSent(true);
    toast({
      title: "Thank you for your interest!",
      description: "Redirecting to feedback form...",
    });
    // Simulate opening email client after a brief delay
    setTimeout(() => {
      window.location.href = "mailto:feedback@yeastwise.app";
    }, 1500);
  };

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
          <div className="bg-yeast-50 p-4 rounded-lg transition-all duration-200 hover:shadow-md">
            <p className="text-gray-600">
              YeastWise v1.0.0 - Your professional companion for accurate yeast conversions
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-semibold">Quick Tips</h3>
            <ul className="space-y-2">
              {[
                'Always use room temperature ingredients unless specified',
                'Store yeast in a cool, dry place',
                'Check yeast expiration dates regularly'
              ].map((tip, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-2 p-2 bg-white rounded transition-all duration-200 hover:bg-yeast-50"
                >
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Feedback</h3>
            <p className="text-gray-600 mb-4">
              We value your input! Help us improve YeastWise.
            </p>
            <Button
              onClick={handleFeedbackClick}
              disabled={feedbackSent}
              className="w-full"
            >
              {feedbackSent ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Opening email client...
                </span>
              ) : (
                'Send Feedback'
              )}
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AboutSection;