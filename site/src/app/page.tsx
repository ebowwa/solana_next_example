"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getConnection } from '@/components/WalletProvider/connection-api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Github } from 'lucide-react';

const endpoints = [
  { value: 'https://api.mainnet-beta.solana.com', label: 'Mainnet' },
  { value: 'https://api.testnet.solana.com', label: 'Testnet' },
  { value: 'https://api.devnet.solana.com', label: 'Devnet' }
];

interface WalletBalanceProps {
  publicKey: PublicKey | null;
  endpoint: string;
}

function WalletBalance({ publicKey, endpoint }: WalletBalanceProps) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      const connection = getConnection(endpoint);
      connection.getBalance(publicKey).then((bal: number) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      }).catch((error: any) => {
        console.error('Error fetching balance:', error);
        setBalance(null);
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, endpoint]);

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wallet Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-300">Public Key</p>
        <p className="mb-4 font-mono text-xs break-all">{publicKey?.toBase58() || 'Not connected'}</p>
        <p className="mb-2 text-sm text-gray-300">Balance</p>
        <p className="text-3xl font-bold">
          {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
        </p>
      </CardContent>
    </Card>
  );
}

function BuiltInPublicButton() {
  return (
    <Link href="https://github.com/ebowwa/solana_next_example" passHref>
      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-8 py-3 font-medium text-white transition-all duration-300 ease-out hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500">
        <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full" />
        <span className="relative flex items-center gap-2">
          <Github className="h-5 w-5" />
          <span>Built in Public</span>
        </span>
      </button>
    </Link>
  );
}

export default function SolanaWalletDashboard() {
  const { publicKey } = useWallet();
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>(endpoints[0].value);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Solana Wallet Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <WalletMultiButton className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold transition-all hover:from-pink-600 hover:to-purple-600" />
          <Select onValueChange={(value: string) => setSelectedEndpoint(value)} defaultValue={endpoints[0].value}>
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
        </div>
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