"use client";

import Link from "next/link";
import Image from "next/image";
import TealParticles from "@/components/TealParticle";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <TealParticles particleCount={60} />

      <section className="relative z-10 mx-auto max-w-5xl px-6 text-center">
      

        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
            ANAMOL JANG KARKI
          </span>
        </h1>

        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          I craft performant web and mobile experiences with Next.js, ASP.NET, and React Native — and I love building playful tools and games along the way.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/developer"
            className="px-5 py-2 rounded-lg bg-teal-500 text-slate-900 font-semibold shadow-md hover:bg-teal-400 transition"
          >
            Portfolio
          </Link>
          <Link
            href="/games"
            className="px-5 py-2 rounded-lg border border-teal-300/50 text-teal-200 hover:bg-teal-500/10 transition"
          >
            Play Games
          </Link>
          <Link
            href="/tools"
            className="px-5 py-2 rounded-lg border border-teal-300/50 text-teal-200 hover:bg-teal-500/10 transition"
          >
            Use Tools
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-white/5 transition"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 px-6 max-w-5xl w-full">
        <Link href="/games" className="group rounded-xl border border-teal-500/20 bg-white/5 backdrop-blur-sm p-5 hover:border-teal-400/50 transition">
          <div className="flex items-center gap-3">
            <Image src="/images/tetris.png" alt="Games preview" width={80} height={60} className="rounded-md object-cover" />
            <div>
              <h3 className="text-white font-semibold">Arcade</h3>
              <p className="text-sm text-slate-300">2048 • Tetris • Metrotrade</p>
            </div>
          </div>
        </Link>
        <Link href="/tools" className="group rounded-xl border border-teal-500/20 bg-white/5 backdrop-blur-sm p-5 hover:border-teal-400/50 transition">
          <div>
            <h3 className="text-white font-semibold">Tools</h3>
            <p className="text-sm text-slate-300">World Clock • QR • Typing</p>
          </div>
        </Link>
        <Link href="/projects" className="group rounded-xl border border-teal-500/20 bg-white/5 backdrop-blur-sm p-5 hover:border-teal-400/50 transition">
          <div>
            <h3 className="text-white font-semibold">Projects</h3>
            <p className="text-sm text-slate-300">Next.js • ASP.NET • Mobile</p>
          </div>
        </Link>
      </section>

      <footer className="relative z-10 mt-12 mb-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Anamol Jang Karki
      </footer>
    </main>
  );
}
