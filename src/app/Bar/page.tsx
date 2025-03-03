"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import {  useState, useRef } from "react";
import TealParticles from "@/components/TealParticle";


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
  { role: "Barman", establishment: "Café du Trocadéro", type: "Café - restaurant", location: "75016 - Paris", period: "06/2023 - 09/2023", contract: "CDi" },
  { role: "Barman", establishment: "Summer Act", type: "Bar", location: "75011 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Café Carrousel", type: "Café - restaurant", location: "75001 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Bazturo", type: "Bar-restaurant", location: "75006 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Le Biscornu", type: "Bar-club", location: "75002 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Le Verre Siffleur", type: "Autres", location: "75014 - Paris", period: "03/2023 -", contract: "CDA" },
  { role: "Barman", establishment: "Salamnamaste", type: "Restaurant chic", location: "94000 - Créteil", period: "03/2022 -", contract: "CDA" },
  { role: "Barman", establishment: "Jardin du Prince", type: "Restaurant ", location: "94000 - Créteil", period: "03/2021 -", contract: "CDA" },
];

export default function BarCV() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const introRef = useRef<HTMLDivElement>(null);
  const qualificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const gradientStyle = {
    filter: `hue-rotate(${Math.random() * 360}deg)`, // Random initial hue
    transition: 'filter 0.5s ease-in-out'
  };

  return (
    <div className="min-h-screen text-slate-800 overflow-hidden relative">
      {/* Moving Linear Gradient Background */}
      <div className="fixed inset-0 w-full h-full bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 animate-movingGradient"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-3xl opacity-60 transform translate-x-1/4 -translate-y-1/4 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-emerald-400 to-lime-300 blur-3xl opacity-60 transform -translate-x-1/4 translate-y-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 blur-3xl opacity-60 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {/* Arrow Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 bg-teal-600/30 text-teal-800 p-2 rounded-full hover:bg-teal-600/50 transition-all duration-300 shadow-lg"
        style={gradientStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isSidebarVisible ? "rotate-[-45]" : "rotate-90"}`}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-40  right-0 w-48 h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 animate-movingGradient backdrop-blur-sm border-r border-teal-400  flex flex-col items-center py-6 transition-transform duration-300 shadow-lg ${
          isSidebarVisible ? "translate-x-0" : "-translate-y-full"
        }`}
      >
        <MotionDiv
          className="mt-16 text-xl font-bold text-teal-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={gradientStyle}
        >
          Navigation
        </MotionDiv>
        <nav className="space-y-4 text-sm">
          <button
            onClick={() => scrollToSection(introRef)}
            className="text-teal-800 hover:text-teal-900 transition-colors flex items-center"
            style={gradientStyle}
          >
            <span className="mr-2">👤</span> Infos Personnelles
          </button>
          <button
            onClick={() => scrollToSection(qualificationsRef)}
            className="text-teal-800 hover:text-teal-900 transition-colors flex items-center"
            style={gradientStyle}
          >
            <span className="mr-2">🎓</span> Qualifications
          </button>
          <button
            onClick={() => scrollToSection(skillsRef)}
            className="text-teal-800 hover:text-teal-900 transition-colors flex items-center"
            style={gradientStyle}
          >
            <span className="mr-2">🛠️</span> Compétences
          </button>
          <button
            onClick={() => scrollToSection(languagesRef)}
            className="text-teal-800 hover:text-teal-900 transition-colors flex items-center"
            style={gradientStyle}
          >
            <span className="mr-2">🌐</span> Langues
          </button>
          <button
            onClick={() => scrollToSection(experiencesRef)}
            className="text-teal-800 hover:text-teal-900 transition-colors flex items-center"
            style={gradientStyle}
          >
            <span className="mr-2">💼</span> Expériences
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Teal Particles */}
        <TealParticles particleCount={90}/>

        {/* Intro */}
        <div ref={introRef} className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6">
            <MotionDiv
              className="text-center max-w-2xl"
              initial={{ opacity: 0, scale: 0.2, y: -150 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut", type: "spring", stiffness: 70 }}
            >
              <h1 className="mt-8 text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-indigo-700 drop-shadow-md animate-pulse md:hidden">
                {intro.name}
              </h1>
              <MotionDiv
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl font-bold text-teal-800 mt-4"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                style={gradientStyle}
              >
                {intro.title}
              </MotionDiv>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-lg italic mt-3 max-w-2xl mx-auto text-slate-600">{intro.objective}</p>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base mt-3 max-w-3xl mx-auto text-slate-700">{intro.description}</p>
            </MotionDiv>
            <MotionDiv
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 2xl:w-48 2xl:h-48 rounded-full border-[6px] border-teal-400 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              style={{ borderColor: `hsl(${(Math.random() * 360) % 360}, 80%, 50%)` }}
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

        {/* Qualifications */}
        <section ref={qualificationsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            Qualifications
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {qualifications.map((qual, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-teal-600/10 rounded-full text-teal-800 text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(45,212,191,0.3)] hover:bg-teal-600/30 transition-all duration-300"
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
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            Compétences
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-teal-600/10 rounded-full text-teal-800 text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(45,212,191,0.3)] hover:bg-teal-600/30 transition-all duration-300"
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
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            Langues Parlées
          </MotionDiv>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <MotionDiv
                key={index}
                className="px-4 py-2 bg-teal-600/10 rounded-full text-teal-800 text-sm sm:text-base md:text-lg lg:text-xl shadow-[0_0_6px_rgba(45,212,191,0.3)] hover:bg-teal-600/30 transition-all duration-300"
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
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            Expériences
          </MotionDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-full">
            {experiences.map((exp, index) => (
              <MotionDiv
                key={index}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-teal-400"
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -8 }}
                style={{ borderColor: `hsl(${(Math.random() * 360) % 360}, 80%, 50%)` }}
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-lg font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
                  {exp.role} - {exp.establishment}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base italic text-slate-600">
                  {exp.type} | {exp.location} | {exp.period} {exp.contract ? `(${exp.contract})` : ""}
                </p>
              </MotionDiv>
            ))}
          </div>
        </section>
      </div>

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
          0% { text-shadow: 0 0 6px rgba(45, 212, 191, 0.3); }
          50% { text-shadow: 0 0 12px rgba(45, 212, 191, 0.6); }
          100% { text-shadow: 0 0 6px rgba(45, 212, 191, 0.3); }
        }
        @keyframes movingGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blob {
          0% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(30%, -50%) scale(1.2); }
          66% { transform: translate(-20%, 20%) scale(0.8); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        .animate-movingGradient {
          background-size: 200% 200%;
          animation: movingGradient 10s ease infinite;
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-glitch { animation: glitch 0.3s infinite steps(1); }
        .animate-pulse { animation: pulse 2s infinite; }
        .perspective-1000 { perspective: 1000px; }
        .translate-z-10 { transform: translateZ(10px); }
      `}</style>
    </div>
  );
}