import type { L } from "@/lib/i18n";

export const profile = {
  name: "Mahmoud Kchouk",
  role: {
    fr: "Élève-ingénieur en automatique et informatique industrielle",
    en: "Engineering student in automation and industrial computing",
  } as L,
  email: "mahmoud.kchouk@utt.fr",
  linkedin: "https://www.linkedin.com/in/mahmoud-kchouk-b07383226/",
  // Set to "https://github.com/mahmoudkchouk" once public repositories are online.
  github: null as string | null,
  cv: "/cv/CV_Mahmoud_Kchouk.pdf",
  siteUrl: "https://mahmoudkchouk.github.io",
};

export type ExperienceItem = {
  company: string;
  location: L;
  title: L;
  contract: L;
  period: L;
  groups: { label: L; items: L<string[]> }[];
  stack: string[];
  caseStudy?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Cascadya",
    location: { fr: "France", en: "France" },
    title: {
      fr: "Assistant ingénieur DevOps, Cloud & Data",
      en: "Assistant DevOps, Cloud & Data Engineer",
    },
    contract: {
      fr: "Stage de 6 mois puis CDD à temps partiel",
      en: "6-month internship, then part-time fixed-term contract",
    },
    period: { fr: "sept. 2025 – août 2026", en: "Sep 2025 – Aug 2026" },
    groups: [
      {
        label: { fr: "Infrastructure IoT edge-cloud", en: "Edge-to-cloud IoT infrastructure" },
        items: {
          fr: [
            "Conception et déploiement sur Scaleway avec Terraform et Ansible : VM Linux, Docker, ThingsBoard, PostgreSQL, InfluxDB et connectivité LoRaWAN, supervisés dans Grafana.",
            "Solution de suivi de la consommation de gaz : capteur et passerelle de collecte, intégrés à la supervision de l'infrastructure.",
          ],
          en: [
            "Designed and deployed on Scaleway with Terraform and Ansible: Linux VMs, Docker, ThingsBoard, PostgreSQL, InfluxDB and LoRaWAN connectivity, monitored in Grafana.",
            "Gas consumption tracking: sensor and collection gateway, integrated into the infrastructure's monitoring.",
          ],
        },
      },
      {
        label: { fr: "Communication avec les équipements", en: "Equipment communication" },
        items: {
          fr: [
            "Simulateurs de télémétrie hot/cold et agents de communication Modbus pour tester et valider les échanges de données avec ThingsBoard.",
          ],
          en: [
            "Hot/cold telemetry simulators and Modbus communication agents to test and validate data exchange with ThingsBoard.",
          ],
        },
      },
      {
        label: { fr: "Déploiement et observabilité", en: "Deployment and observability" },
        items: {
          fr: [
            "Conteneurisation d'une application Node.js/React et déploiement d'une stack d'observabilité (Grafana, Loki, Mimir, Alloy, cAdvisor) ; images publiées sur Scaleway, secrets gérés avec Vault.",
            "Mises en production sur VM Linux avec Docker Compose : versions d'images, sauvegardes PostgreSQL, migrations Alembic, contrôles post-déploiement ; contribution au CI/CD avec GitHub Actions.",
          ],
          en: [
            "Containerised a Node.js/React application and deployed an observability stack (Grafana, Loki, Mimir, Alloy, cAdvisor); images published to Scaleway, secrets managed with Vault.",
            "Production releases on Linux VMs with Docker Compose: image versioning, PostgreSQL backups, Alembic migrations, post-deployment checks; contributed to CI/CD with GitHub Actions.",
          ],
        },
      },
      {
        label: { fr: "Services backend et données", en: "Backend services and data" },
        items: {
          fr: [
            "Développement et fiabilisation de services Python/FastAPI : logique métier, planification de tâches, persistance d'état, verrouillage contre les doublons, fuseaux horaires, contrôles de santé.",
            "Maintenance de pipelines de données énergétiques : ingestion de sources externes, import CSV en Python, diagnostic d'incidents réseau ; tests, revues de code, scripts d'administration et documentation.",
          ],
          en: [
            "Built and hardened Python/FastAPI services: business logic, task scheduling, state persistence, duplicate-run locking, time-zone handling, health checks.",
            "Maintained energy data pipelines: external source ingestion, CSV import in Python, network incident diagnosis; tests, code reviews, admin scripts and documentation.",
          ],
        },
      },
    ],
    stack: [
      "Python", "FastAPI", "Node.js", "React", "Docker", "Terraform", "Ansible", "Scaleway",
      "ThingsBoard", "LoRaWAN", "Modbus", "PostgreSQL", "InfluxDB", "Grafana", "Vault", "GitHub Actions",
    ],
    caseStudy: "plateforme-iot-edge-cloud",
  },
  {
    company: "SOTULUB",
    location: { fr: "Tunisie", en: "Tunisia" },
    title: { fr: "Stage d'initiation informatique", en: "Introductory IT internship" },
    contract: { fr: "Stage", en: "Internship" },
    period: { fr: "janv. – févr. 2022", en: "Jan – Feb 2022" },
    groups: [
      {
        label: { fr: "Développement", en: "Development" },
        items: {
          fr: [
            "Participation au développement de projets informatiques, côté front-end et back-end.",
            "Analyse de dysfonctionnements, recherche des causes racines et amélioration de la fiabilité de systèmes existants.",
          ],
          en: [
            "Took part in front-end and back-end development on internal IT projects.",
            "Analysed malfunctions, traced root causes and helped make existing systems more reliable.",
          ],
        },
      },
    ],
    stack: [],
  },
];

