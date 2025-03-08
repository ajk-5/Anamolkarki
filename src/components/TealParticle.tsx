"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ParticlePosition {
  x: string;
  y: string;
}

interface TealParticlesProps {
  particleCount?: number;
}

export default function TealParticles({ particleCount = 50 }: TealParticlesProps) {
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);
  const MotionDiv = motion.div;

  useEffect(() => {
    const positions = Array.from({ length: particleCount }, () => ({
      x: `${Math.random() * 1000}vw`,
      y: `${Math.random() * 1000}vh`,
    }));
    setParticlePositions(positions);
  }, [particleCount]);

  return (
    <div className="absolute inset-0 pointer-events-none max-w-[100vw] h-full z-0">
      {particlePositions.map((pos, i) => (
        <MotionDiv
          key={i}
          className="absolute w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_4px_rgba(45,212,191,0.3)]"
          initial={{ x: pos.x, y: pos.y, scale: 0 }}
          animate={{
            x: [null, `${Math.random() * 1000}vw`],
            y: [null, `${Math.random() * 1000}vh`],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            transition: { 
              duration: Math.random() * 5 + 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            },
          }}
        />
      ))}
    </div>
  );
}