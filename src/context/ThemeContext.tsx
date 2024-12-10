'use client';

import { Background } from '@/utils/types';
import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  switchDarkMode: () => void;
  changeBackground: (background: Background) => void;
}

const ctx: ThemeContextType = {
  darkMode: false,
  switchDarkMode: () => {},
  changeBackground: () => {},
};

export const ThemeContext = createContext(ctx);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [background, setBackground] = useState<Background>(() => {
    return {
      id: 'bg-1',
      color: 'bg-gradient-to-r from-pink-500 to-yellow-500',
      emoji: '🌅',
    };
  });

  //Get selected background color from local storage
  useEffect(() => {
    const background = localStorage.getItem('background');
    if (background) {
      setBackground(JSON.parse(background));
    }
  }, []);

  //Set selected background color on local storage using debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('background', JSON.stringify(background));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [background]);

  useEffect(() => {
    document.body.className = background.color;
  }, [background]);

  const switchDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeBackground = (background: Background) => {
    setBackground(background);
  };

  const value = {
    darkMode,
    switchDarkMode,
    changeBackground,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
