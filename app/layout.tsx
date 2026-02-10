
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://jeansnekears.com'),
=======
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://apiculturaelite.pe'),
>>>>>>> 19f4474eee780f8317b1d3bc0a339ff754cad089
  title: {
    default: 'Apicultura Elite | Equipamiento y Miel de Huancayo',
    template: '%s | Apicultura Elite',
  },
  description: 'Equipamiento profesional de apicultura y productos de la colmena premium en Huancayo. Apicultura Elite te trae lo mejor de la cosecha 2026.',
  keywords: ['apicultura huancayo', 'miel pura peru', 'ahumadores apicolas', 'trajes apicultor', 'propoleo', 'apicultura elite', 'miel de abeja'],
  authors: [{ name: 'Apicultura Elite' }],
  creator: 'Apicultura Elite',
  publisher: 'Apicultura Elite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
<<<<<<< HEAD
    title: 'Jean Sneakers | Zapatillas Exclusivas',
    description: 'Encuentra las zapatillas más exclusivas y la mejor moda urbana en Jean Sneakers Huancayo.',
    url: 'https://jeansnekears.com',
    siteName: 'Jean Sneakers',
=======
    title: 'Apicultura Elite | Equipamiento y Miel Premium',
    description: 'Encuentra los mejores productos derivados de la colmena y equipos profesionales de apicultura.',
    url: 'https://apiculturaelite.pe',
    siteName: 'Apicultura Elite',
>>>>>>> 19f4474eee780f8317b1d3bc0a339ff754cad089
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apicultura Elite',
    description: 'Excelencia apícola en el centro del país.',
    creator: '@apiculturaelite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}
      >
        <CartProvider>
          {children}
          <CartSidebar />
          <WhatsAppButton />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
