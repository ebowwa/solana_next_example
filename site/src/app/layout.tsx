import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from '@/components/Wallet/WalletProvider';
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elijah's Solana Wallet",
  description: "A nextjs app router solana - phantom wallet example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}