"use client";

import React, { useState, useEffect } from "react";

interface GlitchedTextProps {
  text: string;
  duration?: number;
  glitchChars?: string;
  className?: string;
}

export default function GlitchedText({
  text,
  duration = 2000,
  glitchChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()[]{}<>?/|+=_-~§¶▓▒░█\\",
  className = "",
}: GlitchedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isGlitching) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;

        if (newProgress > 100) {
          setIsGlitching(false);
          setDisplayText(text);
          return 100;
        }

        // Calculate how much of the text to reveal
        const revealLength = Math.floor((newProgress / 100) * text.length);
        let newText = text.substring(0, revealLength);

        // Add glitched characters for unrevealed portion
        for (let i = revealLength; i < text.length; i++) {
          newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }

        setDisplayText(newText);
        return newProgress;
      });
    }, duration / 210);

    return () => clearInterval(interval);
  }, [isGlitching, text, duration, glitchChars]);

  return (
    <span
      className={`${className} tracking-widest transition-opacity duration-300 ${isGlitching ? "opacity-100" : "opacity-100"}`}
      style={{
        fontFamily: "monospace",
      }}
    >
      {displayText}
    </span>
  );
}
