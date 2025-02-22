"use client"; // Page entièrement Client Component

import type { Metadata } from "next";
import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import { useEffect, useState } from "react";

// Métadonnées pour SEO
const metadata: Metadata = {
  title: "Anamol Jang Karki - Portfolio",
  description: "Portfolio d'Anamol Jang Karki, développeur web/fullstack.",
};

// Données reformulées
const intro = {
  name: "ANAMOL JANG KARKI",
  title: "DÉVELOPPEUR WEB/FULLSTACK",
  objective: "À LA RECHERCHE D’UNE ALTERNANCE BAC+3 (4 JOURS EN ENTREPRISE | 1 JOUR À L’ÉCOLE)",
  description:
    "Dynamique et enthousiaste pour le développement logiciel, je possède une expertise dans la conception d’applications en utilisant divers langages de programmation.",
};

const projects = [
  {
    title: "NAVXPERT: APPLICATION WEB DE NAVIGATION",
    role: "Développeur",
    period: "SEPTEMBRE 2024 - FÉVRIER 2025",
    description:
      "- Une solution numérique pour le web et mobile, développée avec C#, ASP.NET, React.js, TypeScript, PostgreSQL et Entity Framework. - Exploite l’API Île-de-France Mobilités pour alerter les utilisateurs par e-mail et SMS sur les interruptions de leurs trajets habituels, tout en suggérant des itinéraires alternatifs plus efficaces. - Projet orchestré selon les principes de la méthodologie Agile.",
  },
  {
    title: "ECONOMITIENS: SUIVI DE LA CONSOMMATION ÉLECTRIQUE",
    role: "Développeur",
    period: "MARS 2024 - JUILLET 2024",
    description:
      "- Une application desktop conçue avec C#, WPF (MVVM), XAML, MySQL, Arduino et UML. - Permet de surveiller la consommation d’énergie grâce à une gestion agile via la méthode Scrum, assurant une livraison rapide et adaptée aux besoins.",
  },
  {
    title: "ESIEACCASION : SECOND-HAND MARKETPLACE",
    role: "Chef de projet/Développeur",
    period: "SEPTEMBRE 2023 - FÉVRIER 2024",
    description:
      "- Une plateforme en ligne pour articles d’occasion, bâtie avec PHP, MySQL, HTML/CSS suivant le modèle MVC. - Inclut un système de messagerie pour faciliter les échanges entre utilisateurs et une fonctionnalité d’évaluation pour garantir la confiance.",
  },
  {
    title: "ASTAVOID : JEUX DES MINES",
    role: "Chef de projet/Développeur",
    period: "MARS 2023 - JUILLET 2023",
    description:
      "- Un jeu interactif sur le web, créé avec JavaScript, Node.js, HTML, CSS et Nunjucks. - Offre une expérience immersive sur le thème spatial, mettant en scène des astéroïdes dans un environnement captivant.",
  },
];

const experiences = [
  {
    title: "ASSISTANT DE LABORATOIRE INFORMATIQUE",
    location: "HIMAL ACADEMY, BHAKTAPUR, NÉPAL",
    period: "(2019)",
    description:
      "- Accompagnement des étudiants dans l’apprentissage des langages QBASIC et BASIC à travers un soutien technique personnalisé. - Maintenance de la sécurité des systèmes informatiques grâce à la mise en place de mises à jour régulières et de protections contre les menaces virales.",
  },
  {
    title: "BARMAN",
    location: "",
    period: "(2021 - AUJOURD’HUI)",
    description:
      "- Activité exercée pour subvenir aux frais de mes études. - Acquisition de compétences en gestion de situations stressantes, en interaction avec la clientèle et en collaboration au sein d’une équipe.",
  },
];

const education = [
  {
    title: "BACHELOR INFORMATIQUE",
    institution: "École d’ingénieur ESIEA Paris",
    period: "(2023 - 2027)",
    description: "Formation en sciences, mathématiques et informatique.",
  },
  {
    title: "10+2 (ÉQUIVALENT BAC)",
    institution: "Nobel Academy, Kathmandu, Népal",
    period: "(2016 - 2019)",
    description: "Études secondaires avec spécialisation en sciences.",
  },
];

