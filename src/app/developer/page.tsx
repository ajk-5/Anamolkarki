"use client";

import { useEffect, useState, useRef } from "react";
import TealParticles from "@/components/TealParticle";
import NavSidebar from "@/components/NavSidebar";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperiencesSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillSection"; // keep for SOFT skills
import ContactSection from "@/components/ContactSection";
import CVSection from "@/components/CVSection";

// Interfaces
interface Intro {
  name: string;
  title: string;
  objective: string;
  description: string[];
}
interface Project {
  title: string;
  role: string;
  period: string;
  description: string[];
}
interface Experience {
  title: string;
  location: string;
  period: string;
  description: string[];
}
interface Education {
  title: string;
  institution: string;
  period: string;
  description: string[];
}
interface Skill {
  name: string;
  icon: string;
  description: string;
}
interface Skills {
  soft: Skill[];
  tools: { name: string; icon: string }[];
}

/* ------------------ DATA ------------------ */

const intro: Intro = {
  name: "ANAMOL JANG KARKI",
  title: "Développeur Fullstack Web / Mobile",
  objective:
    "À LA RECHERCHE D'ALTERNANCE BAC+3 (4 JOURS EN ENTREPRISE | 1 JOUR À L'ÉCOLE)",
  description: [
    "Passionné par le développement logiciel",
    "Compétent en C#, PHP, JavaScript, Node.js, Python, React.js, React Native, Next.js, ASP.NET, TypeScript, HTML, CSS, BASH, WPF et Mermaid",
    "Solide maîtrise des bases de données MySQL et PostgreSQL",
    "Capable de concevoir des Web APIs avec ASP.NET",
    "Intérêt pour le développement mobile et la création de jeux vidéo (Unity, Kotlin)",
    "Objectif : créer des applications interactives et immersives pour web, mobile et gaming",
    "Intérêt marqué pour le pentesting et le bug bounty",
    "Compétences en identification des vulnérabilités et renforcement de la sécurité",
    "Développement d'interfaces modernes et performantes",
    "Enthousiaste face aux défis techniques",
  ],
};

const projects: Project[] = [
  {
    title: "NAVXPERT: APPLICATION WEB DE NAVIGATION",
    role: "Développeur",
    period: "SEPTEMBRE 2024 - FÉVRIER 2025",
    description: [
      "Site web : navxpert.anamolkarki.com",
      "Solution numérique pour web et mobile",
      "Technologies : C#, ASP.NET, React.js, TypeScript, PostgreSQL, Entity Framework, Leaflet.js, OpenStreetMap",
      "Utilisation de l'API Île-de-France Mobilités avec polling en temps réel",
      "Détection des perturbations de trajets",
      "Alertes par e-mail et SMS pour les interruptions",
      "Suggestions d'itinéraires alternatifs",
      "Cartes interactives avec Leaflet.js et OpenStreetMap",
      "Méthodologie Agile",
    ],
  },
  {
    title: "ECONOMITIENS: SUIVI DE LA CONSOMMATION ÉLECTRIQUE",
    role: "Développeur",
    period: "MARS 2024 - JUILLET 2024",
    description: [
      "Application desktop",
      "Technologies : C#, WPF (MVVM), XAML, MySQL, Arduino, UML",
      "Surveillance de la consommation d'énergie",
      "Gestion agile via la méthode Scrum",
      "Livraison rapide et adaptée aux besoins",
    ],
  },
  {
    title: "ESIEACCASION : SECOND-HAND MARKETPLACE",
    role: "Chef de projet/Développeur",
    period: "SEPTEMBRE 2023 - FÉVRIER 2024",
    description: [
      "Plateforme en ligne pour articles d'occasion",
      "Technologies : PHP, MySQL, HTML/CSS, modèle MVC",
      "Système de messagerie pour les échanges",
      "Fonctionnalité d'évaluation pour la confiance",
    ],
  },
  {
    title: "ASTAVOID : JEUX DES MINES",
    role: "Chef de projet/Développeur",
    period: "MARS 2023 - JUILLET 2023",
    description: [
      "Jeu interactif sur le web",
      "Technologies : JavaScript, Node.js, HTML, CSS, Nunjucks",
      "Thème spatial avec astéroïdes",
      "Expérience immersive",
    ],
  },
  {
    title: "WT4Q.com: INTERACTIF BLOG",
    role: "Chef de projet/Développeur",
    period: "FEV 2025 - Juillet 2025",
    description: [
      "Site web : www.wt4q.com",
      "Technologies : C# Web API ASP.NET, PostgreSQL, Next.js",
      "Contenu : articles tech, nouvelles géo, recettes de cocktails (18+), jeux en ligne, outils",
      "Authentification via Google OAuth ou inscription",
      "Fonctionnalités : likes, commentaires, Q&A",
      "Configuration en cours dans Docker",
    ],
  },
];

