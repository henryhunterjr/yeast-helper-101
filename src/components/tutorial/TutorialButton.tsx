import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTutorial } from './useTutorial';

const TutorialButton = () => {
  const { startTutorial } = useTutorial();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      onClick={startTutorial}
    >
      <HelpCircle className="h-5 w-5" />
    </Button>
  );
};

export default TutorialButton;