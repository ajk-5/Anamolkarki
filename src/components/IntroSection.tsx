"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";

interface Intro {
  name: string;
  title: string;
  objective: string;
  description: string[];
}

interface IntroSectionProps {
  intro: Intro;
  introRef: React.RefObject<HTMLDivElement>;
  variant?: "default" | "carousel";
}

const IntroSection: React.FC<IntroSectionProps> = ({
  intro,
  introRef,
  variant = "default",
}) => {
  const isCarousel = variant === "carousel";

  return (
    <section ref={introRef} className="py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-6 md:grid-cols-[1.25fr_0.75fr]">
        <MotionDiv
          className="space-y-3 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className={[
              "text-[11px] uppercase tracking-[0.32em]",
              isCarousel ? "text-slate-600/80" : "text-slate-300/80",
            ].join(" ")}
          >
            Profil
          </p>
          <h1
            className={[
              "text-2xl sm:text-3xl lg:text-4xl font-semibold font-display",
              isCarousel ? "text-slate-950" : "text-slate-100",
            ].join(" ")}
          >
            {intro.name}
          </h1>
          <h2
            className={[
              "text-lg sm:text-xl lg:text-2xl font-semibold",
              isCarousel ? "text-sky-700" : "text-sky-200",
            ].join(" ")}
          >
            {intro.title}
          </h2>
          <p className={["text-xs sm:text-sm", isCarousel ? "text-slate-700" : "text-slate-200/80"].join(" ")}>
            {intro.objective}
          </p>

          <div
            className={[
              "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] sm:text-xs",
              isCarousel ? "text-slate-700" : "text-slate-200/80",
            ].join(" ")}
          >
            {intro.description.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-300 to-emerald-300 shadow-[0_0_18px_rgba(56,189,248,0.45)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </MotionDiv>
        <MotionDiv
          className={[
            "mx-auto w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border overflow-hidden",
            isCarousel
              ? "border-slate-200/70 bg-white/60 shadow-[0_18px_50px_rgba(2,6,23,0.18)]"
              : "border-white/15 bg-white/5 shadow-[0_22px_60px_rgba(2,6,23,0.55)]",
          ].join(" ")}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/images/me.jpg"
            alt="Anamol Jang Karki"
            width={584}
            height={584}
            className="object-cover w-full h-full"
            priority
          />
        </MotionDiv>
      </div>
      </div>
    </section>
  );
};

export default IntroSection;
