"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface Education {
  title: string;
  institution: string;
  period: string;
  description: string[];
}

interface EducationSectionProps {
  education: Education[];
  hueRotation: number;
  educationRef: React.RefObject<HTMLDivElement>;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, hueRotation, educationRef }) => {
  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <section ref={educationRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-bold text-center mb-8 text-indigo-300 uppercase tracking-widest drop-shadow-md transform perspective-1000 translate-z-10 font-[Futura, sans-serif]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        ÉDUCATION
      </MotionDiv>
      <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mx-auto">
        {education.map((edu, index) => (
          <MotionDiv
            key={index}
            className="backdrop-blur-sm p-6 border border-violet-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: index * 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[Futura, sans-serif] font-bold text-indigo-300 mb-3 uppercase tracking-wider text-center">
              {edu.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base italic text-violet-300 text-center">
              {edu.institution} | {edu.period}
            </p>
            <ul className="mt-3 text-sm sm:text-base text-violet-300 list-disc list-inside text-center">
              {edu.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;