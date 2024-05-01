import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/dashboard.module.css';
import { ReactNode } from 'react';
import Header from '../components/Header';

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
        {children}
      </body>
    </html>
  );
}
