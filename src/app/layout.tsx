"use client";
import "./globals.css";

import { Montserrat } from 'next/font/google'
import { CartProvider } from "@/context/CartContext";


const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
      <body className={montserrat.className}>{children}</body>
      </CartProvider>
    </html>
  );
}


