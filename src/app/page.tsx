"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import TealParticles from "@/components/TealParticle";

// Updated interfaces with string[] for descriptions
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
  tools: { name: string; icon: string }[]; // Updated to include icon
}

// Updated data with bullet points
const intro: Intro = {
  name: "ANAMOL JANG KARKI",
  title: "Développeur Fullstack Web / Mobile",
  objective: "À LA RECHERCHE D'ALTERNANCE BAC+3 (4 JOURS EN ENTREPRISE | 1 JOUR À L'ÉCOLE)",
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
    "Enthousiaste face aux défis techniques"
  ],
};

const projects: Project[] = [
  {
    title: "NAVXPERT: APPLICATION WEB DE NAVIGATION",
    role: "Développeur",
    period: "SEPTEMBRE 2024 - FÉVRIER 2025",
    description: [
      "Solution numérique pour web et mobile",
      "Technologies : C#, ASP.NET, React.js, TypeScript, PostgreSQL, Entity Framework, Leaflet.js, OpenStreetMap",
      "Utilisation de l'API Île-de-France Mobilités avec polling en temps réel",
      "Détection des perturbations de trajets",
      "Alertes par e-mail et SMS pour les interruptions",
      "Suggestions d'itinéraires alternatifs",
      "Cartes interactives avec Leaflet.js et OpenStreetMap",
      "Méthodologie Agile"
    ]
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
      "Livraison rapide et adaptée aux besoins"
    ]
  },
  {
    title: "ESIEACCASION : SECOND-HAND MARKETPLACE",
    role: "Chef de projet/Développeur",
    period: "SEPTEMBRE 2023 - FÉVRIER 2024",
    description: [
      "Plateforme en ligne pour articles d'occasion",
      "Technologies : PHP, MySQL, HTML/CSS, modèle MVC",
      "Système de messagerie pour les échanges",
      "Fonctionnalité d'évaluation pour la confiance"
    ]
  },
  {
    title: "ASTAVOID : JEUX DES MINES",
    role: "Chef de projet/Développeur",
    period: "MARS 2023 - JUILLET 2023",
    description: [
      "Jeu interactif sur le web",
      "Technologies : JavaScript, Node.js, HTML, CSS, Nunjucks",
      "Thème spatial avec astéroïdes",
      "Expérience immersive"
    ]
  },
  {
    title: "ANAMOL KARKI : INTERACTIF BLOG",
    role: "Chef de projet/Développeur",
    period: "FEV 2025 - Mars 2025",
    description: [
      "Site web : www.Anamolkarki.com",
      "Technologies : Web API ASP.NET, PostgreSQL, Next.js",
      "Contenu : articles tech, nouvelles géo, recettes de cocktails (18+)",
      "Authentification via Google OAuth ou inscription",
      "Fonctionnalités : likes, commentaires, Q&A",
      "Configuration en cours dans Docker",
      "Déploiement prévu première semaine de mars"
    ]
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
      "Protection contre les menaces virales"
    ]
  },
  {
    title: "BARMAN",
    location: "",
    period: "(2021 - AUJOURD'HUI)",
    description: [
      "Activité pour financer mes études",
      "Gestion de situations stressantes",
      "Interaction avec la clientèle",
      "Collaboration en équipe"
    ]
  },
];

const education: Education[] = [
  {
    title: "BACHELOR INFORMATIQUE",
    institution: "École d'ingénieur ESIEA Paris",
    period: "(2023 - 2027)",
    description: [
      "Bachelor en Ingénierie Logicielle",
      "Développeur fullstack web/mobile"
    ]
  },
  {
    title: "10+2 (ÉQUIVALENT BAC)",
    institution: "Nobel Academy, Kathmandu, Népal",
    period: "(2016 - 2019)",
    description: [
      "Études secondaires",
      "Spécialisation en sciences, mathématiques et informatique"
    ]
  },
];

