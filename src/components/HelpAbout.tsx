import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import AboutSection from './help/AboutSection';
import QuickStartGuide from './help/QuickStartGuide';
import ConversionReference from './help/ConversionReference';
import TroubleshootingGuide from './help/TroubleshootingGuide';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help & About</DialogTitle>
          <DialogDescription>
            Learn how to use the yeast calculator and get help
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-w-4xl mx-auto p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculator
          </Button>

          <div className="space-y-12">
            <AboutSection />
            <QuickStartGuide />
            <ConversionReference />
            <TroubleshootingGuide />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpAbout;