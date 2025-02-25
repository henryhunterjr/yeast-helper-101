
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set default to true

  useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.darkMode ?? true); // Default to true if not set
    } else {
      // If no settings exist, initialize with dark mode
      localStorage.setItem('yeastwise-settings', JSON.stringify({ darkMode: true }));
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    const savedSettings = localStorage.getItem('yeastwise-settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    localStorage.setItem('yeastwise-settings', JSON.stringify({
      ...settings,
      darkMode: value
    }));
  };

  return { isDarkMode, toggleDarkMode };
};
