"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import TealParticles from "@/components/TealParticle";

// Define types for data structures (unchanged)
interface Intro {
  name: string;
  title: string;
  objective: string;
  description: string;
}

interface Project {
  title: string;
  role: string;
  period: string;
  description: string;
}

interface Experience {
  title: string;
  location: string;
  period: string;
  description: string;
}

interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
  description: string;
}

interface Skills {
  soft: Skill[];
  tools: string[];
}

// Data with TypeScript types (unchanged)
const intro: Intro = {
  name: "ANAMOL JANG KARKI",
  title: "Développeur Fullstack Web / Mobile",
  objective: "À LA RECHERCHE D'ALTERNANCE BAC+3 (4 JOURS EN ENTREPRISE | 1 JOUR À L'ÉCOLE)",
  description: "J'ai une passion pour le développement logiciel et je suis compétent dans la création d'applications à l'aide de langages tels que C#, PHP, JavaScript, Node.js, Python, React.js, React Native, Next.js, ASP.NET, TypeScript, HTML, CSS, BASH, WPF et Mermaid.\n\nJ'ai une solide maîtrise des bases de données comme MySQL et PostgreSQL, et je suis capable de concevoir des Web APIs avec ASP.NET pour intégrer efficacement mes projets. Je m'intéresse également au développement mobile et à la création de jeux vidéo, où j'explore des technologies comme Unity (C#) et Kotlin pour les applications Android. Mon objectif est de concevoir des applications interactives et immersives, que ce soit pour le web, le mobile ou le gaming.\n\nPar ailleurs, je m'intéresse fortement au pentesting et au bug bounty, où j'aime identifier des vulnérabilités et renforcer la sécurité des systèmes.\n\nGrâce à ces compétences, je développe des interfaces modernes et performantes tout en relevant avec enthousiasme des défis techniques.",
};

const projects: Project[] = [
  { title: "NAVXPERT: APPLICATION WEB DE NAVIGATION", role: "Développeur", period: "SEPTEMBRE 2024 - FÉVRIER 2025", description: "- Une solution numérique pour le web et mobile, développée avec C#, ASP.NET, React.js, TypeScript, PostgreSQL, Entity Framework, Leaflet.js et OpenStreetMap. - Exploite l'API Île-de-France Mobilités avec un polling en temps réel pour détecter les perturbations des trajets, alertant les utilisateurs par e-mail et SMS sur les interruptions de leurs trajets habituels tout en suggérant des itinéraires alternatifs plus efficaces, enrichis par des cartes interactives alimentées par Leaflet.js et OpenStreetMap pour une visualisation précise des trajets. - Projet orchestré selon les principes de la méthodologie Agile." },
  { title: "ECONOMITIENS: SUIVI DE LA CONSOMMATION ÉLECTRIQUE", role: "Développeur", period: "MARS 2024 - JUILLET 2024", description: "- Une application desktop conçue avec C#, WPF (MVVM), XAML, MySQL, Arduino et UML. - Permet de surveiller la consommation d'énergie grâce à une gestion agile via la méthode Scrum, assurant une livraison rapide et adaptée aux besoins." },
  { title: "ESIEACCASION : SECOND-HAND MARKETPLACE", role: "Chef de projet/Développeur", period: "SEPTEMBRE 2023 - FÉVRIER 2024", description: "- Une plateforme en ligne pour articles d'occasion, bâtie avec PHP, MySQL, HTML/CSS suivant le modèle MVC. - Inclut un système de messagerie pour faciliter les échanges entre utilisateurs et une fonctionnalité d'évaluation pour garantir la confiance." },
  { title: "ASTAVOID : JEUX DES MINES", role: "Chef de projet/Développeur", period: "MARS 2023 - JUILLET 2023", description: "- Un jeu interactif sur le web, créé avec JavaScript, Node.js, HTML, CSS et Nunjucks. - Offre une expérience immersive sur le thème spatial, mettant en scène des astéroïdes dans un environnement captivant." },
  { title: "ANAMOL KARKI : INTERACTIF BLOG", role: "Chef de projet/Développeur", period: "FEV 2025 - Mars 202s", description: "- www.Anamolkarki.com est un site web développé avec Web API ASP.NET (backend), PostgreSQL (base de données) et Next.js (frontend). Il propose des articles sur la technologie, des nouvelles géographiques, des recettes de cocktails (avec vérification d'âge 18+) et plus encore. L'authentification se fait via Google OAuth ou inscription manuelle. Les utilisateurs peuvent aimer, commenter et participer à une section Q&A. Le site est en cours de configuration dans un conteneur Docker et sera déployé la première semaine de mars." },
];