export type Capability = {
  name: L;
  tools: L;
  /** Project slugs that back the claim. */
  proof: string[];
};

export const capabilities: Capability[] = [
  {
    name: { fr: "Systèmes embarqués", en: "Embedded systems" },
    tools: { fr: "C, temps réel, traitement du signal, Linux embarqué", en: "C, real time, signal processing, embedded Linux" },
    proof: ["esp32c6-rfid-iot", "traitement-signal-dspic", "linux-embarque-raspberry-pi"],
  },
  {
    name: { fr: "ESP32 et microcontrôleurs", en: "ESP32 and microcontrollers" },
    tools: { fr: "ESP32-C6 (ESP-IDF), UART, GPIO, dsPIC30F6014, STM32, centrale inertielle, PID", en: "ESP32-C6 (ESP-IDF), UART, GPIO, dsPIC30F6014, STM32, IMU, PID" },
    proof: ["esp32c6-rfid-iot", "gimbal-2-axes-esp32", "traitement-signal-dspic"],
  },
  {
    name: { fr: "Architecture IoT", en: "IoT architecture" },
    tools: { fr: "Modbus TCP, LoRaWAN, MQTT, passerelles edge, ThingsBoard", en: "Modbus TCP, LoRaWAN, MQTT, edge gateways, ThingsBoard" },
    proof: ["plateforme-iot-edge-cloud", "esp32c6-rfid-iot", "nalen"],
  },
  {
    name: { fr: "Infrastructure cloud", en: "Cloud infrastructure" },
    tools: { fr: "Terraform, Ansible, Docker Compose, Scaleway, Vault, GitHub Actions", en: "Terraform, Ansible, Docker Compose, Scaleway, Vault, GitHub Actions" },
    proof: ["plateforme-iot-edge-cloud"],
  },
  {
    name: { fr: "Supervision et observabilité", en: "Monitoring and observability" },
    tools: { fr: "Grafana, Loki, Mimir, Alloy, cAdvisor, InfluxDB, contrôles de santé", en: "Grafana, Loki, Mimir, Alloy, cAdvisor, InfluxDB, health checks" },
    proof: ["plateforme-iot-edge-cloud"],
  },
  {
    name: { fr: "Logiciel industriel et automatisme", en: "Industrial software and automation" },
    tools: { fr: "Python, FastAPI, PostgreSQL, React, ROS, automates Schneider, langage ST", en: "Python, FastAPI, PostgreSQL, React, ROS, Schneider PLCs, Structured Text" },
    proof: ["nalen", "robotique-mobile-ros", "robot-abb-irb120"],
  },
];

export const background = {
  education: [
    {
      school: "Université de Technologie de Troyes (UTT)",
      degree: {
        fr: "Diplôme d'ingénieur, Automatique et informatique industrielle",
        en: "Engineering degree (MSc level), Automation and industrial computing",
      } as L,
      period: "2024 – 2027",
    },
    {
      school: "Lycée du Hainaut, Valenciennes",
      degree: {
        fr: "Classe préparatoire aux grandes écoles, filière TSI",
        en: "Preparatory classes for engineering schools (CPGE), TSI track",
      } as L,
      period: "2022 – 2024",
    },
  ],
  certifications: [
    { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "2026" },
    { name: "Defender for IoT", issuer: "Microsoft Learn", year: "2026" },
    { name: "Linguaskill Business", issuer: "Cambridge", year: "" },
  ],
  languages: {
    fr: [
      { name: "Arabe", level: "langue maternelle" },
      { name: "Français", level: "C1" },
      { name: "Anglais", level: "C1, professionnel" },
    ],
    en: [
      { name: "Arabic", level: "native" },
      { name: "French", level: "C1" },
      { name: "English", level: "C1, professional" },
    ],
  },
  involvement: {
    fr: [
      "Membre de la branche étudiante IEEE",
      "Membre actif de la JCI (Junior Chamber International) Bizerte",
      "Membre du club robotique EISINE",
    ],
    en: [
      "Member of the IEEE Student Branch",
      "Active member of JCI (Junior Chamber International) Bizerte",
      "Member of the EISINE robotics club",
    ],
  },
  interests: {
    fr: "Innovation technologique, robotique, basketball et voyages.",
    en: "Technology and innovation, robotics, basketball and travel.",
  },
};
