export const yeastTypes = {
  'active-dry': 'Active Dry Yeast',
  'instant': 'Instant Yeast',
  'fresh': 'Fresh Yeast',
  'sourdough': 'Sourdough Starter'
} as const;

export const conversionFactors = {
  'active-dry': {
    'instant': 0.75,
    'fresh': 3,
    'sourdough': 14
  },
  'instant': {
    'active-dry': 1.33,
    'fresh': 4,
    'sourdough': 18.67
  },
  'fresh': {
    'active-dry': 0.33,
    'instant': 0.25,
    'sourdough': 4.67
  },
  'sourdough': {
    'active-dry': 0.071,
    'instant': 0.054,
    'fresh': 0.214
  }
};