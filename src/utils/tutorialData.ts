import { TutorialStep } from '@/types/tutorial';

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Basic Conversion",
    description: "Convert Active Dry to Instant Yeast - the most common conversion",
    example: {
      fromType: "active-dry",
      toType: "instant",
      amount: 7,
      temperature: 72
    }
  },
  {
    id: 2,
    title: "Temperature Adjustment",
    description: "See how temperature affects yeast activity",
    example: {
      fromType: "active-dry",
      toType: "instant",
      amount: 10,
      temperature: 85
    }
  },
  {
    id: 3,
    title: "Recipe Scaling",
    description: "Scale your recipe up or down",
    example: {
      fromType: "fresh",
      toType: "active-dry",
      amount: 15,
      temperature: 72
    }
  },
  {
    id: 4,
    title: "Sourdough Conversion",
    description: "Convert between commercial yeast and sourdough starter",
    example: {
      fromType: "active-dry",
      toType: "sourdough",
      amount: 5,
      temperature: 72
    }
  }
];