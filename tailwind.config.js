import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  colors: {
    column: '#101204',
    task: '#22272b',
    taskText: '#b6c2cf',
    white: '#ffffff',
    navbar: '#1d2125',
  },
  extend: {},
};
export const darkMode = 'class';
export const plugins = [nextui()];
