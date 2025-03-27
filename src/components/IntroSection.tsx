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
  hueRotation: number;
  introRef: React.RefObject<HTMLDivElement>;
}

const IntroSection: React.FC<IntroSectionProps> = ({ intro, hueRotation, introRef }) => {
  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <div ref={introRef} className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6 relative">
        <h1
          className="absolute top-8 text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl font-extrabold tracking-wider uppercase bg-clip-text bg-violet-300 z-30 md:hidden"
          style={gradientStyle}
        >
          {intro.name}
        </h1>
        <MotionDiv
          className="text-center max-w-2xl mt-16 md:mt-0"
          initial={{ opacity: 0, scale: 0.2, y: -150 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", type: "spring", stiffness: 70 }}
        >
          <MotionDiv
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl font-bold text-teal-300 mt-4"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            style={gradientStyle}
          >
            {intro.title}
          </MotionDiv>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-lg italic mt-3 max-w-2xl mx-auto text-violet-400">{intro.objective}</p>
          <ul className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base mt-3 max-w-3xl mx-auto text-indigo-300 list-disc list-inside">
            {intro.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </MotionDiv>
        <MotionDiv
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 2xl:w-48 2xl:h-48 rounded-full border-[6px] border-blue-500 shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          style={{ borderColor: `hsl(${(hueRotation + 180) % 360}, 80%, 50%)` }}
        >
          <Image
            src="/images/me.jpg"
            alt="Anamol Jang Karki"
            width={584}
            height={584}
            className="object-cover rounded-full w-full h-full"
            priority
          />
        </MotionDiv>
      </div>
    </div>
  );
};

export default IntroSection;