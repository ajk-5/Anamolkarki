import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: Props) {
  return (
    <div className={["relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", className].join(" ")}> 
      <div className="rounded-2xl border border-teal-500/20 bg-white/5 backdrop-blur-md shadow-xl p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

