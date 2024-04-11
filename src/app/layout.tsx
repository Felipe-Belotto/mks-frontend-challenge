
import "./globals.css";
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'MKS sistemas',
  description: 'Desafio Frontend da MKS sistemas',
  keywords:"Desafio Frontend JR, MKS sistemas, Front End Junior,",
}

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}


