import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'TechRadarBR | Melhores Preços de Fone Bluetooth, Celular e Smartwatch',
  description: 'Guia definitivo de compra. Melhores preços de fones JBL, Anker, Samsung e Motorola. Confira qual fone bluetooth comprar e as melhores ofertas de celulares 2026.',
  keywords: 'melhor preço fone bluetooth, celular barato 2026, qual fone comprar, fone de ouvido academia, smartwatch promoção amazon',
  openGraph: {
    title: 'TechRadarBR - Ofertas de Tecnologia',
    description: 'A curadoria mais completa de eletrônicos com os menores preços da Amazon.',
    url: 'https://www.techradarbr.com.br', // Substitua pelo seu domínio final
    siteName: 'TechRadarBR',
    images: [{ url: '/og-image.jpg' }], // Salve uma imagem legal com este nome na pasta public
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
