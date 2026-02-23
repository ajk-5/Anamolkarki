"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface CVSectionProps {
  cvRef: React.RefObject<HTMLDivElement>;
  variant?: "default" | "carousel";
}

const CVSection: React.FC<CVSectionProps> = ({ cvRef, variant = "default" }) => {
  const isCarousel = variant === "carousel";
  // Assuming the PDF is located at /public/cv/cv_ANAMOL_KARKI.pdf
  const cvUrl = "../cv/cv_ANAMOL_KARKI.pdf";
  const secondaryButtonClass = isCarousel
    ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-slate-400 hover:text-slate-950 hover:shadow-[0_22px_55px_rgba(15,23,42,0.16)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 disabled:opacity-60 disabled:cursor-not-allowed"
    : "btn-outline";

  return (
    <section
      ref={cvRef}
      className={variant === "carousel" ? "py-0 z-10" : "py-6 z-10"}
    >
      <div className="mx-auto max-w-6xl px-4">
        {variant === "carousel" ? (
          <h2 className="sr-only">Mon CV</h2>
        ) : (
          <MotionDiv
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 text-slate-100 uppercase tracking-[0.3em] font-display"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            MON CV
          </MotionDiv>
        )}

      <MotionDiv
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            width="18"
            height="18"
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
          className={secondaryButtonClass}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          Télécharger
        </a>
      </MotionDiv>
      </div>
    </section>
  );
};

export default CVSection;
