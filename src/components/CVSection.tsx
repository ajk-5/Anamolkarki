"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface CVSectionProps {
  hueRotation: number;
  cvRef: React.RefObject<HTMLDivElement>;
}

const CVSection: React.FC<CVSectionProps> = ({ hueRotation, cvRef }) => {
  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  // Assuming the PDF is located at /public/cv/cv_ANAMOL_KARKI.pdf
  const cvUrl = "../cv/cv_ANAMOL_KARKI.pdf";

  return (
    <section
      ref={cvRef}
      className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10 flex flex-col items-center justify-center min-h-1vh"
    >
      <MotionDiv
        className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        style={gradientStyle}
      >
        MON CV
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Preview Button */}
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-teal-600/80 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700/90 transition-all duration-300"
          style={gradientStyle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Aperçu du CV
        </a>

        {/* Download Button */}
        <a
          href={cvUrl}
          download="Anamol_Jang_Karki_CV.pdf"
          className="inline-flex items-center px-6 py-3 bg-teal-600/80 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700/90 transition-all duration-300"
          style={gradientStyle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger mon CV
        </a>
      </MotionDiv>
    </section>
  );
};

export default CVSection;