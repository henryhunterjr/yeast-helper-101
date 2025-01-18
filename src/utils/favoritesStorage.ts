export interface StoredFavorite {
  id: string;
  timestamp: string;
  fromType: string;
  toType: string;
  amount: number;
  temperature: number;
  result: number;
  notes?: string;
}

const STORAGE_KEY = 'yeastwise-favorites';

export const saveFavorite = (favorite: Omit<StoredFavorite, 'id' | 'timestamp'>): StoredFavorite => {
  const favorites = getFavorites();
  const newFavorite: StoredFavorite = {
    ...favorite,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newFavorite, ...favorites]));
  
  // Dispatch custom event to notify components about the update
  window.dispatchEvent(new Event('favoritesUpdated'));
  
  return newFavorite;
};

export const getFavorites = (): StoredFavorite[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteFavorite = (id: string): void => {
  const favorites = getFavorites();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites.filter(f => f.id !== id))
  );
  
  // Dispatch custom event to notify components about the update
  window.dispatchEvent(new Event('favoritesUpdated'));
};

export const updateFavoriteNotes = (id: string, notes: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.map(f => 
    f.id === id ? { ...f, notes } : f
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  
  // Dispatch custom event to notify components about the update
  window.dispatchEvent(new Event('favoritesUpdated'));
};