const skills = {
  soft: [
    { name: "RESOLUTION DE PROBLEMES", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a268" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14l4-4"/><path d="M12 14l-4-4"/></svg>' },
    { name: "COMMUNICATION", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a268" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' },
    { name: "ADAPTABILITE", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a268" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M9 9l6 6"/><path d="M15 9l-6 6"/></svg>' },
    { name: "TRAVAIL DÉQUIPE", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a268" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { name: "GESTION DU TEMPS", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a268" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  ],
  tools: ["PHOTOSHOP", "SUITES COLLABORATIVES", "FIGMA/CANVA", "JIRA/TRELLO", "GIT"],
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Fond sombre avec grille subtile */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(198,162,104,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(198,162,104,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Particules dorées */}
      <div className="absolute inset-0 pointer-events-none max-w-[100vw] h-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_6px_rgba(198,162,104,0.4)]"
            initial={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh`, scale: 0 }}
            animate={{
              x: [null, `${Math.random() * 100}vw`],
              y: [null, `${Math.random() * 100}vh`],
              scale: [0, 1.2, 0],
              opacity: [0, 0.9, 0],
              transition: {
                duration: Math.random() * 6 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto z-10">
        <MotionDiv
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.2, y: -200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-[3rem] 2xl:text-[5rem] font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#a88c4f] drop-shadow-[0_0_10px_rgba(198,162,104,0.5)] animate-[pulse_2s_infinite] transform perspective-1000 translate-z-10">
            {intro.name}
          </h1>
          <MotionDiv
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-gold/80 mt-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {intro.title}
          </MotionDiv>
          <p className="text-small sm:text-base md:text-large lg:text-xl 2xl:text-2xl italic mt-4 max-w-3xl mx-auto text-gray-300">{intro.objective}</p>
          <p className="text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl mt-4 max-w-4xl mx-auto text-gray-400">{intro.description}</p>
        </MotionDiv>
        <MotionDiv
          className="absolute top-12 sm:top-16 md:top-20 lg:top-24 2xl:top-32 right-4 sm:right-6 md:right-12 lg:right-24 2xl:right-32 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 2xl:w-96 2xl:h-96 rounded-full border-[8px] border-gold/40 shadow-[0_0_15px_rgba(198,162,104,0.4)] transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05, translateZ: 20 }}
        >
          <Image src="/images/me.jpg" alt="Anamol Jang Karki" fill className="object-cover rounded-full" />
        </MotionDiv>
      </header>

      {/* Section Projets */}
      <section className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto z-10">
        <MotionDiv
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-extrabold text-center mb-12 text-gold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(198,162,104,0.5)] transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
        >
          PROJETS
        </MotionDiv>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-full">
          {projects.map((project, index) => (
            <MotionDiv
              key={index}
              className="relative bg-black/70 p-6 rounded-2xl shadow-[0_0_15px_rgba(198,162,104,0.2)] hover:shadow-[0_0_25px_rgba(198,162,104,0.5)] transition-all duration-700 overflow-hidden border border-gold/10 transform perspective-1000 translate-z-10"
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: index * 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.1, y: -10, translateZ: 20 }}
            >
              <div className="absolute inset-0 bg-gold/10 animate-[glitch_2s_infinite] pointer-events-none"></div>
              <h3 className="text-large sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-bold text-gold mb-4 uppercase tracking-tight">
                {project.title}
              </h3>
              <p className="text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl italic text-gray-300">{project.role} | {project.period}</p>
              <p className="mt-4 text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl text-gray-400">{project.description}</p>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Section Expériences */}
      <section className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto bg-black/10 z-10">
        <MotionDiv
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-extrabold text-center mb-12 text-gold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(198,162,104,0.5)] transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
        >
          EXPÉRIENCES
        </MotionDiv>
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <MotionDiv
              key={index}
              className="bg-black/70 p-6 rounded-2xl shadow-[0_0_15px_rgba(198,162,104,0.2)] hover:shadow-[0_0_25px_rgba(198,162,104,0.5)] transition-all duration-700 border border-gold/10 transform perspective-1000 translate-z-10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -300 : 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: index * 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10, translateZ: 20 }}
            >
              <h3 className="text-large sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-bold text-gold mb-4 uppercase tracking-tight">
                {exp.title}
              </h3>
              <p className="text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl italic text-gray-300">{exp.location} {exp.period}</p>
              <p className="mt-4 text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl text-gray-400">{exp.description}</p>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Section Éducation */}
      <section className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto z-10">
        <MotionDiv
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-extrabold text-center mb-12 text-gold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(198,162,104,0.5)] transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
        >
          ÉDUCATION
        </MotionDiv>
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <MotionDiv
              key={index}
              className="bg-black/70 p-6 rounded-2xl shadow-[0_0_15px_rgba(198,162,104,0.2)] hover:shadow-[0_0_25px_rgba(198,162,104,0.5)] transition-all duration-700 border border-gold/10 transform perspective-1000 translate-z-10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -300 : 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: index * 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10, translateZ: 20 }}
            >
              <h3 className="text-large sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-bold text-gold mb-4 uppercase tracking-tight">
                {edu.title}
              </h3>
              <p className="text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl italic text-gray-300">{edu.institution} {edu.period}</p>
              <p className="mt-4 text-tiny sm:text-small md:text-base lg:text-large 2xl:text-xl text-gray-400">{edu.description}</p>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Section Compétences */}
      <section className="relative py-20 px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto z-10">
        <MotionDiv
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-extrabold text-center mb-12 text-gold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(198,162,104,0.5)] transform perspective-1000 translate-z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
        >
          COMPÉTENCES
        </MotionDiv>
        <div className="space-y-10 lg:space-y-12 2xl:space-y-16">
          {/* Soft Skills avec icônes SVG */}
          <div>
            <h4 className="text-large sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-bold text-gold mb-8 text-center uppercase">
              SOFT SKILLS
            </h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              {skills.soft.map((skill, index) => (
                <MotionDiv
                  key={skill.name}
                  className="flex items-center px-4 py-2 bg-gold/20 rounded-full text-gold text-base sm:text-large md:text-xl lg:text-2xl shadow-[0_0_8px_rgba(198,162,104,0.3)] hover:bg-gold/40 transition-all duration-300 transform perspective-1000 translate-z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.2, y: -5, translateZ: 20 }}
                >
                  <span className="mr-2" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                  {skill.name}
                </MotionDiv>
              ))}
            </div>
          </div>
          {/* Outils */}
          <div>
            <h4 className="text-large sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl font-bold text-gold mb-8 text-center uppercase">
              OUTILS
            </h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              {skills.tools.map((tool, index) => (
                <MotionDiv
                  key={tool}
                  className="px-4 py-2 bg-gold/20 rounded-full text-gold text-base sm:text-large md:text-xl lg:text-2xl shadow-[0_0_8px_rgba(198,162,104,0.3)] hover:bg-gold/40 transition-all duration-300 transform perspective-1000 translate-z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.2, y: -5, translateZ: 20 }}
                >
                  {tool}
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-24 2xl:max-w-[1920px] 2xl:mx-auto text-center z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 200, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, type: "spring", stiffness: 70 }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl mb-8 text-gold uppercase">
            RETROUVEZ MOI SUR
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 lg:gap-10">
            <MotionDiv
              className="flex items-center text-base sm:text-large md:text-xl lg:text-2xl 2xl:text-3xl text-gold"
              whileHover={{ scale: 1.2, y: -5, color: "#a88c4f" }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6a268" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <a href="https://www.linkedin.com/in/anamoljang/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </MotionDiv>
            <MotionDiv
              className="flex items-center text-base sm:text-large md:text-xl lg:text-2xl 2xl:text-3xl text-gold"
              whileHover={{ scale: 1.2, y: -5, color: "#a88c4f" }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6a268" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <a href="https://github.com/ajk-5" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </MotionDiv>
            <MotionDiv
              className="flex items-center text-base sm:text-large md:text-xl lg:text-2xl 2xl:text-3xl text-gold"
              whileHover={{ scale: 1.2, y: -5, color: "#a88c4f" }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6a268" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:anamoljang@gmail.com">
                anamoljang@gmail.com
              </a>
            </MotionDiv>
          </div>
        </MotionDiv>
      </footer>

      {/* Styles globaux */}
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
          0% { text-shadow: 0 0 8px rgba(198, 162, 104, 0.4); }
          50% { text-shadow: 0 0 15px rgba(198, 162, 104, 0.7); }
          100% { text-shadow: 0 0 8px rgba(198, 162, 104, 0.4); }
        }
        .animate-glitch {
          animation: glitch 0.3s infinite steps(1);
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-10 {
          transform: translateZ(10px);
        }
      `}</style>
    </div>
  );
}