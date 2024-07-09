import React from 'react';
import GlitchText from '@/components/GlitchText';

export const Header = () => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
    <GlitchText text="Solana Wallet Dashboard" className="header-glitch" />
  </h1>
);