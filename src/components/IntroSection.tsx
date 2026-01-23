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
}

const IntroSection: React.FC<IntroSectionProps> = ({ intro, introRef }) => {
  return (
    <section ref={introRef} className="py-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <MotionDiv
          className="space-y-4 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Profil
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-display text-slate-100">
            {intro.name}
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-sky-200">
            {intro.title}
          </h2>
          <p className="text-sm sm:text-base italic text-slate-300">
            {intro.objective}
          </p>
          <ul className="space-y-1 text-xs sm:text-sm lg:text-base text-slate-300 list-disc list-inside">
            {intro.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </MotionDiv>
        <MotionDiv
          className="mx-auto w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full border border-slate-700/70 bg-slate-950/60 shadow-2xl overflow-hidden"
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
    </section>
  );
};

export default IntroSection;
