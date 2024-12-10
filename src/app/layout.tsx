import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { BoardsContextProvider } from '@/context/BoardsContext';
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
  description:
    'A Trello clone built with Next.js, NextUI, Tailwind CSS, and React DnD.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ThemeContextProvider>
          <BoardsContextProvider>
            <NextUIProvider>
              <Layout>{children}</Layout>
            </NextUIProvider>
          </BoardsContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
