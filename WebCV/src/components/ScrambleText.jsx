import React, { useState, useEffect, useRef } from 'react';

const ScrambleText = ({ text }) => {
  const [scrambledText, setScrambledText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const duration = 1000; 

  const scrambleChars = "!@#$%^&*()_+{}:\"<>?[];',./`~";

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  }

  const scramble = (originalText, progress) => {
    return originalText
      .split('')
      .map((char, index) => {
        if (index < progress) {
          return char; 
        }
        return getRandomChar(); 
      })
      .join('');
  };

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp; 
    }

    const elapsedTime = timestamp - startTimeRef.current; 
    const progress = Math.min(elapsedTime / duration, 1); 

    const currentProgress = Math.floor(progress * text.length);
    setScrambledText(scramble(text, currentProgress));

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false); 
      startTimeRef.current = null; 
    }
  };

  useEffect(() => {
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate); 
    } else {
      setScrambledText(text);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current); 
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, text]);

  return (
    <div
      onMouseEnter={() => {
        if (!isAnimating) {
          setIsAnimating(true); 
        }
      }}
      className="select-none text-[6vw] mt-[4%] font-stretchpro cursor-pointer"
    >
      {scrambledText.split('').map((char, index) => {
        const isSymbol = !text.includes(char); 
        return (
          <span
            key={index}
            className={isSymbol ? 'text-[#272727]' : 'text-[#D9D9D9]'}
            style={{
              transition: 'opacity 0.2s ease', 
              opacity: isSymbol ? 0.5 : 1, 
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default ScrambleText;