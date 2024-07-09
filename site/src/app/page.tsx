// app/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Github } from 'lucide-react';
import { endpoints } from '@/constants/endpoints';
import { BuiltInPublicButton } from '@/components/BuiltInPublicButton';
import { WalletBalance } from '@/components/Wallet/Balance';
import { Header } from '@/components/Header';
import MoveLanguageQuizDialog from '@/components/move-quiz';


// Body Component
interface BodyProps {
  selectedEndpoint: string;
  setSelectedEndpoint: (value: string) => void;
  publicKey: string | null;
}

const Body: React.FC<BodyProps> = ({ selectedEndpoint, setSelectedEndpoint, publicKey }) => (
  <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
    <WalletMultiButton className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold transition-all hover:from-pink-600 hover:to-purple-600" />
    <Select onValueChange={(value: string) => setSelectedEndpoint(value)} defaultValue={selectedEndpoint}>
      <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
        <SelectValue placeholder="Select a network" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700 text-white">
        {endpoints.map((endpoint) => (
          <SelectItem key={endpoint.value} value={endpoint.value}>
            {endpoint.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <BuiltInPublicButton />
    <MoveLanguageQuizDialog />
  </div>
);

// Main Component
export default function SolanaWalletDashboard() {
  const { publicKey } = useWallet();
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>(endpoints[0].value);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <Body selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} publicKey={publicKey?.toBase58() || null} />
        {publicKey ? (
          <WalletBalance publicKey={publicKey} endpoint={selectedEndpoint} />
        ) : (
          <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-4" />
              <p className="text-xl font-semibold">Connect your wallet to view balance</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}