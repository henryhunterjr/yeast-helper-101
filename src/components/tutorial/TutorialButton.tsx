import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTutorial } from './useTutorial';

const TutorialButton = () => {
  const { startTutorial } = useTutorial();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Button
        variant="default"
        size="sm"
        className="shadow-lg hover:shadow-xl transition-all gap-2 rounded-full px-4 py-2"
        onClick={startTutorial}
      >
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline">Tutorial</span>
      </Button>
    </div>
  );
};

export default TutorialButton;