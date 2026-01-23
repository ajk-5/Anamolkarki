"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface CVSectionProps {
  cvRef: React.RefObject<HTMLDivElement>;
}

const CVSection: React.FC<CVSectionProps> = ({ cvRef }) => {
  // Assuming the PDF is located at /public/cv/cv_ANAMOL_KARKI.pdf
  const cvUrl = "../cv/cv_ANAMOL_KARKI.pdf";

  return (
    <section
      ref={cvRef}
      className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10 flex flex-col items-center justify-center"
    >
      <MotionDiv
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        MON CV
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Preview Button */}
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
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
          className="btn-outline"
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
