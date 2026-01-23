"use client";

import { motion } from "framer-motion";
import { useId, useMemo } from "react";

interface ParticlePosition {
  x: string;
  y: string;
  x2: string;
  y2: string;
  duration: number;
  delay: number;
}

interface TealParticlesProps {
  particleCount?: number;
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function TealParticles({ particleCount = 50 }: TealParticlesProps) {
  const id = useId();
  const MotionDiv = motion.div;

  const particlePositions = useMemo<ParticlePosition[]>(() => {
    const rng = createRng(hashSeed(id));
    const toVW = () => `${(rng() * 100).toFixed(2)}vw`;
    const toVH = () => `${(rng() * 100).toFixed(2)}vh`;
    return Array.from({ length: particleCount }, () => ({
      x: toVW(),
      y: toVH(),
      x2: toVW(),
      y2: toVH(),
      duration: 3 + rng() * 5,
      delay: rng() * 2,
    }));
  }, [id, particleCount]);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-0">
      {particlePositions.map((pos, i) => (
        <MotionDiv
          key={i}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.35)]"
          initial={{ x: pos.x, y: pos.y, scale: 0 }}
          animate={{
            x: [pos.x, pos.x2],
            y: [pos.y, pos.y2],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            transition: {
              duration: pos.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay
            },
          }}
        />
      ))}
    </div>
  );
}
