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
          background: "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.45), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-med"
        style={{
          bottom: "-15%",
          left: "10%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle at 70% 40%, rgba(34,211,238,0.35), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-fast"
        style={{
          top: "10%",
          right: "-10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle at 40% 60%, rgba(245,158,11,0.28), transparent 60%)",
        }}
      />
      <div
        className="blob animate-aurora-med"
        style={{
          bottom: "-10%",
          right: "5%",
          width: 420,
          height: 420,
          background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.32), transparent 60%)",
        }}
      />
    </div>
  );
}
