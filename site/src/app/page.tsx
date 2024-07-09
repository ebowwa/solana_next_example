// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

export default function Home() {
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection('https://api.mainnet-beta.solana.com')
      connection.getBalance(publicKey).then((bal: number) => {
        setBalance(bal / LAMPORTS_PER_SOL)
      }).catch((error: Error) => {
        console.error('Error fetching balance:', error)
        setBalance(null)
      })
    } else {
      setBalance(null)
    }
  }, [publicKey])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Solana Wallet Example</h1>
      <WalletMultiButton className="mb-4" />
      {publicKey && (
        <div className="mt-4">
          <p>Public Key: {publicKey.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
        </div>
      )}
    </main>
  )
}