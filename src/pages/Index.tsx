import YeastCalculator from "../components/YeastCalculator";
import NewCalculator from "../components/bakers-calculator/NewCalculator";
import Footer from "../components/Footer";
import TutorialOverlay from "../components/tutorial/TutorialOverlay";
import { useEffect } from "react";
import { useTutorial } from "../components/tutorial/useTutorial";

const Index = () => {
  const { hasSeenTutorial, startTutorial } = useTutorial();

  useEffect(() => {
    if (!hasSeenTutorial) {
      startTutorial();
    }
  }, [hasSeenTutorial, startTutorial]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex-grow py-4 sm:py-12 px-4 sm:px-6">
        <div 
          className="space-y-8"
          style={{ minHeight: "calc(100vh - 1px)" }}
          aria-hidden={!hasSeenTutorial}
        >
          <YeastCalculator />
          <NewCalculator />
        </div>
      </div>
      <TutorialOverlay />
      <Footer />
    </div>
  );
};

export default Index;