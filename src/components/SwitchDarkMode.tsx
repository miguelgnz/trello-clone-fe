"use client";
import { useThemeContext } from "@/context/ThemeContext";

const SwitchDarkMode = () => {
  const { switchDarkMode } = useThemeContext();

  return (
    <button
      onClick={() => {
        switchDarkMode();
      }}
    >
      SwitchDarkMode
    </button>
  );
};

export default SwitchDarkMode;
