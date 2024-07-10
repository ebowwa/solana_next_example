// site/src/components/Wallet/Balance/index.tsx
import React, { useState, useEffect } from 'react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getConnection } from '@/components/Wallet/Balance/connection-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface WalletBalanceProps {
    publicKey: PublicKey | null;
    endpoint: string;
  }
  
export function WalletBalance({ publicKey, endpoint }: WalletBalanceProps) {
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