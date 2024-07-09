import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from '@/components/WalletProvider';
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="./globals.css" />
        {/* Add other <link> elements here if needed */}
      </Head>
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}