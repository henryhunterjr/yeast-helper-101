import YeastCalculator from "../components/YeastCalculator";
import Footer from "../components/Footer";
import TutorialButton from "../components/tutorial/TutorialButton";
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
    <div className="min-h-screen bg-gradient-to-b from-yeast-50 to-white flex flex-col">
      <div className="flex-grow py-4 sm:py-12 px-4 sm:px-6">
        <YeastCalculator />
      </div>
      <TutorialButton />
      <TutorialOverlay />
      <Footer />
    </div>
  );
};

export default Index;