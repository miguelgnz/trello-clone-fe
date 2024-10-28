'use client';
import { useThemeContext } from '@/context/ThemeContext';
import { CiDark, CiLight } from 'react-icons/ci';

const SwitchDarkMode = () => {
  const { switchDarkMode, darkMode } = useThemeContext();

  return (
    <button
      onClick={switchDarkMode}
      className="w-16 h-16 flex items-center justify-center"
    >
      {darkMode ? (
        <CiLight size={32} color="#FFF" />
      ) : (
        <CiDark size={32} color="#FFF" />
      )}
    </button>
  );
};

export default SwitchDarkMode;
