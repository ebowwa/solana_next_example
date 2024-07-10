import { Connection } from '@solana/web3.js';

export const getConnection = (endpoint: string) => {
  return new Connection(endpoint);
};