export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type L<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deployment base path. */
export function asset(path: string) {
  return `${basePath}${path}`;
}

export const ui = {
  fr: {
    skip: "Aller au contenu",
    navLabel: "Navigation principale",
    nav: {
      projects: "Projets",
      expertise: "Domaines",
      experience: "Expérience",
      background: "Parcours",
      contact: "Contact",
    },
    switchTo: "EN",
    switchLabel: "Read this site in English",
    menu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    hero: {
      title: "Je construis des systèmes connectés, du capteur au cloud.",
      lead: "Mahmoud Kchouk, élève-ingénieur à l'UTT. Embarqué, IoT industriel, infrastructure et supervision.",
      ctaProjects: "Voir les projets",
      ctaCv: "Télécharger le CV",
      status: "Disponible pour un stage de 6 mois dès janvier 2027",
      plateTitle: "Plateforme IoT edge-cloud",
      plateMeta: "Cascadya, 2025 – 2026. Le système réel sur lequel j'ai travaillé, en vue simplifiée.",
      plateLink: "Étude de cas",
      plateLive: "Données en circulation",
    },
    capabilities: {
      title: "Toute la chaîne, projet à l'appui.",
      proof: "Vu dans",
    },
    projects: {
      title: "Projets",
      lead: "Des systèmes complets, de la mesure terrain à la mise en production.",
      others: "Autres projets",
      read: "Lire l'étude de cas",
      built: "Ce que j'ai construit",
      stack: "Technologies",
    },
    pid: {
      title: "Modèle interactif",
      caption:
        "Simulation d'un axe du gimbal : un correcteur PID ramène le plateau à l'horizontale. Perturbez-le, ou réglez les gains. Paramètres illustratifs, ce ne sont pas des mesures du prototype.",
      disturb: "Perturber",
      regulation: "Régulation",
      on: "active",
      off: "coupée",
      angle: "Angle du plateau",
      error: "Erreur d'angle, 6 dernières secondes",
      gains: "Gains du correcteur",
      reset: "Réinitialiser",
    },
    experience: {
      title: "Expérience",
      caseStudy: "Étude de cas",
    },
    background: {
      title: "Parcours",
      education: "Formation",
      certifications: "Certifications",
      languages: "Langues",
      involvement: "Engagements",
    },
    contact: {
      title: "Parlons de votre prochain système.",
      lead: "Je cherche un stage de fin d'études de 6 mois à partir de janvier 2027, entre IoT, DevOps, robotique et systèmes embarqués. Partout en France.",
      email: "Écrire un email",
      linkedin: "LinkedIn",
      cv: "CV en PDF",
    },
    caseStudy: {
      back: "Tous les projets",
      period: "Période",
      context: "Contexte",
      domain: "Domaine",
      objective: "Le problème",
      work: "Ce que j'ai construit",
      challenges: "Défis techniques",
      architecture: "Architecture",
      stack: "Technologies",
      figure: "Fig.",
      next: "Projet suivant",
    },
    footer: {
      built: "Conçu et développé avec Next.js et Tailwind CSS.",
      top: "Haut de page",
    },
  },
  en: {
    skip: "Skip to content",
    navLabel: "Main navigation",
    nav: {
      projects: "Projects",
      expertise: "Domains",
      experience: "Experience",
      background: "Background",
      contact: "Contact",
    },
    switchTo: "FR",
    switchLabel: "Lire ce site en français",
    menu: "Open menu",
    closeMenu: "Close menu",
    hero: {
      title: "I build connected systems, from sensor to cloud.",
      lead: "Mahmoud Kchouk, engineering student at UTT, France. Embedded, industrial IoT, infrastructure and monitoring.",
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      status: "Available for a 6-month internship from January 2027",
      plateTitle: "Edge-to-cloud IoT platform",
      plateMeta: "Cascadya, 2025 – 2026. The real system I worked on, simplified.",
      plateLink: "Case study",
      plateLive: "Data in motion",
    },
    capabilities: {
      title: "The whole chain, with projects to show for it.",
      proof: "Seen in",
    },
    projects: {
      title: "Projects",
      lead: "Complete systems, from field measurement to production.",
      others: "More projects",
      read: "Read the case study",
      built: "What I built",
      stack: "Technologies",
    },
    pid: {
      title: "Interactive model",
      caption:
        "A simulation of one gimbal axis: a PID controller brings the platform back to level. Disturb it or tune the gains. Illustrative parameters, not measurements from the prototype.",
      disturb: "Disturb",
      regulation: "Control",
      on: "on",
      off: "off",
      angle: "Platform angle",
      error: "Angle error, last 6 seconds",
      gains: "Controller gains",
      reset: "Reset",
    },
    experience: {
      title: "Experience",
      caseStudy: "Case study",
    },
    background: {
      title: "Background",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
      involvement: "Involvement",
    },
    contact: {
      title: "Let's talk about your next system.",
      lead: "I am looking for a 6-month end-of-studies internship from January 2027, across IoT, DevOps, robotics and embedded systems. Anywhere in France.",
      email: "Send an email",
      linkedin: "LinkedIn",
      cv: "CV as PDF (French)",
    },
    caseStudy: {
      back: "All projects",
      period: "Period",
      context: "Context",
      domain: "Domain",
      objective: "The problem",
      work: "What I built",
      challenges: "Engineering challenges",
      architecture: "Architecture",
      stack: "Technologies",
      figure: "Fig.",
      next: "Next project",
    },
    footer: {
      built: "Designed and built with Next.js and Tailwind CSS.",
      top: "Back to top",
    },
  },
} as const;

export type UI = (typeof ui)[Locale];
