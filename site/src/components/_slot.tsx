// app/page.tsx
'use client'
import React from 'react';
import SlotMachine from '../components/SlotMachine';

export default function Home() {
  return <SlotMachine />;
}

// components/SlotMachine.tsx
import React, { useState } from 'react';
import Reel from './Reel';
import SpinButton from './SpinButton';
import { useSlotMachine } from '../hooks/useSlotMachine';
import styles from '../styles/SlotMachine.module.css';

const SlotMachine: React.FC = () => {
  const { reels, isSpinning, spin } = useSlotMachine();

  return (
    <div className={styles.container}>
      <div className={styles.slotMachine}>
        <div className={styles.reels}>
          {reels.map((symbol, index) => (
            <Reel key={index} symbol={symbol} />
          ))}
        </div>
        <SpinButton onClick={spin} disabled={isSpinning} />
      </div>
    </div>
  );
};

export default SlotMachine;

// components/Reel.tsx
import React from 'react';
import styles from '../styles/Reel.module.css';

interface ReelProps {
  symbol: string;
}

const Reel: React.FC<ReelProps> = ({ symbol }) => (
  <div className={styles.reel}>{symbol}</div>
);

export default Reel;

// components/SpinButton.tsx
import React from 'react';
import styles from '../styles/SpinButton.module.css';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`${styles.spinButton} ${disabled ? styles.disabled : ''}`}
  >
    {disabled ? 'Spinning...' : 'Spin'}
  </button>
);

export default SpinButton;

// hooks/useSlotMachine.ts
import { useState, useCallback } from 'react';

const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

export const useSlotMachine = () => {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const checkWin = () => {
    if (reels.every(symbol => symbol === reels[0])) {
      alert('Congratulations! You won!');
    }
  };

  const spin = useCallback(() => {
    setIsSpinning(true);
    
    let spinsCompleted = 0;
    reels.forEach((_, index) => {
      const spinInterval = setInterval(() => {
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[index] = getRandomSymbol();
          return newReels;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(spinInterval);
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[index] = getRandomSymbol();
          return newReels;
        });
        spinsCompleted++;
        if (spinsCompleted === reels.length) {
          setIsSpinning(false);
          checkWin();
        }
      }, (index + 1) * 1000);
    });
  }, [reels]);

  return { reels, isSpinning, spin };
};

// styles/SlotMachine.module.css
.container {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.slotMachine {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.reels {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

// styles/Reel.module.css
.reel {
  width: 80px;
  height: 80px;
  border: 2px solid #333;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}

// styles/SpinButton.module.css
.spinButton {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.spinButton.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}