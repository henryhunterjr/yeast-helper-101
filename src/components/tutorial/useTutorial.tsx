import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorialState {
  hasSeenTutorial: boolean;
  isActive: boolean;
  currentStep: number;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setHasSeenTutorial: () => void;
}

export const useTutorial = create<TutorialState>()(
  persist(
    (set) => ({
      hasSeenTutorial: true, // Force tutorial to be marked as seen
      isActive: false, // Force tutorial to be inactive
      currentStep: 0,
      startTutorial: () => set({ isActive: false }), // Prevent tutorial from starting
      endTutorial: () => set({ isActive: false }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
    }),
    {
      name: 'tutorial-storage',
    }
  )
);