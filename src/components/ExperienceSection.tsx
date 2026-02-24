"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface Experience {
  title: string;
  location: string;
  period: string;
  description: string[];
}

interface ExperiencesSectionProps {
  experiences: Experience[];
  experiencesRef: React.RefObject<HTMLDivElement>;
  variant?: "default" | "carousel";
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  experiences,
  experiencesRef,
  variant = "default",
}) => {
  const isCarousel = variant === "carousel";

  return (
    <section ref={experiencesRef} className={variant === "carousel" ? "py-0 z-10" : "py-6 z-10"}>
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        {variant === "carousel" ? (
          <h2 className="sr-only">Expériences</h2>
        ) : (
          <MotionDiv
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 text-slate-100 uppercase tracking-[0.3em] font-display"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            EXPÉRIENCES
          </MotionDiv>
        )}
      <div className="grid gap-4 md:grid-cols-2">
        {experiences.map((exp, index) => (
          <MotionDiv
            key={index}
            className={[
              "group relative rounded-3xl px-4 py-3 transition",
              isCarousel ? "hover:bg-slate-950/5" : "hover:bg-white/5",
            ].join(" ")}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(244,114,182,0.14),transparent_60%)]" />

            <div className="relative pl-5">
              <span className="absolute left-[7px] top-[9px] h-2 w-2 rounded-full bg-gradient-to-r from-sky-300 to-emerald-300 shadow-[0_0_18px_rgba(56,189,248,0.35)]" />
              <span className="absolute left-[10px] top-[18px] bottom-[10px] w-px bg-gradient-to-b from-sky-300/60 via-white/10 to-transparent" />

              <h3
                className={[
                  "text-sm sm:text-base md:text-lg font-semibold uppercase tracking-tight",
                  isCarousel ? "text-slate-900" : "text-slate-100",
                ].join(" ")}
              >
                {exp.title}
              </h3>
              <p
                className={[
                  "mt-1 text-[11px] sm:text-xs",
                  isCarousel ? "text-slate-600" : "text-slate-200/75",
                ].join(" ")}
              >
                {exp.location} {exp.period}
              </p>
              <ul
                className={[
                  "mt-3 grid gap-1 text-[11px] sm:text-xs",
                  isCarousel ? "text-slate-700" : "text-slate-200/80",
                ].join(" ")}
              >
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className={[
                        "mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full",
                        isCarousel ? "bg-slate-400/60" : "bg-white/25",
                      ].join(" ")}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionDiv>
        ))}
      </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
