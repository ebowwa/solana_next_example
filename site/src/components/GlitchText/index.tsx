// site/src/components/GlitchText/index.tsx
"use client"
import React from 'react';
import '@/styles/GlitchText.css';

interface GlitchTextProps {
    text: string;
    className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
    return (
        <div className={`glitch ${className}`} data-text={text}>
            {text}
        </div>
    );
};

export default GlitchText;