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
  extend: {
    colors: {
      column: '#101204',
      task: '#22272b',
      taskText: '#b6c2cf',
      white: '#ffffff',
      navbar: '#0000003d',
      secondaryBtn: '#0c66e4',
      modal: '#31393f',
      modalInput: '#22272b',
    },
  },
};
export const darkMode = 'class';
export const plugins = [nextui()];
