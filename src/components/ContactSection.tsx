"use client";

import { MotionDiv } from "@/components/MotionDiv";

interface ContactSectionProps {
  hueRotation: number;
  contactRef: React.RefObject<HTMLDivElement>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ hueRotation, contactRef }) => {
  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: "filter 0.5s ease-in-out",
  };

  return (
    <footer className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <section ref={contactRef}>
        <MotionDiv
          className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          style={gradientStyle}
        >
          CONTACT
        </MotionDiv>
        <MotionDiv
          className="backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -8 }}
          style={{ borderColor: `hsl(${(hueRotation + 60) % 360}, 80%, 50%)` }}
        >
          <div className="text-center">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-4 uppercase">Retrouvez-moi sur</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 lg:gap-8">
              <div className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-teal-800 hover:text-teal-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <a href="https://www.linkedin.com/in/anamoljang/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-teal-800 hover:text-teal-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <a href="https://github.com/ajk-5" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-teal-800 hover:text-teal-900 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:anamoljang@gmail.com">anamoljang@gmail.com</a>
              </div>
            </div>
          </div>
        </MotionDiv>
      </section>
    </footer>
  );
};

export default ContactSection;