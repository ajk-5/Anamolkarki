"use client";

import { MotionDiv } from "@/components/MotionDiv";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  description: string;
}

interface Skills {
  soft: Skill[];
}

interface SkillsSectionProps {
  skills: Skills;
  skillsRef: React.RefObject<HTMLDivElement>;
  variant?: "default" | "carousel";
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  skillsRef,
  variant = "default",
}) => {
  const [selectedSkill, setSelectedSkill] = useState<number>(0);
  const activeSkill = skills.soft[selectedSkill] ?? skills.soft[0];
  const isCarousel = variant === "carousel";

  return (
    <section ref={skillsRef} className={variant === "carousel" ? "py-0 z-10" : "py-6 z-10"}>
      <div className="mx-auto max-w-6xl px-4">
        {variant === "carousel" ? (
          <h2 className="sr-only">Compétences</h2>
        ) : (
          <MotionDiv
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 text-slate-100 uppercase tracking-[0.3em] font-display"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            COMPÉTENCES
          </MotionDiv>
        )}

        <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div
            className={[
              "rounded-3xl border p-3 backdrop-blur",
              isCarousel
                ? "border-slate-200/70 bg-white/70 shadow-[0_18px_50px_rgba(2,6,23,0.12)]"
                : "border-white/15 bg-white/5",
            ].join(" ")}
          >
            <p
              className={[
                "text-[11px] uppercase tracking-[0.22em]",
                isCarousel ? "text-slate-600/80" : "text-slate-200/70",
              ].join(" ")}
            >
              Soft skills
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => {
                const active = index === selectedSkill;
                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelectedSkill(index)}
                    aria-pressed={active}
                    className={
                      isCarousel
                        ? [
                            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40",
                            active
                              ? "border-slate-300 bg-white text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                              : "border-slate-200/80 bg-white/70 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:bg-white hover:border-slate-300 hover:text-slate-900",
                            "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-current",
                          ].join(" ")
                        : [
                            "btn-chip flex items-center gap-2",
                            active ? "btn-chip-active" : "",
                            "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-current",
                          ].join(" ")
                    }
                  >
                    <span
                      className={isCarousel ? "text-sky-700" : "text-sky-200"}
                      dangerouslySetInnerHTML={{ __html: skill.icon }}
                      aria-hidden
                    />
                    <span className="truncate">{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={[
              "relative overflow-hidden rounded-3xl border p-4 backdrop-blur",
              isCarousel
                ? "border-slate-200/70 bg-white/80 shadow-[0_18px_50px_rgba(2,6,23,0.12)]"
                : "border-white/15 bg-white/5",
            ].join(" ")}
          >
            <div
              className={[
                "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(244,114,182,0.14),transparent_60%)]",
                isCarousel ? "opacity-40" : "opacity-60",
              ].join(" ")}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill?.name}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-2xl border [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-current",
                      isCarousel
                        ? "border-slate-200/70 bg-white text-sky-700"
                        : "border-white/15 bg-white/10 text-sky-200",
                    ].join(" ")}
                    dangerouslySetInnerHTML={{ __html: activeSkill?.icon ?? "" }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3
                      className={[
                        "truncate text-base sm:text-lg font-semibold",
                        isCarousel ? "text-slate-900" : "text-slate-100",
                      ].join(" ")}
                    >
                      {activeSkill?.name}
                    </h3>
                    <p className={["text-[11px] sm:text-xs", isCarousel ? "text-slate-600" : "text-slate-200/70"].join(" ")}>
                      Communication · collaboration · adaptabilité
                    </p>
                  </div>
                </div>

                <p
                  className={[
                    "mt-3 text-sm leading-relaxed",
                    isCarousel ? "text-slate-700" : "text-slate-200/85",
                  ].join(" ")}
                >
                  {activeSkill?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
