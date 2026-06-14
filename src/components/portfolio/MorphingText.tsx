'use client';

import { useEffect, useState, useCallback } from 'react';

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function MorphingText({ words, interval = 2500, className = '' }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const cycle = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setIsExiting(false);
    }, 400);
  }, [words.length]);

  useEffect(() => {
    const timer = setInterval(cycle, interval);
    return () => clearInterval(timer);
  }, [cycle, interval]);

  return (
    <span className={`morphing-text-container ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`morphing-word ${
            i === currentIndex && !isExiting
              ? 'active'
              : i === currentIndex && isExiting
              ? 'exit'
              : ''
          }`}
          style={{ position: i === 0 ? 'relative' : 'absolute', left: 0, top: 0 }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
