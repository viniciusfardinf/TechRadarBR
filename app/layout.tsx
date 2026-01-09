import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechRadarBR | Melhores Preços 2026",
  description: "Encontre os melhores preços de fones, celulares e smartwatches.",

  verification: {
    google: "4XVV-N64t-QysPE1lupuGrpHHFE1BPwuEMFQOMls3IE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}