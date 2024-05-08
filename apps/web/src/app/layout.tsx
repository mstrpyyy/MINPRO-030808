import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/navbar';
import { StoreProvider } from './storeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eventopia',
  description: 'Eventopia: your ticketing buddy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
    </StoreProvider>
  );
}
