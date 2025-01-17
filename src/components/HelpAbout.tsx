import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Accordion } from './ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

import QuickStartGuide from './help/QuickStartGuide';
import ConversionReference from './help/ConversionReference';
import TroubleshootingGuide from './help/TroubleshootingGuide';
import AboutSection from './help/AboutSection';

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Calculator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Help & About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-yeast-800">Help & About</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <QuickStartGuide />
          <ConversionReference />
          <TroubleshootingGuide />
          <AboutSection />
        </Accordion>
      </div>
    </div>
  );
};

export default HelpAbout;