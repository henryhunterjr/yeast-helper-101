import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Info } from 'lucide-react';
import AboutUsContent from './AboutUsContent';

const AboutUsButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" aria-label="About Us">
          <Info className="h-4 w-4" />
          About Us
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>About YeastWise</DialogTitle>
          <DialogDescription>
            Learn about our mission and the team behind YeastWise
          </DialogDescription>
        </DialogHeader>
        <AboutUsContent />
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsButton;