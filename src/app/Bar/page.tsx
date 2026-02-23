"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/MotionDiv";

import { qualifications, skills, languages, experiences } from "./resumeData";

const mapBarRoleToAutoEntrepreneur = (value: string) => {
  const lower = value.trim().toLowerCase();
  if (lower === "barman") return "Auto-entrepreneur";
  if (lower === "barman mixologue") return "Auto-entrepreneur (mixologie)";
  if (lower === "barman cocktail") return "Auto-entrepreneur (cocktails)";
  return value;
};

export default function BarPortfolio() {
  return (
    <main className="text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:px-8">
        {/* Hero */}
        <section id="intro" className="card-surface relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(140,201,240,0.16),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(239,168,176,0.12),transparent_40%)]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200/80">
                Auto-entrepreneur
                <span className="h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_16px_rgba(140,201,240,0.7)]" />
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Auto-entrepreneur
              </h1>
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
                {mapBarRoleToAutoEntrepreneur(q)}
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
                className="card-surface p-4 text-sm text-slate-100"
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
            <div className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs text-slate-200/80">
              {experiences.length} missions répertoriées
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {experiences.map((exp, index) => (
              <MotionDiv
                key={`${exp.establishment}-${index}`}
                className="card-surface p-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {mapBarRoleToAutoEntrepreneur(exp.role)} · {exp.establishment}
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
        <section className="card-surface p-6 sm:p-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Galerie dédiée</div>
            <h4 className="text-xl font-bold text-white">Techniques, outils et verrerie</h4>
            <p className="text-sm text-slate-300">Consultez la page galerie pour les micro-animations détaillées.</p>
          </div>
          <Link
            href="/Bar/gallery"
            className="btn-outline"
          >
            Ouvrir la galerie
          </Link>
        </section>
      </div>
    </main>
  );
}
