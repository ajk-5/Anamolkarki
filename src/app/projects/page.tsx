"use client";

import { useRef } from "react";
import ProjectsSection from "@/components/ProjectsSection";

type Project = {
  title: string;
  role: string;
  period: string;
  description: string[];
  caseStudyHref?: string;
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
      "Contenu : articles tech, géopolitique, recettes de cocktails (18+), jeux en ligne, outils",
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
      "Surveillance de la consommation d'Ã©nergie",
      "Gestion agile via la mÃ©thode Scrum",
      "Livraison rapide et adaptÃ©e aux besoins",
    ],
  },
  {
    title: "ESIEACCASION : SECOND-HAND MARKETPLACE",
    role: "Chef de projet/DÃ©veloppeur",
    period: "SEPTEMBRE 2023 - FÃ‰VRIER 2024",
    description: [
      "Plateforme en ligne pour articles d'occasion",
      "Technologies : PHP, MySQL, HTML/CSS, modÃ¨le MVC",
      "SystÃ¨me de messagerie pour les Ã©changes",
      "FonctionnalitÃ© d'Ã©valuation pour la confiance",
    ],
  },
  {
    title: "ASTAVOID : JEU DES MINES",
    role: "Chef de projet/DÃ©veloppeur",
    period: "MARS 2023 - JUILLET 2023",
    description: [
      "Jeu interactif sur le web",
      "Technologies : JavaScript, Node.js, HTML, CSS, Nunjucks",
      "ThÃ¨me spatial avec astÃ©roÃ¯des",
      "ExpÃ©rience immersive",
    ],
  },
];

export default function ProjectsPage() {
  const projectsRef = useRef<HTMLDivElement>(null!);

  return (
    <main>
      <ProjectsSection projects={projects} projectsRef={projectsRef} />
    </main>
  );
}
