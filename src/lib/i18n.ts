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
    nav: {
      experience: "Expérience",
      projects: "Projets",
      expertise: "Compétences",
      background: "Parcours",
      contact: "Contact",
    },
    switchTo: "English",
    switchLabel: "Lire le site en anglais",
    menu: "Menu",
    closeMenu: "Fermer le menu",
    navLabel: "Navigation principale",
    hero: {
      title: "Du capteur au cloud.",
      lead:
        "Élève-ingénieur en automatique et informatique industrielle à l'UTT. Je travaille sur toute la chaîne d'un système industriel : C embarqué et capteurs, passerelles Modbus et LoRaWAN, infrastructure cloud, supervision et intégration continue.",
      status: "Disponible pour un stage de fin d'études de 6 mois",
      statusDetail: "À partir de janvier 2027, mobilité France entière",
      ctaProjects: "Voir les projets",
      ctaCv: "Télécharger le CV",
      chainLabel: "Les maillons de la chaîne sur lesquels j'ai travaillé",
    },
    experience: {
      title: "Expérience",
      intro:
        "Un an chez Cascadya, en stage puis en CDD, sur une plateforme IoT industrielle déployée de l'équipement jusqu'au cloud.",
      caseStudy: "Lire l'étude de cas",
    },
    projects: {
      title: "Projets",
      intro:
        "Projets professionnels, académiques et personnels, de la carte électronique au déploiement en production.",
      others: "Autres projets",
      read: "Étude de cas",
      period: "Période",
      context: "Contexte",
      domain: "Domaine",
      stack: "Technologies",
    },
    expertise: {
      title: "Compétences",
      intro:
        "Regroupées par domaine d'ingénierie, avec ce que j'y fais concrètement.",
    },
    background: {
      title: "Parcours",
      education: "Formation",
      certifications: "Certifications",
      languages: "Langues",
      involvement: "Engagements",
      interests: "Centres d'intérêt",
    },
    contact: {
      title: "Travaillons ensemble.",
      lead:
        "Je recherche un stage de fin d'études de 6 mois à partir de janvier 2027, à la croisée de l'IoT, du DevOps, de la robotique et des systèmes embarqués.",
      email: "Écrire un email",
      linkedin: "LinkedIn",
      cv: "CV (PDF)",
      location: "Basé à Reims, mobile dans toute la France",
    },
    caseStudy: {
      back: "Tous les projets",
      objective: "Objectif",
      work: "Ce que j'ai réalisé",
      architecture: "Architecture",
      stack: "Technologies",
      notes: "Points techniques",
      figure: "Fig.",
      next: "Projet suivant",
      prev: "Projet précédent",
      scrollHint: "Faire défiler le schéma horizontalement",
    },
    footer: {
      built: "Conçu et développé avec Next.js, TypeScript et Tailwind CSS. Hébergé sur GitHub Pages.",
    },
    notFound: {
      title: "Page introuvable",
      body: "Cette adresse ne correspond à aucune page du site.",
      home: "Retour à l'accueil",
    },
  },
  en: {
    skip: "Skip to content",
    nav: {
      experience: "Experience",
      projects: "Projects",
      expertise: "Expertise",
      background: "Background",
      contact: "Contact",
    },
    switchTo: "Français",
    switchLabel: "Read the site in French",
    menu: "Menu",
    closeMenu: "Close menu",
    navLabel: "Main navigation",
    hero: {
      title: "From sensor to cloud.",
      lead:
        "Final-year engineering student in automation and industrial computing at UTT, France. I work across the whole chain of an industrial system: embedded C and sensors, Modbus and LoRaWAN gateways, cloud infrastructure, monitoring and continuous integration.",
      status: "Available for a 6-month end-of-studies internship",
      statusDetail: "From January 2027, anywhere in France",
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      chainLabel: "The links of the chain I have worked on",
    },
    experience: {
      title: "Experience",
      intro:
        "One year at Cascadya, as an intern and then on a fixed-term contract, on an industrial IoT platform deployed from equipment to cloud.",
      caseStudy: "Read the case study",
    },
    projects: {
      title: "Projects",
      intro:
        "Professional, academic and personal projects, from the circuit board to production deployment.",
      others: "More projects",
      read: "Case study",
      period: "Period",
      context: "Context",
      domain: "Domain",
      stack: "Technologies",
    },
    expertise: {
      title: "Expertise",
      intro: "Grouped by engineering domain, with what I actually do in each.",
    },
    background: {
      title: "Background",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
      involvement: "Involvement",
      interests: "Interests",
    },
    contact: {
      title: "Let's work together.",
      lead:
        "I am looking for a 6-month end-of-studies internship starting January 2027, where IoT, DevOps, robotics and embedded systems meet.",
      email: "Send an email",
      linkedin: "LinkedIn",
      cv: "CV (PDF, French)",
      location: "Based in Reims, open to anywhere in France",
    },
    caseStudy: {
      back: "All projects",
      objective: "Objective",
      work: "What I did",
      architecture: "Architecture",
      stack: "Technologies",
      notes: "Technical notes",
      figure: "Fig.",
      next: "Next project",
      prev: "Previous project",
      scrollHint: "Scroll the diagram horizontally",
    },
    footer: {
      built: "Designed and built with Next.js, TypeScript and Tailwind CSS. Hosted on GitHub Pages.",
    },
    notFound: {
      title: "Page not found",
      body: "This address does not match any page on the site.",
      home: "Back to home",
    },
  },
} as const;

export type UI = (typeof ui)[Locale];
