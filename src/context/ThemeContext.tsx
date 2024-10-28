"use client";

import { createContext, useContext, useState } from "react";

const ctx = {
  darkMode: false,
  switchDarkMode: () => {},
};

export const ThemeContext = createContext(ctx);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const switchDarkMode = () => {
      console.log("dark mode is", darkMode);
    setDarkMode(!darkMode);
  };

  const value = {
    darkMode,
    switchDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