// Skills remain unchanged as they are already structured appropriately
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
  tools: [
    {
      name: "PHOTOSHOP",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#0f766e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'/><path d='M9 12h6'/><path d='M12 9v6'/></svg>"
    },
    {
      name: "SUITES COLLABORATIVES",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#0f766e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>"
    },
    {
      name: "FIGMA/CANVA",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#0f766e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'/><path d='M12 8v8'/><path d='M8 12h8'/></svg>"
    },
    {
      name: "JIRA/TRELLO",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#0f766e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/></svg>"
    },
    {
      name: "GITHUB/GITLAB",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#0f766e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'/></svg>"
    },
    {
      name: "DOCKER",
      icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Docker icon</title><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>'
    },{
  name:"LINUX",
    icon:'<svg width="30px" height="30px" viewBox="0 0 0.6 0.6" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#202020" d="M0.5 0.451c-0.004 -0.004 -0.005 -0.012 -0.007 -0.02 -0.002 -0.008 -0.004 -0.017 -0.011 -0.023v0a0.03 0.03 0 0 0 -0.008 -0.005c0.009 -0.028 0.006 -0.056 -0.004 -0.081 -0.012 -0.031 -0.032 -0.058 -0.048 -0.076 -0.017 -0.022 -0.034 -0.043 -0.034 -0.074 0.001 -0.047 0.005 -0.134 -0.078 -0.134q-0.005 0 -0.011 0c-0.092 0.007 -0.068 0.105 -0.069 0.138 -0.002 0.024 -0.007 0.043 -0.023 0.066 -0.019 0.023 -0.046 0.06 -0.059 0.099 -0.006 0.018 -0.009 0.037 -0.006 0.055a0.037 0.037 0 0 0 -0.002 0.002c-0.006 0.006 -0.01 0.013 -0.015 0.018 -0.004 0.004 -0.011 0.006 -0.017 0.008 -0.007 0.002 -0.014 0.006 -0.019 0.015v0a0.026 0.026 0 0 0 -0.003 0.013c0 0.004 0.001 0.008 0.001 0.012 0.001 0.008 0.003 0.016 0.001 0.021 -0.005 0.015 -0.006 0.025 -0.002 0.032 0.004 0.007 0.012 0.011 0.021 0.013 0.018 0.004 0.042 0.003 0.061 0.013l0.002 -0.003 -0.002 0.003c0.02 0.011 0.041 0.014 0.057 0.011a0.037 0.037 0 0 0 0.026 -0.021c0.013 0 0.027 -0.005 0.049 -0.007 0.015 -0.001 0.034 0.005 0.056 0.004a0.03 0.03 0 0 0 0.003 0.007l0 0c0.009 0.017 0.024 0.025 0.041 0.024s0.035 -0.011 0.049 -0.029l-0.003 -0.002 0.003 0.002c0.014 -0.017 0.037 -0.024 0.052 -0.033 0.008 -0.005 0.014 -0.01 0.014 -0.019s-0.004 -0.018 -0.016 -0.03"/><path fill="#F8BF11" d="M0.509 0.481c0 0.005 -0.004 0.009 -0.011 0.013 -0.014 0.008 -0.038 0.016 -0.054 0.034 -0.014 0.016 -0.03 0.025 -0.045 0.026s-0.027 -0.005 -0.034 -0.02v0c-0.005 -0.009 -0.003 -0.022 0.001 -0.037s0.009 -0.029 0.01 -0.042v0c0.001 -0.016 0.002 -0.029 0.004 -0.04 0.003 -0.011 0.007 -0.018 0.014 -0.022l0.001 -0.001c0.001 0.013 0.007 0.027 0.019 0.03 0.013 0.003 0.031 -0.008 0.039 -0.017l0.005 0c0.007 0 0.013 0 0.019 0.005v0c0.005 0.004 0.007 0.011 0.009 0.019s0.003 0.017 0.009 0.023c0.011 0.012 0.014 0.02 0.014 0.025m-0.262 0.038v0c-0.001 0.016 -0.011 0.025 -0.025 0.028 -0.014 0.003 -0.033 0 -0.052 -0.01 -0.021 -0.011 -0.046 -0.01 -0.063 -0.013 -0.008 -0.002 -0.013 -0.004 -0.016 -0.009 -0.002 -0.005 -0.002 -0.013 0.003 -0.027v0l0 0c0.003 -0.008 0.001 -0.016 -0.001 -0.024 -0.001 -0.008 -0.002 -0.015 0.001 -0.02l0 0c0.004 -0.007 0.009 -0.009 0.015 -0.012 0.006 -0.002 0.014 -0.004 0.02 -0.01l0 0h0c0.006 -0.006 0.01 -0.013 0.015 -0.018 0.004 -0.004 0.008 -0.007 0.014 -0.007h0a0.037 0.037 0 0 1 0.003 0c0.008 0.001 0.015 0.007 0.022 0.016l0.02 0.036v0c0.005 0.011 0.017 0.023 0.026 0.036 0.01 0.012 0.017 0.025 0.016 0.035"/><path fill="#D6A312" d="M0.347 0.18c-0.002 -0.003 -0.005 -0.006 -0.011 -0.008 -0.012 -0.005 -0.017 -0.005 -0.023 -0.01 -0.011 -0.007 -0.019 -0.009 -0.026 -0.009a0.03 0.03 0 0 0 -0.01 0.002c-0.009 0.003 -0.015 0.009 -0.018 0.013 -0.001 0.001 -0.002 0.001 -0.004 0.003 -0.002 0.002 -0.006 0.004 -0.011 0.008 -0.004 0.003 -0.006 0.007 -0.004 0.012s0.006 0.011 0.015 0.016h0c0.005 0.003 0.009 0.007 0.013 0.011a0.03 0.03 0 0 0 0.007 0.004 0.03 0.03 0 0 0 0.01 0.002c0.009 0.001 0.016 -0.002 0.022 -0.006 0.006 -0.003 0.011 -0.008 0.017 -0.01h0c0.012 -0.004 0.021 -0.011 0.023 -0.018a0.012 0.012 0 0 0 0 -0.01"/><path fill="#202020" d="M0.316 0.197c-0.01 0.005 -0.021 0.011 -0.033 0.011s-0.021 -0.005 -0.028 -0.011c-0.003 -0.003 -0.006 -0.005 -0.008 -0.007 -0.004 -0.003 -0.003 -0.007 -0.002 -0.007 0.002 0 0.003 0.004 0.004 0.005 0.002 0.002 0.005 0.004 0.008 0.007 0.006 0.005 0.015 0.01 0.026 0.01s0.023 -0.006 0.031 -0.011c0.004 -0.002 0.01 -0.007 0.014 -0.01 0.003 -0.003 0.003 -0.006 0.006 -0.005s0.001 0.003 -0.003 0.007c-0.004 0.003 -0.01 0.008 -0.015 0.011"/><path fill="#ffffff" d="M0.463 0.401h-0.004c0.003 -0.01 -0.004 -0.018 -0.023 -0.027 -0.02 -0.009 -0.036 -0.008 -0.039 0.01a0.037 0.037 0 0 0 0 0.003 0.037 0.037 0 0 0 -0.004 0.002c-0.009 0.005 -0.015 0.014 -0.017 0.026s-0.004 0.025 -0.004 0.041c0 0.008 -0.004 0.018 -0.007 0.03 -0.033 0.023 -0.078 0.034 -0.117 0.007q-0.004 -0.006 -0.009 -0.012l-0.006 -0.008a0.024 0.024 0 0 0 0.01 -0.002 0.013 0.013 0 0 0 0.007 -0.007c0.002 -0.006 0 -0.015 -0.008 -0.026 -0.008 -0.01 -0.02 -0.022 -0.039 -0.033 -0.014 -0.009 -0.022 -0.019 -0.025 -0.031 -0.004 -0.011 -0.003 -0.024 0 -0.036 0.005 -0.023 0.019 -0.046 0.028 -0.061 0.002 -0.002 0.001 0.003 -0.009 0.021 -0.009 0.017 -0.025 0.055 -0.003 0.084a0.176 0.176 0 0 1 0.014 -0.063c0.012 -0.028 0.038 -0.077 0.04 -0.115 0.001 0.001 0.005 0.003 0.006 0.004 0.005 0.003 0.008 0.007 0.013 0.011a0.032 0.032 0 0 0 0.022 0.007c0.009 0 0.016 -0.003 0.022 -0.006 0.006 -0.004 0.011 -0.008 0.016 -0.009 0.01 -0.003 0.018 -0.009 0.023 -0.015 0.008 0.031 0.026 0.076 0.038 0.098 0.006 0.012 0.019 0.036 0.024 0.066q0.005 0 0.011 0.001c0.014 -0.036 -0.012 -0.076 -0.024 -0.087 -0.005 -0.005 -0.005 -0.007 -0.003 -0.007 0.013 0.011 0.03 0.034 0.036 0.06 0.003 0.012 0.003 0.024 0 0.036q0.002 0.001 0.004 0.002c0.023 0.011 0.031 0.021 0.027 0.034"/><path fill="#E6E6E6" d="M0.301 0.302c-0.021 0 -0.041 0.009 -0.058 0.027S0.213 0.371 0.205 0.4l0.002 0.001v0c0.018 0.011 0.03 0.022 0.038 0.033 0.008 0.011 0.012 0.022 0.008 0.031a0.019 0.019 0 0 1 -0.01 0.011l-0.002 0.001q0.004 0.005 0.008 0.011c0.035 0.024 0.077 0.015 0.108 -0.006 0.003 -0.01 0.006 -0.02 0.006 -0.026 0.001 -0.016 0.002 -0.03 0.005 -0.042 0.003 -0.012 0.009 -0.024 0.02 -0.03q0.001 0 0.002 -0.001a0.037 0.037 0 0 1 0.001 -0.004c-0.009 -0.023 -0.022 -0.043 -0.038 -0.056s-0.034 -0.021 -0.052 -0.021zm0.089 0.081 0 0v0l0 0z"/><path fill="#ffffff" d="M0.348 0.144a0.039 0.039 0 0 1 -0.008 0.025 0.15 0.15 0 0 0 -0.008 -0.003l-0.005 -0.002c0.001 -0.001 0.003 -0.003 0.004 -0.005a0.026 0.026 0 0 0 0.002 -0.009l0 0a0.026 0.026 0 0 0 -0.001 -0.009 0.016 0.016 0 0 0 -0.004 -0.007 0.008 0.008 0 0 0 -0.006 -0.003H0.321a0.009 0.009 0 0 0 -0.006 0.002 0.016 0.016 0 0 0 -0.005 0.007 0.026 0.026 0 0 0 -0.002 0.009v0a0.037 0.037 0 0 0 0 0.005 0.068 0.068 0 0 0 -0.013 -0.004 0.037 0.037 0 0 1 0 -0.005v0a0.037 0.037 0 0 1 0.003 -0.017 0.03 0.03 0 0 1 0.009 -0.012 0.021 0.021 0 0 1 0.013 -0.005h0c0.005 0 0.009 0.001 0.013 0.004a0.03 0.03 0 0 1 0.01 0.012c0.002 0.005 0.004 0.01 0.004 0.016zm-0.071 0.006a0.037 0.037 0 0 0 -0.01 0.005 0.022 0.022 0 0 0 0 -0.006v0a0.026 0.026 0 0 0 -0.002 -0.007 0.015 0.015 0 0 0 -0.004 -0.005 0.006 0.006 0 0 0 -0.004 -0.002 0.006 0.006 0 0 0 -0.004 0.002 0.015 0.015 0 0 0 -0.003 0.006 0.022 0.022 0 0 0 0 0.008v0a0.022 0.022 0 0 0 0.002 0.007 0.014 0.014 0 0 0 0.004 0.006l-0.004 0.003 -0.003 0.002a0.026 0.026 0 0 1 -0.006 -0.009 0.041 0.041 0 0 1 -0.003 -0.014v0a0.041 0.041 0 0 1 0.002 -0.015 0.025 0.025 0 0 1 0.006 -0.011 0.013 0.013 0 0 1 0.01 -0.004 0.013 0.013 0 0 1 0.009 0.003 0.026 0.026 0 0 1 0.007 0.01c0.002 0.004 0.003 0.009 0.003 0.014v0q0 0.003 0 0.006"/><path fill="#202020" d="M0.293 0.163c0 0.001 0.002 0.001 0.004 0.002 0.001 0.001 0.002 0.002 0.003 0.002s0.003 0 0.003 -0.002c0 -0.001 -0.002 -0.002 -0.003 -0.003 -0.002 -0.001 -0.004 -0.001 -0.006 0 0 0 -0.001 0.001 -0.001 0.001zm-0.012 0c0 0.001 -0.002 0.001 -0.004 0.002 -0.001 0.001 -0.002 0.002 -0.003 0.002 -0.001 0 -0.003 0 -0.003 -0.002 0 -0.001 0.002 -0.002 0.003 -0.003 0.002 -0.001 0.004 -0.001 0.006 0 0 0 0.001 0.001 0.001 0.001z"/></svg>'}
]};
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
      <TealParticles particleCount={90}/>
      
      {/* Background and Sidebar unchanged */}
      <div className="fixed inset-0 w-full h-full bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 animate-movingGradient"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-3xl opacity-60 transform translate-x-1/4 -translate-y-1/4 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-emerald-400 to-lime-300 blur-3xl opacity-60 transform -translate-x-1/4 translate-y-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 blur-3xl opacity-60 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

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

      <div
        className={`fixed z-40 right-0 w-48 h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 animate-movingGradient backdrop-blur-sm border-r border-teal-400 flex flex-col items-center py-6 transition-transform duration-300 shadow-lg ${
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
          {/* Sidebar navigation unchanged */}
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
        {/* Intro Section with Bullet Points */}
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
              <ul className="text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base mt-3 max-w-3xl mx-auto text-slate-700 list-disc list-inside">
                {intro.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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

        {/* Projects Section with Bullet Points */}
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
                <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700 list-disc list-inside">
                  {project.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Experiences Section with Bullet Points */}
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
                <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700 list-disc list-inside">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Education Section with Bullet Points */}
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
                <ul className="mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-base text-slate-700 list-disc list-inside">
                  {edu.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Skills and Footer sections remain unchanged */}
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
                  <span
                    key={index}
                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-teal-400 flex items-center gap-2"
                  >
                    <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
                    {tool.name}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </div>
        </section>

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

        {/* Global Styles unchanged */}
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