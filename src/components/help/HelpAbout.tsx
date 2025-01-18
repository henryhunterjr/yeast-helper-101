import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSection from './AboutSection';
import QuickStartGuide from './QuickStartGuide';
import ConversionReference from './ConversionReference';
import TroubleshootingGuide from './TroubleshootingGuide';
import RecipeExamples from './RecipeExamples';
import FAQ from './FAQ';

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Calculator
      </Button>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="reference">Reference</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <AboutSection />
        </TabsContent>

        <TabsContent value="quickstart" className="mt-6">
          <QuickStartGuide />
        </TabsContent>

        <TabsContent value="reference" className="mt-6">
          <ConversionReference />
        </TabsContent>

        <TabsContent value="troubleshooting" className="mt-6">
          <TroubleshootingGuide />
        </TabsContent>

        <TabsContent value="recipes" className="mt-6">
          <RecipeExamples />
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <FAQ />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpAbout;