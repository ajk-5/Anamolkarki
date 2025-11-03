"use client";

import React from "react";

export default function AuroraBackground() {
  return (
    <div aria-hidden className="aurora">
      <div
        className="blob animate-aurora-slow"
        style={{
          top: "-10%",
          left: "-5%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle at 30% 30%, rgba(20,184,166,.55), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-med"
        style={{
          bottom: "-15%",
          left: "10%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle at 70% 40%, rgba(59,130,246,.45), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-fast"
        style={{
          top: "10%",
          right: "-10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle at 40% 60%, rgba(236,72,153,.40), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-med"
        style={{
          bottom: "-10%",
          right: "5%",
          width: 420,
          height: 420,
          background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,.40), transparent 60%)",
        }}
      />
    </div>
  );
}

