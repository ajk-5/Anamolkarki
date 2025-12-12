"use client";

import Link from "next/link";
import TealParticles from "@/components/TealParticle";
import { MotionDiv } from "@/components/MotionDiv";

import { stats, qualifications, skills, languages, experiences } from "./resumeData";

export default function BarPortfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(249,115,22,0.07),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20 bg-[linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="pointer-events-none fixed inset-0 -z-30 mix-blend-soft-light">
        <TealParticles particleCount={120} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-14 lg:px-8">
        {/* Hero */}
        <section id="intro" className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-950 p-6 shadow-2xl ring-1 ring-slate-800/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.1),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_35%)]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-teal-200">
                Barman Portfolio
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Service, mixologie, et expérience client
              </h1>
              <p className="max-w-2xl text-slate-300">
                Barman et mixologue mobile à Paris et Île-de-France. Spécialisé en cocktails classiques et créations, habitué aux rushs, aux événements et aux shifts tardifs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/Bar/gallery"
                  className="rounded-xl border border-fuchsia-400/50 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-fuchsia-300/70"
                >
                  Voir la galerie
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-teal-500/40 bg-white/5 px-4 py-2 text-sm font-semibold text-teal-100 transition hover:-translate-y-0.5"
                >
                  Réserver / Me contacter
                </Link>
                <Link
                  href="/cv/cv_bar_ANAMOL_KARKI.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-700 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400/60"
                >
                  Télécharger le CV barman (PDF)
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-sm grid-cols-2 gap-3 lg:max-w-md">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-800/60 bg-white/5 px-4 py-3 text-sm shadow-lg backdrop-blur">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{s.label}</div>
                  <div className="mt-1 text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[12px] text-slate-400">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section id="qualifications" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profil</p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Qualifications</h2>
              <p className="text-sm text-slate-300">Polyvalence : bar, salle, cocktails, café, service plateau.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {qualifications.map((q) => (
              <MotionDiv
                key={q}
                className="rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {q}
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Compétences</p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Techniques & service</h2>
              <p className="text-sm text-slate-300">Cocktails, gestion de flux, service client, hygiène et sécurité.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <MotionDiv
                key={s}
                className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-sm text-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {s}
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Langues</p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Communication</h2>
              <p className="text-sm text-slate-300">À l’aise avec des équipes et des clients internationaux.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <span key={l} className="rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* Experiences */}
        <section id="experiences" className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Expériences</p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Établissements servis</h2>
              <p className="text-sm text-slate-300">Événementiel, brasseries, restaurants gastronomiques, bars et clubs.</p>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
              {experiences.length} missions répertoriées
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {experiences.map((exp, index) => (
              <MotionDiv
                key={`${exp.establishment}-${index}`}
                className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {exp.role} · {exp.establishment}
                </h3>
                <p className="text-sm text-slate-300">{exp.type}</p>
                <p className="text-sm text-slate-400">{exp.location}</p>
                <p className="text-sm text-slate-400">
                  {exp.period}
                  {exp.contract ? ` (${exp.contract})` : ""}
                </p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Gallery CTA */}
        <section className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-xl backdrop-blur flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Galerie dédiée</div>
            <h4 className="text-xl font-bold text-white">Techniques, outils et verrerie</h4>
            <p className="text-sm text-slate-300">Consultez la page galerie pour les micro-animations détaillées.</p>
          </div>
          <Link
            href="/Bar/gallery"
            className="rounded-full border border-fuchsia-400/50 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:-translate-y-0.5"
          >
            Ouvrir la galerie
          </Link>
        </section>
      </div>
    </div>
  );
}
