"use client";

import React, { PropsWithChildren, useRef, useState } from "react";

type Props = PropsWithChildren<{
  className?: string;
  glow?: boolean;
}>;

export default function TiltCard({ children, className = "", glow = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>("perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)");

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * -10; // tilt up/down
    const ry = (px - 0.5) * 10;  // tilt left/right
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`);
  }
  function handleLeave() {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform }}
      className={[
        "relative will-change-transform transition-transform duration-150",
        "rounded-2xl border border-teal-500/20 bg-white/5 backdrop-blur-md shadow-xl",
        glow ? "hover:shadow-teal-500/20 hover:shadow-[0_20px_60px]" : "",
        className,
      ].join(" ")}
    >
      {/* glow ring */}
      {glow && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      )}
      {children}
    </div>
  );
}

