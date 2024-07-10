import React from 'react';
import GlitchText from '@/components/ui/GlitchText';

export const Header = () => (
  <div className="py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 text-center overflow-x-hidden">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 break-words">
      <GlitchText text="Solana Wallet" className="header-glitch" />
    </h1>
  </div>
);