const experiences: Experience[] = [
  {
    title: "ASSISTANT DE LABORATOIRE INFORMATIQUE",
    location: "HIMAL ACADEMY, BHAKTAPUR, NÉPAL",
    period: "(2019)",
    description: [
      "Accompagnement des étudiants en QBASIC et BASIC",
      "Soutien technique personnalisé",
      "Maintenance de la sécurité des systèmes",
      "Mises à jour régulières",
      "Protection contre les menaces virales",
    ],
  },
  {
    title: "BARMAN",
    location: "",
    period: "(2021 - 2025)",
    description: [
      "Activité pour financer mes études",
      "Gestion de situations stressantes",
      "Interaction avec la clientèle",
      "Collaboration en équipe",
    ],
  },
];

const education: Education[] = [
  {
    title: "BACHELOR INFORMATIQUE",
    institution: "École d'ingénieur ESIEA Paris",
    period: "(2023 - 2027)",
    description: [
      "Bachelor en Ingénierie Logicielle",
      "Développeur fullstack web/mobile",
    ],
  },
  {
    title: "10+2 (ÉQUIVALENT BAC)",
    institution: "Nobel Academy, Kathmandu, Népal",
    period: "(2016 - 2019)",
    description: [
      "Études secondaires",
      "Spécialisation en sciences, mathématiques et informatique",
    ],
  },
];

// Keep your existing SOFT skills section intact
const skills: Skills = {
  soft: [
    {
      name: "RÉSOLUTION DE PROBLÈMES",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/><path d='M12 14l4-4'/><path d='M12 14l-4-4'/></svg>",
      description:
        "J'aime résoudre des problèmes et trouver des solutions efficaces. J'ai un bon raisonnement logique et une forte capacité d'analyse...",
    },
    {
      name: "COMMUNICATION",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/></svg>",
      description:
        "Je peux communiquer écrit/oral en français, anglais, népalais et hindi. Je comprends l'ourdou et j'apprends l'espagnol...",
    },
    {
      name: "ADAPTABILITÉ",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16v16H4z'/><path d='M9 9l6 6'/><path d='M15 9l-6 6'/></svg>",
      description:
        "Je m'adapte facilement aux nouvelles situations et environnements. Arrivé en France en 2020...",
    },
    {
      name: "TRAVAIL D'ÉQUIPE",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>",
      description:
        "J'ai travaillé sur plusieurs projets en équipe et je connais bien les méthodes Agiles et Scrum...",
    },
    {
      name: "GESTION DU TEMPS",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#164e63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>",
      description:
        "Je sais bien gérer mon temps et équilibrer ma vie scolaire et professionnelle...",
    },
  ],
  tools: [], // not needed here; we’ll render a new technical section below
};

/* ---------- UNIFORM SVG BADGE GENERATOR ---------- */

