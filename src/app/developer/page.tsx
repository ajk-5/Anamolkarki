"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperiencesSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillSection"; // keep for SOFT skills
import ContactSection from "@/components/ContactSection";

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
  caseStudyHref?: string;
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
  institutionUrl?: string;
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
}

const pageSections = [
  { id: "intro", label: "Intro" },
  { id: "projects", label: "Projects" },
  { id: "experiences", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof pageSections)[number]["id"];

const SECTION_ACCENTS = [
  "from-sky-400/25 via-fuchsia-400/20 to-emerald-400/20",
  "from-violet-400/25 via-sky-300/15 to-emerald-300/20",
  "from-amber-300/25 via-rose-300/20 to-sky-300/20",
  "from-emerald-300/25 via-cyan-300/15 to-sky-300/20",
  "from-lime-300/25 via-emerald-300/15 to-teal-300/20",
  "from-fuchsia-400/25 via-rose-300/20 to-amber-300/20",
  "from-sky-400/25 via-emerald-300/20 to-amber-300/20",
  "from-cyan-300/25 via-sky-300/20 to-fuchsia-400/20",
] as const;

const SECTION_CAROUSEL_GRADIENTS = [
  "from-sky-300 via-fuchsia-300 to-violet-300",
  "from-fuchsia-300 via-rose-300 to-amber-200",
  "from-emerald-300 via-teal-300 to-sky-300",
  "from-amber-300 via-orange-300 to-rose-300",
  "from-violet-300 via-sky-300 to-emerald-200",
  "from-rose-300 via-fuchsia-300 to-sky-300",
  "from-lime-300 via-emerald-300 to-teal-200",
  "from-sky-300 via-cyan-300 to-emerald-300",
] as const;

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
    title: "90STIMES.COM : THE NINETIES TIMES",
    caseStudyHref: "/90stimes.com",
    role: "Chef de projet/Développeur",
    period: "FÉVRIER 2025 - JUILLET 2025",
    description: [
      "Site web : 90stimes.com",
      "Frontend : Next.js | Backend : ASP.NET Web API",
      "Base de données : PostgreSQL",
      "Reverse proxy : Nginx",
      "Cartes : OpenStreetMap (Leaflet prévu)",
      "Météo : API MET Norway (Location Forecast 2.0)",
      "Personnalisation : adaptation IP pour les actualités et la météo",
      "Contenu : articles tech, actualités géopolitiques, recettes de cocktails (18+), jeux en ligne, outils",
      "Authentification via Google OAuth ou inscription",
      "Fonctionnalités : likes, commentaires, questions-réponses",
      "Configuration en cours dans Docker",
    ],
  },
  {
    title: "PARIS-GURU : GUIDE INTELLIGENT POUR PARIS",
    role: "Chef de projet/Développeur",
    period: "AOÛT 2025 - EN COURS (NON LANCÉ)",
    description: [
      "Application mobile Android et iOS développée en React Native",
      "Backend : Web API ASP.NET en C#",
      "Modules IA et machine learning en Python (Django)",
      "Interface web Next.js connectée à la plateforme",
      "Base de données : PostgreSQL avec extension PostGIS",
      "Cache applicatif : Redis pour les notifications contextuelles",
      "Guide intelligent avec alertes sur le patrimoine historique, culturel et artistique à proximité",
      "Suggestions d'événements, restaurants, clubs, jeux et activités touristiques",
      "Billetterie et réservations intégrées pour les utilisateurs",
    ],
  },
  {
    title: "NAVXPERT : APPLICATION WEB DE NAVIGATION",
    role: "Développeur",
    period: "SEPTEMBRE 2024 - FÉVRIER 2025",
    description: [
      "Site web : navxpert.anamolkarki.com",
      "Solution numérique pour web et mobile",
      "Technologies : C#, ASP.NET, React.js, TypeScript, PostgreSQL, Entity Framework, Leaflet.js, OpenStreetMap",
      "Reverse proxy : Nginx",
      "Utilisation de l'API Île-de-France Mobilités avec polling en temps réel",
      "Détection des perturbations de trajets",
      "Alertes par e-mail et SMS pour les interruptions",
      "Suggestions d'itinéraires alternatifs",
      "Cartes interactives avec Leaflet.js et OpenStreetMap",
      "Méthodologie Agile",
    ],
  },
  {
    title: "ECONOMITIENS : SUIVI DE LA CONSOMMATION ÉLECTRIQUE",
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
    title: "ASTAVOID : JEU DES MINES",
    role: "Chef de projet/Développeur",
    period: "MARS 2023 - JUILLET 2023",
    description: [
      "Jeu interactif sur le web",
      "Technologies : JavaScript, Node.js, HTML, CSS, Nunjucks",
      "Thème spatial avec astéroïdes",
      "Expérience immersive",
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
    title: "AUTO-ENTREPRENEUR",
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
    title: "BACHELOR INFORMATIQUE (BAC+3 WEB & AI)",
    institution: "EFREI",
    institutionUrl: "https://www.efrei.fr/",
    period: "(2026 - PRESENT)",
    description: [
      "Bachelor en Ingenierie Logicielle",
      "Parcours Web et Intelligence Artificielle",
    ],
  },
  {
    title: "BACHELOR INFORMATIQUE",
    institution: "École d'ingénieur ESIEA Paris",
    period: "(2023 - 2025)",
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
};

/* ---------- UNIFORM SVG BADGE GENERATOR ---------- */

const badgeSVG = (label: string, bg = "#0ea5a4", fg = "#0b1324") => {
  // uniform 56×56 viewbox with rounded rect + centered text
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" role="img" aria-label="${label}">
    <rect x="1" y="1" width="54" height="54" rx="12" fill="${bg}" stroke="#0b1324" stroke-width="2"/>
    <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Space Grotesk, system-ui, Arial" font-size="16" font-weight="700" fill="${fg}">
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
    { name: "Java", subtitle: "Langage", icon: badgeSVG("JAVA","#f97316","#1f2937") },
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
    { name: "Django", subtitle: "Framework", icon: badgeSVG("Django","#facc15","#0f172a") },
    { name: "Spring Boot", subtitle: "Framework Java", icon: badgeSVG("Spring","#86efac","#065f46") },
    { name: "Symfony", subtitle: "Framework PHP", icon: badgeSVG("Symfony","#111827","#ffffff") },
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
    { name: "PostGIS", subtitle: "Extension SIG", icon: badgeSVG("PostGIS","#34d399","#0b1324") },
    { name: "Redis", subtitle: "Base de données en mémoire", icon: badgeSVG("Redis","#f87171","#0b1324") },
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
    { name: "Redis", subtitle: "Cache", icon: badgeSVG("Redis","#f87171","#0b1324") },
    { name: "Figma", subtitle: "Outil", icon: badgeSVG("Figma","#f5d0fe","#0b1324") },
    { name: "Canva", subtitle: "Outil", icon: badgeSVG("Canva","#a7f3d0","#065f46") },
    { name: "Photoshop", subtitle: "Outil", icon: badgeSVG("Ps","#c7d2fe","#0b1324") },
    { name: "Suites collaboratives", subtitle: "Bureau", icon: badgeSVG("Office","#e2e8f0","#0b1324") },
    { name: "UML", subtitle: "Modélisation", icon: badgeSVG("UML","#fde68a","#0b1324") },
    { name: "Arduino", subtitle: "HW", icon: badgeSVG("Arduino","#99f6e4","#0b1324") },
  ] as TechItem[],
};

