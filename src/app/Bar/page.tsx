"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import { useEffect, useState, useRef } from "react";


interface Qualification {
  title: string;
}

interface Skill {
  name: string;
}

interface Language {
  name: string;
}

interface Experience {
  role: string;
  establishment: string;
  type: string;
  location: string;
  period: string;
  contract?: string;
}

interface ParticlePosition {
  x: string;
  y: string;
}
interface Intro {
    name: string;
    title: string;
    objective: string;
    description: string;
  }
// Data based on your CV
const intro: Intro = {
    name: "ANAMOL JANG KARKI",
    title: "Barman Expérimenté Mixologue & Barista | Auto-Entrepreneur",
    objective: "",
    description: "Origine : Népalais, 23 ans • Plus de 4 ans d’expérience en tant que BARMAN dans plus de 35 établissements : restaurants, brasseries chics, bateaux, bars, clubs, événements, boîtes de nuit • Super connaissance de tous les cocktails classiques • Pleine expérience au bar à boissons chaudes • 5 mois d’expérience en tant que CHEF DE RANG/SERVEUR • Sens du service et habile avec le plateau • Jeune, souriant et professionnel • Véhiculé, à l’aise avec le travail tard le soir",
  };

const qualifications: Qualification[] = [
  { title: "Barman" },
  { title: "Serveur" },
  { title: "Barman Mixologue" },
  { title: "Barman Cocktail" },
  { title: "Barista" },
  { title: "Chef de Rang" },
];

const skills: Skill[] = [
  { name: "Cocktails de base" },
  { name: "Création de cocktails" },
  { name: "Mixologie" },
  { name: "Service au plateau" },
  { name: "Service client" },
  { name: "Service au comptoir" },
  { name: "Encaissement" },
  { name: "Compétences administratives" },
  { name: "Cocktails avancés" },
  { name: "Service à l'assiette" },
  { name: "Barista" },
  { name: "Gestion du bar" },
  { name: "Portage de plateau" },
  { name: "Débarassage des tables" },
  { name: "Respect des règles d'hygiène et de sécurité" },
];

const languages: Language[] = [
  { name: "Anglais" },
  { name: "Français" },
  { name: "Népalais" },
  { name: "Espagnol" },
  { name: "Hindi" },
];