const badgeSVG = (label: string, bg = "#0ea5a4", fg = "#0b1324") => {
  // uniform 56×56 viewbox with rounded rect + centered text
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" role="img" aria-label="${label}">
    <rect x="1" y="1" width="54" height="54" rx="12" fill="${bg}" stroke="#0b1324" stroke-width="2"/>
    <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Inter, system-ui, Arial" font-size="16" font-weight="700" fill="${fg}">
      ${label}
    </text>
  </svg>`;
};

type TechItem = { name: string; subtitle: string; icon: string };

// Derived from your codebase (intro + projects + tools mentioned)
const TECH = {
  languages: [
    { name: "C#", subtitle: "Langage", icon: badgeSVG("C#","#a78bfa","#0b1324") },
    { name: "PHP", subtitle: "Langage", icon: badgeSVG("PHP","#6366f1","#ffffff") },
    { name: "JavaScript", subtitle: "Langage", icon: badgeSVG("JS","#f7df1e","#1f2937") },
    { name: "TypeScript", subtitle: "Langage", icon: badgeSVG("TS","#3b82f6","#ffffff") },
    { name: "Python", subtitle: "Langage", icon: badgeSVG("PY","#eab308","#1f2937") },
    { name: "Bash", subtitle: "Langage", icon: badgeSVG("BASH","#94a3b8","#0b1324") },
    { name: "HTML", subtitle: "Langage", icon: badgeSVG("HTML","#fb923c","#1f2937") },
    { name: "CSS", subtitle: "Langage", icon: badgeSVG("CSS","#60a5fa","#0b1324") },
    { name: "Kotlin", subtitle: "Langage", icon: badgeSVG("KT","#10b981","#0b1324") },
  ] as TechItem[],

  frameworks: [
    { name: "React", subtitle: "Framework", icon: badgeSVG("React","#a7f3d0","#065f46") },
    { name: "React Native", subtitle: "Framework", icon: badgeSVG("RN","#a7f3d0","#065f46") },
    { name: "Next.js", subtitle: "Framework", icon: badgeSVG("Next","#e5e7eb","#111827") },
    { name: "ASP.NET", subtitle: "Framework", icon: badgeSVG("ASP.NET","#c4b5fd","#0b1324") },
    { name: "WPF", subtitle: "Framework", icon: badgeSVG("WPF","#fde68a","#0b1324") },
    { name: "Entity Framework", subtitle: "ORM", icon: badgeSVG("EF","#86efac","#065f46") },
    { name: "Leaflet.js", subtitle: "Lib map", icon: badgeSVG("Leaflet","#bbf7d0","#065f46") },
    { name: "OpenStreetMap", subtitle: "Données", icon: badgeSVG("OSM","#bfdbfe","#0b1324") },
    { name: "Nunjucks", subtitle: "Template", icon: badgeSVG("NJK","#fbcfe8","#0b1324") },
    { name: "Unity", subtitle: "Moteur", icon: badgeSVG("Unity","#d1d5db","#111827") },
  ] as TechItem[],

  databases: [
    { name: "MySQL", subtitle: "Base de données", icon: badgeSVG("MySQL","#60a5fa","#0b1324") },
    { name: "PostgreSQL", subtitle: "Base de données", icon: badgeSVG("Postgres","#38bdf8","#0b1324") },
  ] as TechItem[],

  os: [
    { name: "Linux", subtitle: "OS", icon: badgeSVG("Linux","#22c55e","#0b1324") },
  ] as TechItem[],

  tools: [
    { name: "Docker", subtitle: "Outil", icon: badgeSVG("Docker","#93c5fd","#0b1324") },
    { name: "GitHub", subtitle: "Outil", icon: badgeSVG("GitHub","#e5e7eb","#111827") },
    { name: "GitLab", subtitle: "Outil", icon: badgeSVG("GitLab","#fca5a5","#111827") },
    { name: "Jira", subtitle: "Outil", icon: badgeSVG("Jira","#93c5fd","#0b1324") },
    { name: "Trello", subtitle: "Outil", icon: badgeSVG("Trello","#bfdbfe","#0b1324") },
    { name: "Postman", subtitle: "Outil", icon: badgeSVG("Postman","#fdba74","#0b1324") },
    { name: "Nginx", subtitle: "Outil", icon: badgeSVG("Nginx","#86efac","#065f46") },
    { name: "Figma", subtitle: "Outil", icon: badgeSVG("Figma","#f5d0fe","#0b1324") },
    { name: "Canva", subtitle: "Outil", icon: badgeSVG("Canva","#a7f3d0","#065f46") },
    { name: "Photoshop", subtitle: "Outil", icon: badgeSVG("Ps","#c7d2fe","#0b1324") },
    { name: "Suites collaboratives", subtitle: "Bureau", icon: badgeSVG("Office","#e2e8f0","#0b1324") },
    { name: "UML", subtitle: "Modélisation", icon: badgeSVG("UML","#fde68a","#0b1324") },
    { name: "Arduino", subtitle: "HW", icon: badgeSVG("Arduino","#99f6e4","#0b1324") },
  ] as TechItem[],
};

/* ------------- PRESENTATIONAL COMPONENTS ------------- */

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 p-4 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition">
      <div
        className="svg-box size-14"
        dangerouslySetInnerHTML={{ __html: item.icon }}
        aria-hidden
      />
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-800">{item.name}</div>
        <div className="text-[11px] text-slate-500">{item.subtitle}</div>
      </div>
    </div>
  );
}

type TabKey = "Langages" | "Frameworks" | "Bases de données" | "OS" | "Outils";
const TAB_KEYS: TabKey[] = ["Langages", "Frameworks", "Bases de données", "OS", "Outils"];

function TechStackSection({ hueRotation }: { hueRotation: number }) {
  const [active, setActive] = useState<TabKey>("Langages");

  const dataByTab: Record<TabKey, TechItem[]> = {
    "Langages": TECH.languages,
    "Frameworks": TECH.frameworks,
    "Bases de données": TECH.databases,
    "OS": TECH.os,
    "Outils": TECH.tools,
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          className="mb-6 text-2xl md:text-3xl font-extrabold tracking-tight"
          style={{
            color: `hsl(${hueRotation}, 35%, 25%)`,
            textShadow: "0 0 10px rgba(45,212,191,0.15)",
          }}
        >
          Stack technique
        </h2>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TAB_KEYS.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium border transition",
                active === k
                  ? "bg-teal-600 text-white border-teal-700"
                  : "bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:text-teal-700",
              ].join(" ")}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {dataByTab[active].map((item) => (
            <TechCard key={`${active}-${item.name}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ PAGE ------------------ */

export default function Home() {
  const [hueRotation, setHueRotation] = useState(0);
  const introRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const experiencesRef = useRef<HTMLDivElement>(null!);
  const educationRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);
  const cvRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const interval = setInterval(() => {
      setHueRotation((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden relative">
      {/* Background layers (non-blocking & behind content) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10 bg-[linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <NavSidebar
        scrollToSection={scrollToSection}
        introRef={introRef}
        projectsRef={projectsRef}
        experiencesRef={experiencesRef}
        educationRef={educationRef}
        skillsRef={skillsRef}
        contactRef={contactRef}
        cvRef={cvRef}
        hueRotation={hueRotation}
      />

      <div className="relative z-10">
        {/* Prevent particles from stealing scroll/touch */}
        <div className="pointer-events-none">
          <TealParticles particleCount={90} />
        </div>

        <IntroSection intro={intro} hueRotation={hueRotation} introRef={introRef} />
        <CVSection hueRotation={hueRotation} cvRef={cvRef} />
        <ProjectsSection projects={projects} hueRotation={hueRotation} projectsRef={projectsRef} />
        <ExperiencesSection
          experiences={experiences}
          hueRotation={hueRotation}
          experiencesRef={experiencesRef}
        />
        <EducationSection education={education} hueRotation={hueRotation} educationRef={educationRef} />

        {/* NEW: Technical stack (SVG tiles in bordered boxes) */}
        <div ref={skillsRef}>
          {/* Keep your original soft skills section if you like */}
          <SkillsSection skills={skills} hueRotation={hueRotation} skillsRef={skillsRef} />
          {/* Add the structured/dynamic tech section */}
          <TechStackSection hueRotation={hueRotation} />
        </div>

        <ContactSection hueRotation={hueRotation} contactRef={contactRef} />
      </div>

      <style jsx global>{`
        /* Make ANY injected svg uniform size */
        .svg-box svg {
          width: 56px;
          height: 56px;
          display: block;
        }

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
        .animate-movingGradient { background-size: 200% 200%; animation: movingGradient 10s ease infinite; }
        .animate-glitch { animation: glitch 0.3s infinite steps(1); }
        .animate-pulse { animation: pulse 2s infinite; }
        .perspective-1000 { perspective: 1000px; }
        .translate-z-10 { transform: translateZ(10px); }
      `}</style>
    </div>
  );
}