/* ------------- PRESENTATIONAL COMPONENTS ------------- */

function TechPill({
  item,
  tone = "dark",
}: {
  item: TechItem;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={[
        "group flex items-center gap-3 rounded-full border px-3 py-2 transition hover:-translate-y-0.5",
        isLight
          ? "border-slate-200/80 bg-white/70 shadow-[0_12px_28px_rgba(15,23,42,0.08)] hover:bg-white hover:border-slate-300"
          : "border-white/15 bg-white/5 backdrop-blur hover:border-white/25 hover:bg-white/10",
      ].join(" ")}
    >
      <div
        className="svg-box h-10 w-10 shrink-0"
        dangerouslySetInnerHTML={{ __html: item.icon }}
        aria-hidden
      />
      <div className="min-w-0">
        <div
          className={[
            "truncate text-sm font-semibold",
            isLight ? "text-slate-900" : "text-slate-100",
          ].join(" ")}
        >
          {item.name}
        </div>
        <div
          className={[
            "hidden sm:block truncate text-[11px]",
            isLight ? "text-slate-600" : "text-slate-200/60",
          ].join(" ")}
        >
          {item.subtitle}
        </div>
      </div>
    </div>
  );
}

type TabKey = "Langages" | "Frameworks" | "Bases de données" | "OS" | "Outils";
const TAB_KEYS: TabKey[] = ["Langages", "Frameworks", "Bases de données", "OS", "Outils"];

