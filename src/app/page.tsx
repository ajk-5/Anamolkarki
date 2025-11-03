"use client";

import Link from "next/link";
import Image from "next/image";
import TealParticles from "@/components/TealParticle";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden">
      <TealParticles particleCount={50} />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-white/5 px-3 py-1 text-xs text-teal-200 backdrop-blur-md">
          <span className="inline-block h-2 w-2 rounded-full bg-teal-400 animate-float" />
          New: Fresh interactive portfolio experience
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1]">
          <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
            ANAMOL JANG KARKI
          </span>
        </h1>
        <p className="mt-4 text-slate-300/90 max-w-2xl mx-auto">
          Building delightful, fast experiences across web and mobile with Next.js, ASP.NET and React Native — plus playful tools and games.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/developer">
            <MagneticButton>Explore Portfolio</MagneticButton>
          </Link>
          <Link
            href="/games"
            className="rounded-xl border border-teal-300/40 px-6 py-3 text-teal-200 hover:bg-teal-500/10 transition"
          >
            Play Games
          </Link>
          <Link
            href="/tools"
            className="rounded-xl border border-slate-600 px-6 py-3 text-slate-200 hover:bg-white/5 transition"
          >
            Use Tools
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 px-6 max-w-6xl w-full">
        <TiltCard className="p-5">
          <div className="flex items-center gap-4">
            <Image src="/images/tetris.png" alt="Games preview" width={80} height={60} className="rounded-md object-cover" />
            <div>
              <h3 className="text-white font-semibold">Arcade</h3>
              <p className="text-sm text-slate-300">2048 • Tetris • Metrotrade</p>
            </div>
          </div>
        </TiltCard>
        <TiltCard className="p-5">
          <div>
            <h3 className="text-white font-semibold">Tools</h3>
            <p className="text-sm text-slate-300">World Clock • QR • Typing</p>
          </div>
        </TiltCard>
        <TiltCard className="p-5">
          <div>
            <h3 className="text-white font-semibold">Projects</h3>
            <p className="text-sm text-slate-300">Next.js • ASP.NET • Mobile</p>
          </div>
        </TiltCard>
      </section>

      <footer className="relative z-10 mt-12 mb-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Anamol Jang Karki
      </footer>
    </main>
  );
}