const experiences: Experience[] = [
  { role: "Salle/Bar", establishment: "Bleu Coupole Printemps Haussmann", type: "Brasserie chic", location: "75009 - Paris", period: "01/2025", contract: "Extra" },
  { role: "Barman", establishment: "Stellar", type: "Restaurant - bar", location: "75011 - Paris", period: "01/2025", contract: "Extra" },
  { role: "Barman", establishment: "Sas Le Diamant Bleu", type: "Restaurant gastronomique", location: "94200 - Ivry-sur-Seine", period: "01/2025", contract: "Extra" },
  { role: "Barman", establishment: "Café du Palais", type: "Café - restaurant", location: "75116 - Paris", period: "12/2024", contract: "Extra" },
  { role: "Barista", establishment: "Paillettes", type: "Bar-club", location: "75002 - Paris", period: "12/2024", contract: "Extra" },
  { role: "Barman", establishment: "Le Patio Opéra", type: "Restaurant bistronomique", location: "75009 - Paris", period: "12/2024", contract: "Extra" },
  { role: "Barman Cocktail", establishment: "Club Cochon L’Auberge", type: "Restaurant - bar", location: "75009 - Paris", period: "09/2024 - 10/2024", contract: "Extra" },
  { role: "Barman", establishment: "The Little Italy", type: "Restaurant italien", location: "75017 - Paris", period: "09/2024", contract: "Extra" },
  { role: "Barman", establishment: "Atica", type: "Restaurant gastronomique", location: "75005 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "Le Florès", type: "Brasserie", location: "75007 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "La Marbrerie", type: "Salle de concert", location: "93100 - Montreuil", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "L’Absinthe", type: "Café - bar", location: "75003 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "Café Joséphine", type: "Brasserie chic", location: "75001 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "The Brooklyn Pizzeria", type: "Pizzeria", location: "75003 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "Enza Famiglia Louvre", type: "Restaurant italien", location: "75001 - Paris", period: "08/2024", contract: "Extra" },
  { role: "Barman", establishment: "Terrass Hotel", type: "Restaurant d’hôtel", location: "75018 - Paris", period: "07/2024", contract: "Extra" },
  { role: "Barman", establishment: "Hôtel Particulier Montmartre", type: "Hôtel ******", location: "75018 - Paris", period: "07/2024", contract: "Extra" },
  { role: "Barman", establishment: "Le Magnifique", type: "Brasserie chic", location: "75008 - Paris", period: "03/2024", contract: "Extra" },
  { role: "Barman", establishment: "Kubri", type: "Concept food", location: "75011 - Paris", period: "03/2024", contract: "Extra" },
  { role: "Barman", establishment: "Lombem", type: "Café - restaurant", location: "75002 - Paris", period: "02/2024", contract: "Extra" },
  { role: "Barman", establishment: "Le Patio Opéra", type: "Restaurant bistronomique", location: "75009 - Paris", period: "02/2024", contract: "Extra" },
  { role: "Barman", establishment: "Soho", type: "Restaurant italien", location: "75005 - Paris", period: "02/2024", contract: "Extra" },
  { role: "Barman", establishment: "Jungle Palace", type: "Restaurant - bar", location: "75010 - Paris", period: "02/2024", contract: "Extra" },
  { role: "Barman", establishment: "La Petite Halle", type: "Restaurant - bar", location: "75019 - Paris", period: "12/2023", contract: "Extra" },
  { role: "Barman", establishment: "La Boite à Cocktails", type: "Evénementiel", location: "75002 - Paris", period: "12/2023", contract: "Extra" },
  { role: "Barman", establishment: "Barolo", type: "Café - restaurant", location: "94340 - Joinville-le-Pont", period: "12/2023", contract: "Extra" },
  { role: "Barman", establishment: "Restaurant I’Alma", type: "Brasserie chic", location: "75007 - Paris", period: "12/2023", contract: "Extra" },
  { role: "Barman", establishment: "Les Trois Hiboux", type: "Evénementiel", location: "60128 - Plailly", period: "10/2023", contract: "Extra" },
  { role: "Serveur", establishment: "Les Empotés", type: "Traiteur", location: "92000 - Nanterre", period: "09/2023", contract: "Extra" },
  { role: "Barman", establishment: "Quartier Vavin", type: "Café - restaurant", location: "75006 - Paris", period: "09/2023", contract: "Extra" },
  { role: "Barman", establishment: "Villa Mikuna", type: "Brasserie chic", location: "75009 - Paris", period: "09/2023", contract: "Extra" },
  { role: "Barman", establishment: "Café du Trocadéro", type: "Café - restaurant", location: "75016 - Paris", period: "06/2023 - 09/2023", contract: "CDA" },
  { role: "Barman", establishment: "Summer Act", type: "Bar", location: "75011 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Café Carrousel", type: "Café - restaurant", location: "75001 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Bazturo", type: "Bar-restaurant", location: "75006 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Le Biscornu", type: "Bar-club", location: "75002 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Le Verre Siffleur", type: "Autres", location: "75014 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Salamnamaste", type: "Restaurant chic", location: "94000 - Créteil", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Jardin du Prince", type: "Restaurant asiatique", location: "94000 - Créteil", period: "03/2023 -", contract: "CDA" },
];

export default function BarCV() {
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [, setScrollX] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  const qualificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const positions = Array.from({ length: 50 }, () => ({
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
    }));
    setParticlePositions(positions);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollX(scrollPosition * 0.5); // Adjust multiplier for speed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Arrow Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-30 bg-gold/20 text-gold p-2 rounded-full hover:bg-gold/40 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c6a268"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isSidebarVisible ? "rotate-180" : ""}`}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-48 h-full bg-black/80 border-r border-gold/20 z-20 flex flex-col items-center py-6 transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-48"
        }`}
      >
        <MotionDiv
          className="mt-16 text-xl font-bold text-gold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Navigation
        </MotionDiv>
        <nav className="space-y-4 text-sm">
          <button onClick={() => scrollToSection(introRef)} className="text-gold hover:text-gold/70 transition-colors flex items-center">
            <span className="mr-2">👤</span> Infos Personnelles
          </button>
          <button onClick={() => scrollToSection(qualificationsRef)} className="text-gold hover:text-gold/70 transition-colors flex items-center">
            <span className="mr-2">🎓</span> Qualifications
          </button>
          <button onClick={() => scrollToSection(skillsRef)} className="text-gold hover:text-gold/70 transition-colors flex items-center">
            <span className="mr-2">🛠️</span> Compétences
          </button>
          <button onClick={() => scrollToSection(languagesRef)} className="text-gold hover:text-gold/70 transition-colors flex items-center">
            <span className="mr-2">🌐</span> Langues
          </button>
          <button onClick={() => scrollToSection(experiencesRef)} className="text-gold hover:text-gold/70 transition-colors flex items-center">
            <span className="mr-2">💼</span> Expériences
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative">


        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(198,162,104,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(198,162,104,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

        {/* Golden Particles */}
        <div className="absolute inset-0 pointer-events-none max-w-[100vw] h-full">
          {particlePositions.map((pos, i) => (
            <MotionDiv
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full shadow-[0_0_4px_rgba(198,162,104,0.3)]"
              initial={{ x: pos.x, y: pos.y, scale: 0 }}
              animate={{
                x: [null, `${Math.random() * 100}vw`],
                y: [null, `${Math.random() * 100}vh`],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                transition: { duration: Math.random() * 5 + 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
        </div>

        <div ref={introRef} className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6">
            <MotionDiv
              className="text-center max-w-2xl"
              initial={{ opacity: 0, scale: 0.2, y: -150 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut", type: "spring", stiffness: 70 }}
            >
              <h1 className="mt-8 text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#a88c4f] drop-shadow-[0_0_8px_rgba(198,162,104,0.4)] animate-pulse md:hidden">
                {intro.name}
              </h1>
              <MotionDiv
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl font-bold text-gold/80 mt-4"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                {intro.title}
              </MotionDiv>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-lg italic mt-3 max-w-2xl mx-auto text-gray-300">{intro.objective}</p>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base mt-3 max-w-3xl mx-auto text-gray-400">{intro.description}</p>
            </MotionDiv>
            <MotionDiv
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 2xl:w-48 2xl:h-48 rounded-full border-[6px] border-gold/40 shadow-[0_0_12px_rgba(198,162,104,0.4)]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/me.jpg" // Replace with an appropriate image if available
                alt="Anamol Jang Karki"
                width={584}
                height={584}
                className="object-cover rounded-full w-full h-full"
                priority
              />
            </MotionDiv>
          </div>
        </div>
        {/* Qualifications */}
        <section ref={qualificationsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-gold uppercase tracking-wide drop-shadow-[0_0_8px_rgba(198,162,104,0.4)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            Qualifications
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {qualifications.map((qual, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-gold/20 rounded-full text-gold text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(198,162,104,0.3)] hover:bg-gold/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.15, y: -4 }}
              >
                {qual.title}
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section ref={skillsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-gold uppercase tracking-wide drop-shadow-[0_0_8px_rgba(198,162,104,0.4)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            Compétences
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-gold/20 rounded-full text-gold text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(198,162,104,0.3)] hover:bg-gold/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.15, y: -4 }}
              >
                {skill.name}
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section ref={languagesRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-gold uppercase tracking-wide drop-shadow-[0_0_8px_rgba(198,162,104,0.4)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            Langues Parlées
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-gold/20 rounded-full text-gold text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(198,162,104,0.3)] hover:bg-gold/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.15, y: -4 }}
              >
                {lang.name}
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Experiences */}
        <section ref={experiencesRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-gold uppercase tracking-wide drop-shadow-[0_0_8px_rgba(198,162,104,0.4)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            Expériences
          </MotionDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-full">
            {experiences.map((exp, index) => (
              <MotionDiv
                key={index}
                className="bg-black/70 p-4 rounded-xl shadow-[0_0_12px_rgba(198,162,104,0.2)] hover:shadow-[0_0_20px_rgba(198,162,104,0.4)] transition-all duration-500 overflow-hidden border border-gold/10"
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-lg font-bold text-gold mb-3 uppercase tracking-tight">
                  {exp.role} - {exp.establishment}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base italic text-gray-300">
                  {exp.type} | {exp.location} | {exp.period} {exp.contract ? `(${exp.contract})` : ""}
                </p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(2px, 2px); }
            100% { transform: translate(0); }
          }
          @keyframes pulse {
            0% { text-shadow: 0 0 6px rgba(198, 162, 104, 0.3); }
            50% { text-shadow: 0 0 12px rgba(198, 162, 104, 0.6); }
            100% { text-shadow: 0 0 6px rgba(198, 162, 104, 0.3); }
          }
          .animate-glitch { animation: glitch 0.3s infinite steps(1); }
          .animate-pulse { animation: pulse 2s infinite; }
          .perspective-1000 { perspective: 1000px; }
          .translate-z-10 { transform: translateZ(10px); }
        `}</style>
      </div>
    </div>
  );
}