function TechStackSection({ variant = "default" }: { variant?: "default" | "carousel" }) {
  const [active, setActive] = useState<TabKey>("Langages");
  const isCarousel = variant === "carousel";

  const dataByTab: Record<TabKey, TechItem[]> = {
    "Langages": TECH.languages,
    "Frameworks": TECH.frameworks,
    "Bases de données": TECH.databases,
    "OS": TECH.os,
    "Outils": TECH.tools,
  };

  return (
    <section className={variant === "carousel" ? "relative py-0" : "relative py-6"}>
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        {variant === "carousel" ? (
          <h2 className="sr-only">Stack technique</h2>
        ) : (
          <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-100 font-display">
            Stack technique
          </h2>
        )}

        {/* Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {TAB_KEYS.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={
                isCarousel
                  ? [
                      "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40",
                      active === k
                        ? "border-slate-300 bg-white text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                        : "border-slate-200/80 bg-white/70 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:bg-white hover:border-slate-300 hover:text-slate-900",
                    ].join(" ")
                  : ["btn-chip shrink-0", active === k ? "btn-chip-active" : ""].join(" ")
              }
            >
              {k}
            </button>
          ))}
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {dataByTab[active].map((item) => (
            <TechPill
              key={`${active}-${item.name}`}
              item={item}
              tone={isCarousel ? "light" : "dark"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ PAGE ------------------ */

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const experiencesRef = useRef<HTMLDivElement>(null!);
  const educationRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);

  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const wheelLockRef = useRef<number>(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSectionIndexRef = useRef(0);
  activeSectionIndexRef.current = activeSectionIndex;
  const [headerOffset, setHeaderOffset] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    active: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    active: false,
  });

  const clampIndex = (index: number) =>
    Math.max(0, Math.min(index, pageSections.length - 1));

  const scrollToSectionIndex = (index: number) => {
    setActiveSectionIndex(clampIndex(index));
  };

  const scrollToSection = (id: SectionId) => {
    const index = pageSections.findIndex((s) => s.id === id);
    if (index < 0) return;
    scrollToSectionIndex(index);
  };

  const goPrev = () => setActiveSectionIndex((prev) => clampIndex(prev - 1));
  const goNext = () => setActiveSectionIndex((prev) => clampIndex(prev + 1));

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      goNext();
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveSectionIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveSectionIndex(pageSections.length - 1);
    }
  };

  const updateCarousel = () => {
    const wrapper = carouselWrapperRef.current;
    const track = carouselTrackRef.current;
    if (!wrapper || !track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-carousel-card]");
    const activeCard = cards[activeSectionIndexRef.current];
    if (!activeCard) return;

    const cardWidth = activeCard.offsetWidth;
    const offset = activeCard.offsetLeft - (wrapper.clientWidth / 2 - cardWidth / 2);
    setTrackOffset(offset);
  };

  const scheduleCarouselUpdate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateCarousel);
  };

  useLayoutEffect(() => {
    updateCarousel();
  }, [activeSectionIndex, headerOffset]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId | "";
    if (hash) {
      const index = pageSections.findIndex((s) => s.id === hash);
      if (index >= 0) setActiveSectionIndex(index);
    }
  }, []);

  useEffect(() => {
    scheduleCarouselUpdate();

    const handleResize = () => scheduleCarouselUpdate();
    window.addEventListener("resize", handleResize);
    const wrapper = carouselWrapperRef.current;
    const ro =
      wrapper && "ResizeObserver" in window ? new ResizeObserver(handleResize) : null;
    if (wrapper && ro) ro.observe(wrapper);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const id = pageSections[activeSectionIndex]?.id;
    if (!id) return;
    window.history.replaceState(null, "", `#${id}`);
  }, [activeSectionIndex]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      const height = header?.getBoundingClientRect().height ?? 0;
      setHeaderOffset(height);
    };

    measure();
    window.addEventListener("resize", measure);

    const header = document.querySelector("header");
    const ro = header && "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (header && ro) ro.observe(header);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // allow zoom

      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-ignore-page-wheel]")) return;
      if (target?.closest("[data-nested-carousel]")) return;
      const scrollArea = target?.closest<HTMLElement>("[data-card-scroll]");
      if (scrollArea) {
        const canScrollY = scrollArea.scrollHeight > scrollArea.clientHeight + 1;
        if (canScrollY) {
          const atTop = scrollArea.scrollTop <= 0;
          const atBottom =
            Math.ceil(scrollArea.scrollTop + scrollArea.clientHeight) >=
            scrollArea.scrollHeight;
          const scrollingUp = event.deltaY < 0;
          const scrollingDown = event.deltaY > 0;

          if ((scrollingUp && !atTop) || (scrollingDown && !atBottom)) {
            return;
          }
        }
      }

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 12) return;

      const now = performance.now();
      if (now - wheelLockRef.current < 520) {
        event.preventDefault();
        return;
      }
      wheelLockRef.current = now;

      event.preventDefault();
      if (delta > 0) goNext();
      else goPrev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel as unknown as EventListener);
    };
  }, []);

  return (
    <main
      style={{ "--header-offset": `${headerOffset}px` } as React.CSSProperties}
      className="developer-deck text-slate-950 flex h-[calc(100vh-var(--header-offset))] flex-col overflow-hidden"
    >
      <div className="relative flex-1 min-h-0">
        <div className="h-full flex items-center justify-center px-2 sm:px-4">
          <div
            ref={carouselWrapperRef}
            onKeyDown={handleCarouselKeyDown}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              const target = event.target as HTMLElement | null;
              if (!target) return;
              if (target.closest("[data-card-scroll]")) return;
              if (target.closest("a,button,input,textarea,select,label")) return;

              swipeRef.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                active: false,
              };
              setIsDragging(false);
              setDragX(0);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const state = swipeRef.current;
              if (state.pointerId !== event.pointerId) return;

              const dx = event.clientX - state.startX;
              const dy = event.clientY - state.startY;

              if (!state.active) {
                const absX = Math.abs(dx);
                const absY = Math.abs(dy);
                if (absX < 10 || absX < absY) return;
                state.active = true;
                setIsDragging(true);
              }

              event.preventDefault();
              setDragX(Math.max(-380, Math.min(380, dx)));
            }}
            onPointerUp={(event) => {
              const state = swipeRef.current;
              if (state.pointerId !== event.pointerId) return;

              const dx = event.clientX - state.startX;
              if (state.active) {
                if (dx < -70) goNext();
                if (dx > 70) goPrev();
              }

              swipeRef.current = { pointerId: null, startX: 0, startY: 0, active: false };
              setDragX(0);
              setIsDragging(false);
            }}
            onPointerCancel={(event) => {
              const state = swipeRef.current;
              if (state.pointerId !== event.pointerId) return;
              swipeRef.current = { pointerId: null, startX: 0, startY: 0, active: false };
              setDragX(0);
              setIsDragging(false);
            }}
            tabIndex={0}
            role="region"
            aria-label="Developer section carousel"
            style={
              {
                "--carousel-card-w": "clamp(260px, 90vw, 760px)",
                "--carousel-card-h": "clamp(360px, calc(100% - 16px), 600px)",
                "--carousel-gap": "clamp(12px, 3.4vw, 30px)",
                touchAction: "pan-y",
              } as React.CSSProperties
            }
            className="relative h-full w-full max-w-[1100px] overflow-hidden flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          >
            <button
              type="button"
              onClick={goPrev}
              disabled={activeSectionIndex <= 0}
              aria-label="Previous section"
              className="btn-icon absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div
              ref={carouselTrackRef}
              className={[
                "flex items-center gap-[var(--carousel-gap)] will-change-transform",
                isDragging
                  ? ""
                  : "transition-transform duration-500 [transition-timing-function:cubic-bezier(.4,0,.2,1)]",
              ].join(" ")}
              style={{ transform: `translateX(${-(trackOffset) + dragX}px)` }}
            >
              {pageSections.map((s, index) => {
                const active = index === activeSectionIndex;
                const gradient =
                  SECTION_CAROUSEL_GRADIENTS[index % SECTION_CAROUSEL_GRADIENTS.length];

                return (
                  <div
                    key={s.id}
                    data-carousel-card
                    onClick={() => scrollToSectionIndex(index)}
                    className={[
                      "group relative flex-none w-[var(--carousel-card-w)] h-[var(--carousel-card-h)] overflow-hidden rounded-[28px] select-none transform-gpu",
                      "transition-[transform,opacity,filter] duration-500 [transition-timing-function:cubic-bezier(.4,0,.2,1)]",
                      active
                        ? "cursor-default opacity-100 scale-[1.02] sm:scale-[1.08] saturate-[1.05]"
                        : "cursor-pointer opacity-70 sm:opacity-45 scale-[0.9] sm:scale-[0.78] sm:blur-[0.2px] saturate-[0.9] hover:opacity-80 hover:scale-[0.94] sm:hover:opacity-65 sm:hover:scale-[0.86]",
                      active
                        ? "shadow-[0_26px_80px_rgba(2,6,23,0.55)]"
                        : "shadow-[0_18px_55px_rgba(2,6,23,0.35)]",
                    ].join(" ")}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.28),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(56,189,248,0.14),transparent_60%)]" />
                    <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    <div className="absolute inset-0 ring-1 ring-white/25" />
                    <div className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
                    <div className="pointer-events-none absolute -bottom-10 -right-6 rotate-[-8deg] font-display text-[clamp(72px,10vw,148px)] font-semibold tracking-tight text-slate-950/15 mix-blend-multiply">
                      {s.label}
                    </div>

                    <div className="relative z-10 flex h-full flex-col p-3 sm:p-5">
                      <div className="shrink-0 pb-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-950/15 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-950 shadow-[0_14px_40px_rgba(2,6,23,0.16)] backdrop-blur">
                          <span>{s.label}</span>
                          <span className="h-4 w-px bg-slate-950/15" aria-hidden />
                          <span className="tabular-nums text-slate-700">
                            {String(index + 1).padStart(2, "0")}/
                            {String(pageSections.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <div className="relative min-h-0 flex-1">
                        <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-white/70 backdrop-blur-2xl ring-1 ring-slate-950/10 shadow-[0_22px_60px_rgba(2,6,23,0.18)]" />
                        <div
                          data-card-scroll
                          className={[
                            "relative h-full overflow-y-auto overflow-x-hidden no-scrollbar pb-12",
                            active ? "pointer-events-auto" : "pointer-events-none",
                          ].join(" ")}
                        >
                        {s.id === "intro" && (
                          <IntroSection intro={intro} introRef={introRef} variant="carousel" />
                        )}
                        {s.id === "projects" && (
                          <ProjectsSection
                            projects={projects}
                            projectsRef={projectsRef}
                            variant="compact"
                          />
                        )}
                        {s.id === "experiences" && (
                          <ExperiencesSection
                            experiences={experiences}
                            experiencesRef={experiencesRef}
                            variant="carousel"
                          />
                        )}
                        {s.id === "education" && (
                          <EducationSection
                            education={education}
                            educationRef={educationRef}
                            variant="carousel"
                          />
                        )}
                        {s.id === "skills" && (
                          <SkillsSection skills={skills} skillsRef={skillsRef} variant="carousel" />
                        )}
                        {s.id === "stack" && <TechStackSection variant="carousel" />}
                        {s.id === "contact" && (
                          <ContactSection contactRef={contactRef} variant="compact" />
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={activeSectionIndex >= pageSections.length - 1}
              aria-label="Next section"
              className="btn-icon absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {pageSections.map((s, index) => {
                const active = index === activeSectionIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToSectionIndex(index)}
                    aria-label={`Go to ${s.label}`}
                    aria-current={active ? "true" : undefined}
                    className={active ? "btn-dot btn-dot-active" : "btn-dot"}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* Make ANY injected svg uniform size */
        .svg-box svg {
          width: 100%;
          height: 100%;
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
    </main>
  );
}

