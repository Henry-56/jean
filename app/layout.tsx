
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://jeansnekears.com'),
  title: {
    default: 'Jean Sneakers | Zapatillas Exclusivas en Huancayo',
    template: '%s | Jean Sneakers',
  },
  description: 'Tu destino número uno en Huancayo para zapatillas exclusivas (Nike, Adidas, Jordan, Yeezy). Jean Sneakers te trae lo mejor del streetwear.',
  keywords: ['zapatillas huancayo', 'streetwear peru', 'nike dunk', 'jordan retro', 'yeezy', 'jean sneakers', 'sneakers peru'],
  authors: [{ name: 'Jean Sneakers' }],
  creator: 'Jean Sneakers',
  publisher: 'Jean Sneakers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Jean Sneakers | Zapatillas Exclusivas',
    description: 'Encuentra las zapatillas más exclusivas y la mejor moda urbana en Jean Sneakers Huancayo.',
    url: 'https://jeansnekears.com',
    siteName: 'Jean Sneakers',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jean Sneakers',
    description: 'Sneakers & Streetwear Exclusivos en Huancayo.',
    creator: '@jeansneakers_hyo', // Placeholder functionality
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
    icon: '/api/images/jean/logo-1770568717019.jpeg',
    shortcut: '/api/images/jean/logo-1770568717019.jpeg',
    apple: '/api/images/jean/logo-1770568717019.jpeg',
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
