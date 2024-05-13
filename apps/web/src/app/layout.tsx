import type { Metadata } from 'next';
import { Inter, Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/navbar';
import { StoreProvider } from './storeProvider';

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"]
});

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
      <body className={roboto.className}>
        <Navbar />
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        {/* <Footer /> */}
      </body>
    </html>
    </StoreProvider>
  );
}
