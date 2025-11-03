"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

type Props = PropsWithChildren<{ 
  className?: string;
  variant?: Variant;
  size?: Size;
}> & HTMLMotionProps<"button">;

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  ...rest
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
      } catch {
        setIsCoarse(false);
      }
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.2 });

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (isCoarse || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }
  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId + 1;
    setRippleId(id);
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    setRipples((r) => [...r, { x: xPos, y: yPos, id }]);
    // cleanup after animation
    setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id));
    }, 600);
  }

  const sizeClasses = useMemo(() => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-7 py-3 text-lg";
      case "md":
      default:
        return "px-5 py-3 text-base";
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    switch (variant) {
      case "outline":
        return "bg-transparent border border-teal-300/60 text-teal-200 hover:bg-teal-500/10";
      case "primary":
      default:
        return "bg-teal-400 text-slate-900 hover:bg-teal-300";
    }
  }, [variant]);

  const baseClasses = [
    "relative isolate rounded-xl font-semibold",
    sizeClasses,
    variantClasses,
    "transition-colors duration-200 select-none",
    // tone down heavy shadows on mobile
    "shadow-xl md:shadow-2xl",
    // mobile ergonomics
    isCoarse ? "w-full md:w-auto min-h-[44px]" : "",
    disabled ? "opacity-60 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const glowInset = isCoarse ? "-inset-2" : "-inset-6";
  const glowBlur = isCoarse ? "blur-lg" : "blur-2xl";

  return (
    <motion.button
      {...rest}
      disabled={disabled}
      type={(rest as any).type ?? "button"}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      whileTap={{ scale: isCoarse || prefersReducedMotion ? 0.98 : 0.99 }}
      style={{ x: springX, y: springY, WebkitTapHighlightColor: "transparent" as any }}
      className={baseClasses}
    >
      <span className="relative z-10">{children}</span>
      {/* Reduce oversized glow on small screens */}
      <span className={`pointer-events-none absolute ${glowInset} -z-10 rounded-2xl bg-gradient-to-r from-teal-500/20 via-cyan-500/15 to-fuchsia-500/20 ${glowBlur} md:blur-2xl`} />
      {/* Ripple container */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="ripple"
            style={{ left: rp.x, top: rp.y }}
          />
        ))}
      </span>
      <style jsx>{`
        .ripple {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.45);
          animation: ripple 600ms ease-out forwards;
          pointer-events: none;
          will-change: transform, opacity;
        }
        @keyframes ripple {
          0% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(10);
          }
        }
      `}</style>
    </motion.button>
  );
}
