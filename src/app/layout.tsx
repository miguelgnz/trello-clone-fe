import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { ColumnsContextProvider } from '@/context/ColumnsContext';
import { NextUIProvider } from '@nextui-org/react';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'A Trello clone built with Next.js, NextUI, Tailwind CSS, and React DnD.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-pink-500 to-yellow-500">
        <ThemeContextProvider>
          <ColumnsContextProvider>
            <TasksContextProvider>
              <NextUIProvider>
                <Layout>{children}</Layout>
              </NextUIProvider>
            </TasksContextProvider>
          </ColumnsContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