const experiences: Experience[] = [
  { title: "ASSISTANT DE LABORATOIRE INFORMATIQUE", location: "HIMAL ACADEMY, BHAKTAPUR, NÉPAL", period: "(2019)", description: "- Accompagnement des étudiants dans l'apprentissage des langages QBASIC et BASIC à travers un soutien technique personnalisé. - Maintenance de la sécurité des systèmes informatiques grâce à la mise en place de mises à jour régulières et de protections contre les menaces virales." },
  { title: "BARMAN", location: "", period: "(2021 - AUJOURD'HUI)", description: "- Activité exercée pour subvenir aux frais de mes études. - Acquisition de compétences en gestion de situations stressantes, en interaction avec la clientèle et en collaboration au sein d'une équipe." },
];

const education: Education[] = [
  { title: "BACHELOR INFORMATIQUE", institution: "École d'ingénieur ESIEA Paris", period: "(2023 - 2027)", description: "Bachelor en Ingénierie Logicielle et développeur fullstack web/mobile" },
  { title: "10+2 (ÉQUIVALENT BAC)", institution: "Nobel Academy, Kathmandu, Népal", period: "(2016 - 2019)", description: "Études secondaires avec spécialisation en sciences, mathématiques et informatique." },
];

const skills: Skills = {
  soft: [
    {
      name: "RÉSOLUTION DE PROBLÈMES",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/><path d='M12 14l4-4'/><path d='M12 14l-4-4'/></svg>",
      description: "J'aime résoudre des problèmes et trouver des solutions efficaces. J'ai un bon raisonnement logique et une forte capacité d'analyse. Les défis me motivent, et je prends plaisir à surmonter des obstacles, que ce soit en mathématiques, en programmation ou dans la vie quotidienne."
    },
    {
      name: "COMMUNICATION",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/></svg>",
      description: "Je peux communiquer ecrit/orale dans plusieurs langues : français, anglais, népalais et hindi. Je comprends aussi bien l'ourdou et je commence à apprendre l'espagnol. Je suis une personne souriante et ouverte, ce qui me permet de bien interagir avec les autres."
    },
    {
      name: "ADAPTABILITÉ",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16v16H4z'/><path d='M9 9l6 6'/><path d='M15 9l-6 6'/></svg>",
      description: "Je m'adapte facilement aux nouvelles situations et environnements. En arrivant en France en 2020, pendant le confinement et sans parler français, j'ai réussi à m'intégrer et à apprendre la langue. Mon expérience en tant qu'auto-entrepreneur m'a aussi appris à travailler dans des contextes variés et à gérer l'inconnu."
    },
    {
      name: "TRAVAIL D'ÉQUIPE",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>",
      description: "J'ai travaillé sur plusieurs projets en équipe et je connais bien les méthodes Agiles et Scrum. Je sais collaborer efficacement, écouter les autres et organiser le travail pour atteindre un objectif commun."
    },
    {
      name: "GESTION DU TEMPS",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>",
      description: "Je sais bien gérer mon temps et équilibrer ma vie scolaire et professionnelle. Grâce à mon organisation et ma discipline, j'ai pu avancer dans mes études tout en ayant des expériences professionnelles enrichissantes."
    }
  ],
  tools: ["PHOTOSHOP", "SUITES COLLABORATIVES", "FIGMA/CANVA", "JIRA/TRELLO", "GITHUB/GITLAB", "DOCKER"],
};

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [hueRotation, setHueRotation] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHueRotation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const gradientStyle = {
    filter: `hue-rotate(${hueRotation}deg)`,
    transition: 'filter 0.5s ease-in-out'
  };

  return (
    <div className="min-h-screen text-slate-800 overflow-hidden relative">
              {/* Teal Particles */}
              <TealParticles particleCount={90}/>
              
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
          className="text-xl font-bold text-teal-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={gradientStyle}
        >
          Portfolio
        </MotionDiv>
        <nav className="top-16 space-y-4 text-sm">
          <button onClick={() => scrollToSection(introRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🏠</span> Intro
          </button>
          <button onClick={() => scrollToSection(projectsRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">📑</span> Projets
          </button>
          <button onClick={() => scrollToSection(experiencesRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">💼</span> Expériences
          </button>
          <button onClick={() => scrollToSection(educationRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🎓</span> Éducation
          </button>
          <button onClick={() => scrollToSection(skillsRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">🛠️</span> Compétences
          </button>
          <button onClick={() => scrollToSection(contactRef)} className="text-teal-800 hover:text-teal-900 transition-colors flex items-center" style={gradientStyle}>
            <span className="mr-2">📞</span> Contact
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Header */}
        <div ref={introRef} className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6 relative">
            <h1 className="absolute top-8 text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-indigo-700 drop-shadow-md animate-pulse z-30 md:hidden" style={gradientStyle}>
              {intro.name}
            </h1>
            <MotionDiv
              className="text-center max-w-2xl mt-16 md:mt-0"
              initial={{ opacity: 0, scale: 0.2, y: -150 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut", type: "spring", stiffness: 70 }}
            >
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

        {/* Projects */}
        <section ref={projectsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            PROJETS
          </MotionDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-full">
            {projects.map((project, index) => (
              <MotionDiv
                key={index}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-teal-400"
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -8 }}
                style={{ borderColor: `hsl(${(hueRotation + index * 30) % 360}, 80%, 50%)` }}
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-lg 2xl:text-lg font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
                  {project.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base italic text-slate-600">{project.role} | {project.period}</p>
                <p className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700">{project.description}</p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Experiences */}
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
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
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
                <p className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700">{exp.description}</p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Education */}
        <section ref={educationRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            ÉDUCATION
          </MotionDiv>
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <MotionDiv
                key={index}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
                initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: index * 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -8 }}
                style={{ borderColor: `hsl(${(hueRotation + index * 90) % 360}, 80%, 50%)` }}
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl 2xl:text-4xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
                  {edu.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base italic text-slate-600">{edu.institution} {edu.period}</p>
                <p className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700">{edu.description}</p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Skills (Compétences) */}
        <section ref={skillsRef} className="py-16 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
          <MotionDiv
            className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-extrabold text-center mb-8 text-teal-800 uppercase tracking-wide drop-shadow-md transform perspective-1000 translate-z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            style={gradientStyle}
          >
            COMPÉTENCES
          </MotionDiv>
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl mx-auto">
            {/* Soft Skills */}
            <MotionDiv
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -8 }}
              style={{ borderColor: `hsl(${(hueRotation + 0) % 360}, 80%, 50%)` }}
            >
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
                SOFT SKILLS
              </h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
                {skills.soft.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col items-center p-4 w-64 md:w-80 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
                      selectedSkill === index ? "bg-teal-600/30" : "bg-teal-600/10"
                    }`}
                    onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
                    onHoverStart={() => setSelectedSkill(selectedSkill === index ? null : index)}
                    onHoverEnd={() => setSelectedSkill(null)}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="text-teal-800 text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-2">
                        <span dangerouslySetInnerHTML={{ __html: skill.icon.replace('#164e63', '#0f766e') }} />
                        {skill.name}
                      </div>
                      <motion.div
                        animate={{ 
                          rotate: selectedSkill === index ? 180 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#0f766e" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </motion.div>
                    </div>
                    {selectedSkill === index && (
                      <motion.p
                        className="mt-2 text-sm md:text-base text-slate-700 px-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {skill.description}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </MotionDiv>

            {/* Tools */}
            <MotionDiv
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400"
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -8 }}
              style={{ borderColor: `hsl(${(hueRotation + 30) % 360}, 80%, 50%)` }}
            >
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-bold text-teal-800 mb-3 uppercase tracking-tight" style={gradientStyle}>
                OUTILS
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.tools.map((tool, index) => (
                  <span key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-teal-400">{tool}</span>
                ))}
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Footer */}
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
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-teal-400 max-w-4xl mx-auto"
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    <a href="https://www.linkedin.com/in/anamoljang/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                  <div className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-teal-800 hover:text-teal-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    <a href="https://github.com/ajk-5" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                  <div className="flex items-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-teal-800 hover:text-teal-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    <a href="mailto:anamoljang@gmail.com">anamoljang@gmail.com</a>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </section>
        </footer>

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
          .animate-movingGradient {
            background-size: 200% 200%;
            animation: movingGradient 10s ease infinite;
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