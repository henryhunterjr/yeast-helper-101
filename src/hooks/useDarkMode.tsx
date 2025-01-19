import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('yeastwise-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.darkMode || false);
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