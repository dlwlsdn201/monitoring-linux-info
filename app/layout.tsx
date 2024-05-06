import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/dashboard.module.css';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Header from './shared/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
