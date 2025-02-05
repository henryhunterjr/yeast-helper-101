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
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <Dialog open onOpenChange={() => navigate('/')}>
      <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Help & About YeastWise</DialogTitle>
          <DialogDescription>
            Learn how to use the yeast calculator and get help with your bread baking journey
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculator
          </Button>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-8">
              <AboutSection />
              <QuickStartGuide />
              <ConversionReference />
              <TroubleshootingGuide />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpAbout;