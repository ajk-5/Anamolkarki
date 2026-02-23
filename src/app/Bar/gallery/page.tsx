"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";
import { Category, methods, materials, glasses, getVisualClass, categoryMeta } from "../barData";

export default function BarGallery() {
  const [activeTab, setActiveTab] = useState<Category>("methods");
  const items = useMemo(() => (activeTab === "methods" ? methods : activeTab === "materials" ? materials : glasses), [activeTab]);
  const activeMeta = categoryMeta[activeTab];

  return (
    <main className="text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:px-8">
        <section className="card-surface relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(140,201,240,0.16),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(239,168,176,0.12),transparent_40%)]" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200/80">
                Galerie auto-entrepreneur
                <span className="h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_16px_rgba(140,201,240,0.7)]" />
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">Gestes, outils et verrerie</h1>
              <p className="max-w-2xl text-slate-200/80">Micro-animations pour visualiser les techniques, le matériel et les verres. Passez la souris pour voir le cue.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/Bar" className="btn-outline">
                  Retour au portfolio auto-entrepreneur
                </Link>
                <Link href="/contact" className="btn-primary">
                  Réserver / Me contacter
                </Link>
                <Link
                  href="/cv/cv_bar_ANAMOL_KARKI.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Télécharger le CV auto-entrepreneur
                </Link>
              </div>
            </div>
            <div className="flex gap-2 rounded-full border border-white/20 bg-white/5 p-1 text-xs shadow-lg">
              {(["methods", "materials", "glasses"] as Category[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3 py-1.5 uppercase tracking-[0.18em] transition ${
                    activeTab === tab
                      ? "border border-sky-200/35 bg-white/10 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {categoryMeta[tab].title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="card-surface p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Section active</div>
              <div className="text-lg font-semibold" style={{ color: activeMeta.accent }}>
                {activeMeta.title}
              </div>
              <p className="text-sm text-slate-400">{activeMeta.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_16px_rgba(140,201,240,0.6)]" />
                {items.length} entrées
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const visualClass = getVisualClass(item.id);
              return (
                <MotionDiv
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_15px_60px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-cyan-400/40"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-900/70 to-slate-950">
                    <div className={`visual-canvas ${visualClass}`}>
                      {visualClass.startsWith("visual--shake") && (
                        <>
                          <div className={"shaker " + (visualClass === "visual--shake-dry" ? "shaker--dry" : visualClass === "visual--shake-reverse" ? "shaker--reverse" : "")} />
                          <div className="ice-cubes">
                            <div className="ice-cube" />
                            <div className="ice-cube" />
                          </div>
                          {visualClass === "visual--shake-reverse" && <div className="foam" />}
                        </>
                      )}

                      {visualClass === "visual--stir" && (
                        <>
                          <div className="glass-body">
                            <div className="liquid" />
                          </div>
                          <div className="spoon" />
                        </>
                      )}

                      {visualClass === "visual--swizzle" && (
                        <>
                          <div className="glass-body">
                            <div className="liquid" />
                          </div>
                          <div className="swizzle-stick" />
                        </>
                      )}

                      {visualClass === "visual--throw" && (
                        <>
                          <div className="throw-top" />
                          <div className="throw-bottom" />
                          <div className="throw-stream" />
                        </>
                      )}

                      {visualClass === "visual--strain" && (
                        <>
                          <div className="strain-spring" />
                          <div className="strain-head" />
                          <div className="strain-streams">
                            <div className="strain-line" />
                            <div className="strain-line" />
                            <div className="strain-line" />
                          </div>
                        </>
                      )}

                      {visualClass === "visual--layer" && (
                        <>
                          <div className="layer-band" />
                          <div className="layer-band" />
                          <div className="layer-band" />
                        </>
                      )}

                      {visualClass === "visual--blend" && <div className="blend-vortex" />}

                      {visualClass === "visual--build" && (
                        <div className="glass-body">
                          <div className="liquid" />
                        </div>
                      )}

                      {visualClass === "visual--muddle" && (
                        <>
                          <div className="fruit-bed" />
                          <div className="muddler" />
                        </>
                      )}

                      {visualClass === "visual--rim" && (
                        <>
                          <div className="rim-ring" />
                          <div className="rim-highlight" />
                        </>
                      )}

                      {visualClass === "visual--generic" && <div className="visual--generic" />}
                    </div>

                    <div className="card-visual-overlay">
                      <div className="overlay-chip">Motion cue</div>
                      <p>{item.visualCue}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className="rounded-full border border-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                        {activeMeta.title}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{item.description}</p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </section>
      </div>

      <style jsx>{`
        .visual-canvas {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 28px;
          background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1), rgba(15, 23, 42, 0.9) 70%);
          border: 1px solid rgba(148, 163, 184, 0.35);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .card-visual-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          background: radial-gradient(circle at 50% 40%, rgba(8, 47, 73, 0.65), rgba(8, 47, 73, 0.9));
          color: #e5e7eb;
          font-size: 0.88rem;
          text-align: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .card-visual-overlay .overlay-chip {
          display: inline-flex;
          align-self: center;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.08);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .group:hover .card-visual-overlay { opacity: 1; }

        .shaker { position: absolute; width: 42px; height: 88px; border-radius: 14px; left: 50%; top: 22px; transform: translateX(-50%); background: linear-gradient(135deg, #e5e7eb, #94a3b8); box-shadow: 0 6px 12px rgba(15, 23, 42, 0.7); }
        .shaker--dry { background: linear-gradient(135deg, #facc15, #f97316); }
        .shaker--reverse { background: linear-gradient(135deg, #c4b5fd, #6366f1); }

        .ice-cubes { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
        .ice-cube { width: 14px; height: 14px; border-radius: 3px; background: rgba(191, 219, 254, 0.9); box-shadow: 0 0 10px rgba(59, 130, 246, 0.9); }

        .glass-body { position: absolute; width: 72px; height: 100px; border-radius: 16px 16px 12px 12px; border: 2px solid rgba(148, 163, 184, 0.9); left: 50%; bottom: 18px; transform: translateX(-50%); overflow: hidden; background: radial-gradient(circle at top, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.9)); }
        .liquid { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(to top, #0ea5e9, #22c55e); }

        .spoon { position: absolute; width: 8px; height: 94px; border-radius: 999px; background: linear-gradient(to bottom, #f3f4f6, #9ca3af); left: 50%; top: 12px; transform-origin: 50% 10px; }
        .swizzle-stick { position: absolute; width: 5px; height: 100px; border-radius: 999px; background: linear-gradient(to bottom, #f97316, #ea580c); left: 50%; top: 10px; transform-origin: 50% 10px; }

        .muddler { position: absolute; width: 14px; height: 72px; border-radius: 999px; background: linear-gradient(180deg, #f9fafb, #9ca3af); left: 50%; top: 26px; transform: translateX(-50%); }
        .fruit-bed { position: absolute; width: 46px; height: 14px; border-radius: 999px; background: radial-gradient(circle at top, #22c55e, #15803d); left: 50%; bottom: 22px; transform: translateX(-50%); }

        .rim-ring { position: absolute; width: 84px; height: 84px; border-radius: 999px; border: 3px solid rgba(248, 250, 252, 0.4); left: 50%; top: 30px; transform: translateX(-50%); box-shadow: 0 0 14px rgba(248, 250, 252, 0.8); }
        .rim-highlight { position: absolute; width: 16px; height: 16px; border-radius: 999px; background: radial-gradient(circle at center, #facc15, rgba(250, 204, 21, 0)); top: -6px; left: 50%; transform-origin: 50% 48px; }

        .throw-top, .throw-bottom { position: absolute; width: 42px; height: 70px; border-radius: 12px; background: linear-gradient(145deg, #e5e7eb, #9ca3af); }
        .throw-top { top: 16px; left: 24px; transform-origin: center bottom; }
        .throw-bottom { bottom: 20px; right: 24px; transform-origin: center top; }
        .throw-stream { position: absolute; width: 7px; height: 0; border-radius: 999px; background: linear-gradient(to bottom, #22d3ee, #4ade80); left: 50%; top: 42px; transform: translateX(-50%) rotate(-18deg); transform-origin: top center; }

        .strain-head { position: absolute; width: 64px; height: 30px; border-radius: 999px; border: 2px solid rgba(148, 163, 184, 0.9); top: 24px; left: 50%; transform: translateX(-50%); }
        .strain-spring { position: absolute; width: 78px; height: 30px; border-radius: 999px; border: 3px dotted rgba(148, 163, 184, 0.8); top: 16px; left: 50%; transform: translateX(-50%); }
        .strain-streams { position: absolute; top: 54px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
        .strain-line { width: 5px; height: 0; border-radius: 999px; background: linear-gradient(to bottom, #38bdf8, #22c55e); }

        .layer-band { position: absolute; left: 50%; transform: translateX(-50%); width: 56px; height: 12px; border-radius: 999px; }
        .blend-vortex { position: absolute; width: 64px; height: 86px; border-radius: 22px; left: 50%; top: 28px; transform: translateX(-50%); background: conic-gradient(from 0deg, #22d3ee, #22c55e, #f97316, #22d3ee); opacity: 0.9; }

        .visual--shake-standard .shaker { animation: shake-horiz 0.55s ease-in-out infinite alternate; }
        @keyframes shake-horiz { 0% { transform: translate(-50%, 0) rotate(-10deg); } 100% { transform: translate(-50%, 0) rotate(10deg); } }

        .visual--shake-dry .shaker { animation: shake-dry-sequence 1.2s ease-in-out infinite; }
        @keyframes shake-dry-sequence {
          0% { transform: translate(-50%, 0) rotate(-10deg); background: linear-gradient(135deg, #facc15, #f97316); }
          30% { transform: translate(-50%, 0) rotate(10deg); }
          40% { transform: translate(-50%, 0) rotate(0deg); background: linear-gradient(135deg, #f97316, #f97316); }
          60% { transform: translate(-50%, 0) rotate(-10deg); background: linear-gradient(135deg, #e5e7eb, #9ca3af); }
          100% { transform: translate(-50%, 0) rotate(10deg); }
        }

        .visual--shake-reverse .shaker { animation: shake-reverse-sequence 1.2s ease-in-out infinite; }
        .visual--shake-reverse .foam { position: absolute; width: 58px; height: 12px; border-radius: 999px; background: rgba(248, 250, 252, 0.9); left: 50%; bottom: 34px; transform: translateX(-50%); box-shadow: 0 0 14px rgba(248, 250, 252, 0.9); animation: foam-grow 1.2s ease-in-out infinite; }
        @keyframes shake-reverse-sequence {
          0% { transform: translate(-50%, 0) rotate(-8deg); background: linear-gradient(135deg, #e5e7eb, #9ca3af); }
          40% { transform: translate(-50%, 0) rotate(8deg); }
          50% { transform: translate(-50%, 0) rotate(0deg); background: linear-gradient(135deg, #c4b5fd, #818cf8); }
          100% { transform: translate(-50%, -4px) rotate(0deg); }
        }
        @keyframes foam-grow { 0% { opacity: 0; transform: translateX(-50%) scaleX(0.3); } 45% { opacity: 0; } 70% { opacity: 1; transform: translateX(-50%) scaleX(0.9); } 100% { opacity: 1; transform: translateX(-50%) scaleX(1); }
        }

        .visual--stir .glass-body .liquid { height: 54px; animation: stir-surface 1.4s ease-in-out infinite; }
        .visual--stir .spoon { animation: spoon-orbit 1.4s ease-in-out infinite; }
        @keyframes spoon-orbit { 0% { transform: translateX(-12px) rotate(-12deg); } 50% { transform: translateX(0) rotate(0deg); } 100% { transform: translateX(12px) rotate(12deg); } }
        @keyframes stir-surface { 0% { border-radius: 40% 60% 20% 80%; } 50% { border-radius: 60% 40% 80% 20%; } 100% { border-radius: 40% 60% 20% 80%; }
        }

        .visual--swizzle .glass-body .liquid { height: 60px; }
        .visual--swizzle .swizzle-stick { animation: swizzle-spin 0.7s linear infinite; }
        @keyframes swizzle-spin { 0% { transform: translateX(-50%) rotate(-20deg); } 50% { transform: translateX(-50%) rotate(20deg); } 100% { transform: translateX(-50%) rotate(-20deg); } }

        .visual--throw .throw-top { animation: throw-top-tilt 1.2s ease-in-out infinite; }
        .visual--throw .throw-bottom { animation: throw-bottom-tilt 1.2s ease-in-out infinite; }
        .visual--throw .throw-stream { animation: throw-stream 1.2s ease-in-out infinite; }
        @keyframes throw-top-tilt { 0% { transform: rotate(0deg); } 30% { transform: rotate(-28deg); } 60% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
        @keyframes throw-bottom-tilt { 0% { transform: rotate(0deg); } 40% { transform: rotate(10deg); } 70% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
        @keyframes throw-stream { 0% { height: 0; opacity: 0; } 30% { height: 62px; opacity: 1; } 60% { height: 0; opacity: 0; } 100% { height: 0; opacity: 0; } }

        .visual--strain .strain-line { animation: strain-drip 1s ease-in-out infinite; }
        .visual--strain .strain-line:nth-child(2) { animation-delay: 0.15s; }
        .visual--strain .strain-line:nth-child(3) { animation-delay: 0.3s; }
        @keyframes strain-drip { 0% { height: 0; opacity: 0; } 30% { height: 32px; opacity: 1; } 60% { height: 0; opacity: 0; } 100% { height: 0; opacity: 0; } }

        .visual--layer .layer-band:nth-child(1) { bottom: 22px; background: #22c55e; animation: layer-in 1.3s ease-in-out infinite; }
        .visual--layer .layer-band:nth-child(2) { bottom: 38px; background: #f97316; animation: layer-in 1.3s ease-in-out infinite; animation-delay: 0.2s; }
        .visual--layer .layer-band:nth-child(3) { bottom: 54px; background: #a855f7; animation: layer-in 1.3s ease-in-out infinite; animation-delay: 0.4s; }
        @keyframes layer-in { 0% { transform: translate(-50%, 10px); opacity: 0; } 30% { transform: translate(-50%, 0); opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }

        .visual--blend .blend-vortex { animation: blend-spin 0.8s linear infinite; }
        @keyframes blend-spin { 0% { transform: translateX(-50%) rotate(0deg); } 100% { transform: translateX(-50%) rotate(360deg); } }

        .visual--build .liquid { animation: build-fill 1.4s ease-in-out infinite; }
        @keyframes build-fill { 0% { height: 10px; } 35% { height: 42px; } 70% { height: 72px; } 100% { height: 10px; } }

        .visual--muddle .muddler { animation: muddle-bounce 0.7s ease-in-out infinite; }
        @keyframes muddle-bounce { 0% { transform: translate(-50%, 0); } 40% { transform: translate(-50%, 10px); } 100% { transform: translate(-50%, 0); } }

        .visual--rim .rim-highlight { animation: rim-orbit 1.4s linear infinite; }
        @keyframes rim-orbit { 0% { transform: rotate(0deg) translateX(-50%); } 100% { transform: rotate(360deg) translateX(-50%); } }

        .visual--generic::before { content: ""; position: absolute; inset: 20px; border-radius: 16px; border: 1px dashed rgba(148, 163, 184, 0.8); box-shadow: 0 0 18px rgba(59, 130, 246, 0.5); animation: generic-pulse 1.4s ease-in-out infinite; }
        @keyframes generic-pulse { 0% { opacity: 0.8; transform: scale(0.96); } 100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
