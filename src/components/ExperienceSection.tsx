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
  hueRotation: number;
  experiencesRef: React.RefObject<HTMLDivElement>;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences, hueRotation, experiencesRef }) => {
  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <section ref={experiencesRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        EXPÉRIENCES
      </MotionDiv>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <MotionDiv
            key={index}
            className=" backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: index * 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -8 }}
            style={{ borderColor: `hsl(${(hueRotation + index * 60) % 360}, 80%, 50%)` }}
          >
            <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl 2xl:text-4xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
              {exp.title}
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base italic text-slate-600">{exp.location} {exp.period}</p>
            <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700 list-disc list-inside">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default ExperiencesSection;