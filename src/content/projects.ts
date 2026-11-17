import type { L } from "@/lib/i18n";

export type DiagramNode = {
  id: string;
  label: L;
  sub?: L;
  col: number;
  row: number;
  rowSpan?: number;
  /** "focus" marks the part of the system this project is about. */
  tone?: "default" | "focus" | "muted";
};

export type DiagramEdge = {
  from: string;
  to: string;
  /**
   * "return" draws a feedback path underneath the diagram.
   * "planned" draws a dashed edge with no data packets: a path that exists but has not been run.
   */
  kind?: "flow" | "return" | "planned";
  label?: L;
};

export type Diagram = {
  lanes?: { col: number; label: L }[];
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption: L;
};

export type Project = {
  slug: string;
  title: L;
  summary: L;
  period?: L;
  context?: L;
  domain: L;
  stack: string[];
  objective: L;
  work: L<string[]>;
  /** Engineering problems the project had to handle, stated as in the CV. */
  challenges: L<string[]>;
  diagrams: Diagram[];
  featured?: boolean;
  /** What the showcase visual is: a system diagram or the interactive PID model. */
  showcase?: "diagram" | "pid";
};

const t = (fr: string, en: string): L => ({ fr, en });

export const projects: Project[] = [
  {
    slug: "plateforme-iot-edge-cloud",
    featured: true,
    showcase: "diagram",
    title: t("Plateforme IoT edge-cloud", "Edge-to-cloud IoT platform"),
    summary: t(
      "Infrastructure IoT industrielle sur Scaleway, de la collecte terrain à la supervision Grafana, décrite en code et déployée en production.",
      "Industrial IoT infrastructure on Scaleway, from field data collection to Grafana monitoring, written as code and running in production.",
    ),
    period: t("sept. 2025 – août 2026", "Sep 2025 – Aug 2026"),
    context: t("Cascadya, stage puis CDD", "Cascadya, internship then contract"),
    domain: t("IoT industriel, DevOps, cloud", "Industrial IoT, DevOps, cloud"),
    stack: [
      "Terraform", "Ansible", "Scaleway", "Docker Compose", "ThingsBoard", "LoRaWAN", "Modbus",
      "PostgreSQL", "InfluxDB", "Grafana", "Loki", "Mimir", "Alloy", "Vault", "GitHub Actions", "Python", "FastAPI",
    ],
    objective: t(
      "Mettre en place l'infrastructure qui relie des équipements industriels à une plateforme de supervision dans le cloud, puis la faire vivre en production : déploiements, sauvegardes, observabilité et services métier.",
      "Build the infrastructure that connects industrial equipment to a cloud monitoring platform, then keep it running in production: releases, backups, observability and business services.",
    ),
    work: {
      fr: [
        "Infrastructure décrite en code avec Terraform et Ansible sur Scaleway : VM Linux, Docker, ThingsBoard, PostgreSQL, InfluxDB et connectivité LoRaWAN.",
        "Simulateurs de télémétrie hot/cold et agents Modbus pour tester et valider les échanges de données avec ThingsBoard avant de brancher de vrais équipements.",
        "Suivi de la consommation de gaz : capteur et passerelle de collecte, intégrés à la supervision.",
        "Stack d'observabilité (Grafana, Loki, Mimir, Alloy, cAdvisor) et conteneurisation d'une application Node.js/React ; images publiées sur le registre Scaleway, secrets dans Vault.",
        "Mises en production avec Docker Compose : versions d'images, sauvegardes PostgreSQL, migrations Alembic, contrôles post-déploiement, CI/CD avec GitHub Actions.",
        "Services Python/FastAPI fiabilisés : planification de tâches, persistance d'état, verrou contre les exécutions en double, fuseaux horaires et contrôles de santé.",
      ],
      en: [
        "Infrastructure as code with Terraform and Ansible on Scaleway: Linux VMs, Docker, ThingsBoard, PostgreSQL, InfluxDB and LoRaWAN connectivity.",
        "Hot/cold telemetry simulators and Modbus agents to test and validate data exchange with ThingsBoard before connecting real equipment.",
        "Gas consumption tracking: sensor and collection gateway, integrated into monitoring.",
        "Observability stack (Grafana, Loki, Mimir, Alloy, cAdvisor) and containerisation of a Node.js/React app; images pushed to the Scaleway registry, secrets in Vault.",
        "Production releases with Docker Compose: image versioning, PostgreSQL backups, Alembic migrations, post-deployment checks, CI/CD with GitHub Actions.",
        "Hardened Python/FastAPI services: task scheduling, state persistence, duplicate-run locking, time zones and health checks.",
      ],
    },
    challenges: {
      fr: [
        "Valider les échanges de données avant d'avoir le matériel : simulateurs de télémétrie et agents Modbus.",
        "Mettre en production sans rien perdre : versions d'images, sauvegardes PostgreSQL, migrations Alembic, contrôles après déploiement.",
        "Éviter qu'une tâche planifiée s'exécute deux fois : verrouillage, persistance d'état, fuseaux horaires.",
        "Savoir ce qui se passe en production : métriques, logs et contrôles de santé.",
      ],
      en: [
        "Validating data exchange before the hardware exists: telemetry simulators and Modbus agents.",
        "Shipping to production without losing anything: image versions, PostgreSQL backups, Alembic migrations, post-deployment checks.",
        "Making sure a scheduled job never runs twice: locking, state persistence, time zones.",
        "Knowing what happens in production: metrics, logs and health checks.",
      ],
    },
    diagrams: [
      {
        lanes: [
          { col: 0, label: t("Terrain", "Field") },
          { col: 1, label: t("Edge", "Edge") },
          { col: 2, label: t("Plateforme", "Platform") },
          { col: 3, label: t("Données", "Data") },
          { col: 4, label: t("Supervision", "Monitoring") },
        ],
        cols: 5,
        rows: 3,
        nodes: [
          { id: "gas", col: 0, row: 0, label: t("Capteur de gaz", "Gas sensor"), sub: t("consommation", "consumption") },
          { id: "lora", col: 0, row: 1, label: t("Équipements", "Equipment"), sub: t("LoRaWAN, Modbus", "LoRaWAN, Modbus") },
          { id: "sim", col: 0, row: 2, label: t("Simulateurs", "Simulators"), sub: t("télémétrie hot/cold", "hot/cold telemetry"), tone: "muted" },
          { id: "gw", col: 1, row: 0, rowSpan: 2, label: t("Passerelles", "Gateways"), sub: t("collecte terrain", "field collection") },
          { id: "agents", col: 1, row: 2, label: t("Agents Modbus", "Modbus agents"), sub: t("tests d'échanges", "exchange tests") },
          { id: "tb", col: 2, row: 0, rowSpan: 3, label: t("ThingsBoard", "ThingsBoard"), sub: t("VM Scaleway, Docker", "Scaleway VM, Docker"), tone: "focus" },
          { id: "pg", col: 3, row: 0, label: t("PostgreSQL", "PostgreSQL"), sub: t("base relationnelle", "relational") },
          { id: "influx", col: 3, row: 2, label: t("InfluxDB", "InfluxDB"), sub: t("séries temporelles", "time series") },
          { id: "graf", col: 4, row: 0, rowSpan: 3, label: t("Grafana", "Grafana"), sub: t("tableaux de bord", "dashboards") },
        ],
        edges: [
          { from: "gas", to: "gw" },
          { from: "lora", to: "gw" },
          { from: "sim", to: "agents" },
          { from: "gw", to: "tb" },
          { from: "agents", to: "tb" },
          { from: "tb", to: "pg" },
          { from: "tb", to: "influx" },
          { from: "pg", to: "graf" },
          { from: "influx", to: "graf" },
        ],
        caption: t(
          "Chaîne de données de la plateforme, vue simplifiée. Les services hébergés tournent sur des VM Linux Scaleway, déployées avec Terraform et Ansible.",
          "The platform's data path, simplified. Hosted services run on Scaleway Linux VMs, provisioned with Terraform and Ansible.",
        ),
      },
      {
        cols: 5,
        rows: 2,
        nodes: [
          { id: "gha", col: 0, row: 0, label: t("GitHub Actions", "GitHub Actions"), sub: t("CI/CD", "CI/CD") },
          { id: "iac", col: 0, row: 1, label: t("Terraform, Ansible", "Terraform, Ansible"), sub: t("provisionnement", "provisioning") },
          { id: "reg", col: 1, row: 0, label: t("Registre Scaleway", "Scaleway registry"), sub: t("images Docker", "Docker images") },
          { id: "vault", col: 1, row: 1, label: t("Vault", "Vault"), sub: t("secrets", "secrets") },
          { id: "vm", col: 2, row: 0, rowSpan: 2, label: t("VM Linux", "Linux VM"), sub: t("Docker Compose", "Docker Compose"), tone: "focus" },
          { id: "apps", col: 3, row: 0, label: t("Services", "Services"), sub: t("FastAPI, Node.js/React", "FastAPI, Node.js/React") },
          { id: "collect", col: 3, row: 1, label: t("Alloy, cAdvisor", "Alloy, cAdvisor"), sub: t("collecte", "collection") },
          { id: "obs", col: 4, row: 1, label: t("Loki, Mimir, Grafana", "Loki, Mimir, Grafana"), sub: t("logs et métriques", "logs and metrics") },
        ],
        edges: [
          { from: "gha", to: "reg" },
          { from: "reg", to: "vm" },
          { from: "iac", to: "vm" },
          { from: "vault", to: "vm" },
          { from: "vm", to: "apps" },
          { from: "vm", to: "collect" },
          { from: "collect", to: "obs" },
        ],
        caption: t(
          "Déploiement et observabilité, vue d'ensemble simplifiée.",
          "Deployment and observability, simplified overview.",
        ),
      },
    ],
  },
  {
    slug: "esp32c6-rfid-iot",
    featured: true,
    showcase: "diagram",
    title: t("Lecteur RFID UHF connecté sur ESP32-C6", "Connected UHF RFID reader on ESP32-C6"),
    summary: t(
      "Chaîne d'acquisition IoT complète : lecture de tags RFID UHF en UART, publication MQTT en Wi-Fi depuis un ESP32-C6, stockage MariaDB sur Raspberry Pi.",
      "A complete IoT acquisition chain: UHF RFID tags read over UART, published over Wi-Fi with MQTT from an ESP32-C6, stored in MariaDB on a Raspberry Pi.",
    ),
    period: t("octobre 2026", "October 2026"),
    context: t("Projet académique UTT (EB03)", "UTT academic project (EB03)"),
    domain: t("Systèmes embarqués, IoT", "Embedded systems, IoT"),
    stack: ["ESP32-C6", "C", "ESP-IDF", "UART", "Wi-Fi", "MQTT", "Mosquitto", "Python", "paho-mqtt", "PyMySQL", "MariaDB", "Raspberry Pi"],
    objective: t(
      "Lire automatiquement les identifiants de tags RFID UHF, les transmettre par Wi-Fi depuis un microcontrôleur et les enregistrer dans une base de données, sans intervention.",
      "Automatically read UHF RFID tag identifiers, send them over Wi-Fi from a microcontroller and store them in a database, with no manual step.",
    ),
    work: {
      fr: [
        "Firmware en C sous ESP-IDF : UART1 à 115200 bauds 8N1, GPIO6 en TX vers le lecteur et GPIO7 en RX depuis le lecteur.",
        "Envoi de la commande d'activation du lecteur (trame 53 06 01 02 4F 34), réception et reconstitution des trames série, vérification des données et extraction des identifiants.",
        "Connexion Wi-Fi et publication des identifiants en MQTT sur le topic eb03/rfid/tag, en QoS 1.",
        "Broker Mosquitto sur Raspberry Pi (port 1883) et subscriber Python (paho-mqtt, PyMySQL) qui enregistre chaque tag dans MariaDB, table tags_rfid horodatée.",
        "Première version en HTTP POST vers un script PHP, puis migration vers une architecture MQTT.",
      ],
      en: [
        "C firmware on ESP-IDF: UART1 at 115200 baud 8N1, GPIO6 as TX to the reader and GPIO7 as RX from the reader.",
        "Sends the reader's activation command (frame 53 06 01 02 4F 34), receives and reassembles serial frames, checks the data and extracts tag identifiers.",
        "Wi-Fi connection and MQTT publication of identifiers on topic eb03/rfid/tag at QoS 1.",
        "Mosquitto broker on a Raspberry Pi (port 1883) and a Python subscriber (paho-mqtt, PyMySQL) that stores each tag in MariaDB, in a timestamped tags_rfid table.",
        "First version used HTTP POST to a PHP script, then migrated to an MQTT architecture.",
      ],
    },
    challenges: {
      fr: [
        "Un lecteur RFID muet au départ : vérification des GPIO, du croisement TX/RX, du débit et des commandes envoyées.",
        "Décoder le protocole du lecteur octet par octet, gérer les trames reçues en plusieurs fragments et contrôler leur intégrité.",
        "Mise en route ESP-IDF : flash USB, ports série et écart entre la taille de flash configurée et celle détectée.",
        "Migrer de HTTP vers MQTT et valider publication et réception : acquittements PUBACK observés.",
        "Valider chaque maillon un par un, de la lecture RFID jusqu'à l'enregistrement en base.",
      ],
      en: [
        "A silent RFID reader at first: checked GPIOs, TX/RX crossover, baud rate and the commands being sent.",
        "Decoding the reader's protocol byte by byte, handling frames that arrive in several fragments and checking their integrity.",
        "Getting ESP-IDF running: USB flashing, serial ports and a mismatch between configured and detected flash size.",
        "Moving from HTTP to MQTT and validating publish and receive: PUBACK acknowledgements observed.",
        "Validating every link one by one, from RFID read to database insert.",
      ],
    },
    diagrams: [
      {
        lanes: [
          { col: 0, label: t("Terrain", "Field") },
          { col: 2, label: t("Microcontrôleur", "Microcontroller") },
          { col: 3, label: t("Raspberry Pi", "Raspberry Pi") },
        ],
        cols: 6,
        rows: 1,
        nodes: [
          { id: "tag", col: 0, row: 0, label: t("Tag RFID UHF", "UHF RFID tag"), tone: "muted" },
          { id: "reader", col: 1, row: 0, label: t("Lecteur RFID", "RFID reader"), sub: t("antenne UHF", "UHF antenna") },
          { id: "esp", col: 2, row: 0, label: t("ESP32-C6", "ESP32-C6"), sub: t("UART in, Wi-Fi out", "UART in, Wi-Fi out"), tone: "focus" },
          { id: "broker", col: 3, row: 0, label: t("Mosquitto", "Mosquitto"), sub: t("MQTT, QoS 1", "MQTT, QoS 1") },
          { id: "sub", col: 4, row: 0, label: t("Subscriber", "Subscriber"), sub: t("Python, paho-mqtt", "Python, paho-mqtt") },
          { id: "db", col: 5, row: 0, label: t("MariaDB", "MariaDB"), sub: t("table tags_rfid", "tags_rfid table") },
        ],
        edges: [
          { from: "tag", to: "reader" },
          { from: "reader", to: "esp" },
          { from: "esp", to: "broker" },
          { from: "broker", to: "sub" },
          { from: "sub", to: "db" },
        ],
        caption: t(
          "Le lecteur parle en UART à l'ESP32-C6, qui publie en Wi-Fi/MQTT vers le broker du Raspberry Pi ; le subscriber Python écrit dans MariaDB.",
          "The reader talks UART to the ESP32-C6, which publishes over Wi-Fi/MQTT to the Raspberry Pi broker; the Python subscriber writes to MariaDB.",
        ),
      },
    ],
  },
  {
    slug: "nalen",
    featured: true,
    showcase: "diagram",
    title: t("NALEN, monitoring énergétique industriel", "NALEN, industrial energy monitoring"),
    summary: t(
      "Prototype de chaîne complète de collecte Modbus TCP qui détecte les dérives de consommation, les chiffre en kWh et en estime l'impact financier.",
      "End-to-end Modbus TCP collection prototype that detects consumption drift, quantifies it in kWh and estimates its financial impact.",
    ),
    period: t("septembre 2026", "September 2026"),
    context: t("Prototype", "Prototype"),
    domain: t("Énergie, IoT industriel", "Energy, industrial IoT"),
    stack: ["Modbus TCP", "Edge", "API", "React"],
    objective: t(
      "Repérer automatiquement une consommation d'énergie qui dérive par rapport à la normale et la rendre parlante pour un exploitant : combien de kWh, et combien d'euros.",
      "Automatically spot energy consumption drifting away from normal and make it meaningful for an operator: how many kWh, and how many euros.",
    ),
    work: {
      fr: [
        "Chaîne complète construite de bout en bout : passerelle edge de collecte Modbus TCP, API, base de données et interface React.",
        "Détection des dérives de consommation, chiffrage en kWh et estimation de l'impact financier.",
        "Validation sur données simulées.",
      ],
      en: [
        "Built the whole chain end to end: Modbus TCP edge collection gateway, API, database and React interface.",
        "Consumption drift detection, quantified in kWh with an estimate of the financial impact.",
        "Validated on simulated data.",
      ],
    },
    challenges: {
      fr: [
        "Passer d'une mesure brute à une information utile : la dérive, son volume en kWh et son coût.",
        "Construire et valider toute la chaîne sans site réel, sur données simulées.",
      ],
      en: [
        "Turning raw readings into something useful: the drift, its size in kWh and its cost.",
        "Building and validating the whole chain without a real site, on simulated data.",
      ],
    },
    diagrams: [
      {
        cols: 4,
        rows: 2,
        nodes: [
          { id: "dev", col: 0, row: 0, rowSpan: 2, label: t("Compteurs simulés", "Simulated meters"), sub: t("Modbus TCP", "Modbus TCP"), tone: "muted" },
          { id: "gw", col: 1, row: 0, rowSpan: 2, label: t("Passerelle edge", "Edge gateway"), sub: t("collecte", "collection") },
          { id: "api", col: 2, row: 0, rowSpan: 2, label: t("API", "API"), sub: t("dérives, kWh, coût", "drift, kWh, cost"), tone: "focus" },
          { id: "db", col: 3, row: 0, label: t("Base de données", "Database"), sub: t("mesures", "measurements") },
          { id: "ui", col: 3, row: 1, label: t("Interface React", "React interface"), sub: t("exploitant", "operator") },
        ],
        edges: [
          { from: "dev", to: "gw" },
          { from: "gw", to: "api" },
          { from: "api", to: "db" },
          { from: "api", to: "ui" },
        ],
        caption: t(
          "Architecture du prototype, validé sur données simulées.",
          "Prototype architecture, validated on simulated data.",
        ),
      },
    ],
  },
  {
    slug: "gimbal-2-axes-esp32",
    featured: true,
    showcase: "pid",
    title: t("Gimbal 2 axes sur ESP32-C6", "2-axis gimbal on ESP32-C6"),
    summary: t(
      "Stabilisation d'orientation sur deux axes avec une centrale inertielle 6 axes et une commande PID temps réel.",
      "Two-axis orientation stabilisation with a 6-axis IMU and real-time PID control.",
    ),
    period: t("juin 2026", "June 2026"),
    domain: t("Systèmes embarqués, automatique", "Embedded systems, control"),
    stack: ["ESP32-C6", "C", "IMU", "PID"],
    objective: t(
      "Maintenir l'orientation d'une charge sur deux axes malgré les mouvements du support, en boucle fermée sur un microcontrôleur.",
      "Hold a payload's orientation on two axes despite movement of its base, in a closed loop running on a microcontroller.",
    ),
    work: {
      fr: [
        "Intégration d'une centrale inertielle 6 axes (accéléromètre et gyroscope) sur ESP32-C6.",
        "Commande PID temps réel pour stabiliser l'orientation sur chacun des deux axes.",
      ],
      en: [
        "Integrated a 6-axis IMU (accelerometer and gyroscope) with an ESP32-C6.",
        "Real-time PID control to stabilise orientation on each of the two axes.",
      ],
    },
    challenges: {
      fr: [
        "Tenir une boucle de régulation temps réel sur un microcontrôleur.",
        "Exploiter les mesures d'une centrale inertielle 6 axes pour connaître l'orientation.",
      ],
      en: [
        "Holding a real-time control loop on a microcontroller.",
        "Using a 6-axis IMU's readings to know the orientation.",
      ],
    },
    diagrams: [
      {
        cols: 4,
        rows: 2,
        nodes: [
          { id: "imu", col: 0, row: 0, rowSpan: 2, label: t("IMU 6 axes", "6-axis IMU"), sub: t("orientation mesurée", "measured orientation") },
          { id: "mcu", col: 1, row: 0, rowSpan: 2, label: t("ESP32-C6", "ESP32-C6"), sub: t("boucle temps réel", "real-time loop"), tone: "focus" },
          { id: "pid1", col: 2, row: 0, label: t("PID axe 1", "PID axis 1") },
          { id: "pid2", col: 2, row: 1, label: t("PID axe 2", "PID axis 2") },
          { id: "act1", col: 3, row: 0, label: t("Actionneur axe 1", "Axis 1 actuator") },
          { id: "act2", col: 3, row: 1, label: t("Actionneur axe 2", "Axis 2 actuator") },
        ],
        edges: [
          { from: "imu", to: "mcu" },
          { from: "mcu", to: "pid1" },
          { from: "mcu", to: "pid2" },
          { from: "pid1", to: "act1" },
          { from: "pid2", to: "act2" },
          { from: "act2", to: "imu", kind: "return", label: t("retour mécanique", "mechanical feedback") },
        ],
        caption: t("Boucle de stabilisation, un correcteur par axe.", "Stabilisation loop, one controller per axis."),
      },
    ],
  },
  {
    slug: "robotique-mobile-ros",
    title: t("Robotique mobile avec ROS", "Mobile robotics with ROS"),
    summary: t(
      "Nodes Python pour piloter un TurtleBot3, puis navigation et SLAM en simulation sous Gazebo.",
      "Python nodes to drive a TurtleBot3, then navigation and SLAM in Gazebo simulation.",
    ),
    context: t("Projet académique", "Academic project"),
    domain: t("Robotique", "Robotics"),
    stack: ["ROS Noetic", "Python", "Gazebo", "TurtleBot3", "SLAM"],
    objective: t(
      "Comprendre et mettre en œuvre la pile logicielle d'un robot mobile : lire ses capteurs, le commander, cartographier son environnement et y naviguer.",
      "Understand and implement a mobile robot's software stack: read its sensors, command it, map its surroundings and navigate them.",
    ),
    work: {
      fr: [
        "Nodes Python : publishers, subscribers, services et launch files.",
        "Exploitation des topics /scan (lidar), /odom (odométrie) et /cmd_vel (commande de vitesse).",
        "Navigation et SLAM en simulation sous Gazebo.",
      ],
      en: [
        "Python nodes: publishers, subscribers, services and launch files.",
        "Worked with the /scan (lidar), /odom (odometry) and /cmd_vel (velocity command) topics.",
        "Navigation and SLAM in Gazebo simulation.",
      ],
    },
    challenges: {
      fr: [
        "Organiser le logiciel du robot en nodes qui communiquent par topics et services.",
        "Cartographier l'environnement et y naviguer (SLAM) en simulation.",
      ],
      en: [
        "Structuring the robot's software as nodes talking through topics and services.",
        "Mapping the environment and navigating it (SLAM) in simulation.",
      ],
    },
    diagrams: [
      {
        cols: 4,
        rows: 2,
        nodes: [
          { id: "sim", col: 0, row: 0, rowSpan: 2, label: t("Gazebo", "Gazebo"), sub: t("TurtleBot3 simulé", "simulated TurtleBot3"), tone: "muted" },
          { id: "scan", col: 1, row: 0, label: t("/scan", "/scan"), sub: t("lidar", "lidar") },
          { id: "odom", col: 1, row: 1, label: t("/odom", "/odom"), sub: t("odométrie", "odometry") },
          { id: "nodes", col: 2, row: 0, label: t("Nodes Python", "Python nodes"), sub: t("pub/sub, services", "pub/sub, services"), tone: "focus" },
          { id: "slam", col: 2, row: 1, label: t("SLAM, navigation", "SLAM, navigation") },
          { id: "cmd", col: 3, row: 0, rowSpan: 2, label: t("/cmd_vel", "/cmd_vel"), sub: t("commande de vitesse", "velocity command") },
        ],
        edges: [
          { from: "sim", to: "scan" },
          { from: "sim", to: "odom" },
          { from: "scan", to: "nodes" },
          { from: "odom", to: "slam" },
          { from: "nodes", to: "cmd" },
          { from: "slam", to: "cmd" },
          { from: "cmd", to: "sim", kind: "return", label: t("le robot se déplace", "the robot moves") },
        ],
        caption: t("Topics ROS échangés avec le robot simulé.", "ROS topics exchanged with the simulated robot."),
      },
    ],
  },
  {
    slug: "traitement-signal-dspic",
    title: t("Traitement du signal sur dsPIC", "Signal processing on dsPIC"),
    summary: t(
      "Acquisition à 8 kHz et filtrage FIR/DFT en C embarqué sur dsPIC30F6014 avec le codec SI3000.",
      "8 kHz acquisition and FIR/DFT filtering in embedded C on a dsPIC30F6014 with the SI3000 codec.",
    ),
    period: t("mai 2026", "May 2026"),
    domain: t("Systèmes embarqués, traitement du signal", "Embedded systems, signal processing"),
    stack: ["dsPIC30F6014", "SI3000", "C", "FIR", "DFT", "PWM", "ADC", "UART"],
    objective: t(
      "Acquérir et traiter un signal en temps réel sur un DSP, avec les contraintes d'une cadence d'échantillonnage fixe.",
      "Acquire and process a signal in real time on a DSP, within the constraints of a fixed sampling rate.",
    ),
    work: {
      fr: [
        "Acquisition et traitement du signal à 8 kHz avec le codec SI3000.",
        "Filtres FIR et calcul de DFT en C embarqué.",
        "Mise en œuvre des périphériques PWM, ADC et UART du dsPIC.",
      ],
      en: [
        "Signal acquisition and processing at 8 kHz with the SI3000 codec.",
        "FIR filters and DFT computation in embedded C.",
        "Used the dsPIC's PWM, ADC and UART peripherals.",
      ],
    },
    challenges: {
      fr: [
        "Traiter chaque échantillon dans le temps imposé par une cadence fixe de 8 kHz.",
        "Implémenter des filtres FIR et une DFT en C embarqué.",
      ],
      en: [
        "Processing every sample within the time set by a fixed 8 kHz rate.",
        "Implementing FIR filters and a DFT in embedded C.",
      ],
    },
    diagrams: [
      {
        cols: 4,
        rows: 2,
        nodes: [
          { id: "in", col: 0, row: 0, rowSpan: 2, label: t("Signal d'entrée", "Input signal"), tone: "muted" },
          { id: "codec", col: 1, row: 0, rowSpan: 2, label: t("Codec SI3000", "SI3000 codec"), sub: t("échantillonnage 8 kHz", "8 kHz sampling") },
          { id: "dsp", col: 2, row: 0, rowSpan: 2, label: t("dsPIC30F6014", "dsPIC30F6014"), sub: t("FIR, DFT en C", "FIR, DFT in C"), tone: "focus" },
          { id: "uart", col: 3, row: 0, label: t("UART", "UART"), sub: t("liaison série", "serial link") },
          { id: "pwm", col: 3, row: 1, label: t("PWM", "PWM"), sub: t("sortie", "output") },
        ],
        edges: [
          { from: "in", to: "codec" },
          { from: "codec", to: "dsp" },
          { from: "dsp", to: "uart" },
          { from: "dsp", to: "pwm" },
        ],
        caption: t("Chaîne d'acquisition et de traitement.", "Acquisition and processing chain."),
      },
    ],
  },
  {
    slug: "linux-embarque-raspberry-pi",
    title: t("Modules noyau Linux sur Raspberry Pi", "Linux kernel modules on Raspberry Pi"),
    summary: t(
      "Développement de modules noyau pour piloter des GPIO et étude des contraintes temps réel.",
      "Kernel modules to drive GPIOs and a study of real-time constraints.",
    ),
    period: t("avril 2026", "April 2026"),
    domain: t("Linux embarqué", "Embedded Linux"),
    stack: ["Raspberry Pi", "Linux", "C", "GPIO"],
    objective: t(
      "Accéder au matériel depuis le noyau Linux plutôt que depuis l'espace utilisateur, et mesurer ce que cela change pour le temps réel.",
      "Reach the hardware from inside the Linux kernel rather than user space, and see what that changes for real-time behaviour.",
    ),
    work: {
      fr: [
        "Modules noyau en C pour le contrôle des GPIO du Raspberry Pi.",
        "Étude des contraintes temps réel sous Linux.",
      ],
      en: [
        "C kernel modules to control the Raspberry Pi's GPIOs.",
        "Study of real-time constraints on Linux.",
      ],
    },
    challenges: {
      fr: [
        "Écrire du code qui s'exécute dans le noyau plutôt qu'en espace utilisateur.",
        "Comprendre les limites temps réel d'un Linux standard.",
      ],
      en: [
        "Writing code that runs inside the kernel rather than in user space.",
        "Understanding the real-time limits of a standard Linux.",
      ],
    },
    diagrams: [
      {
        lanes: [
          { col: 0, label: t("Noyau Linux", "Linux kernel") },
          { col: 1, label: t("Matériel", "Hardware") },
        ],
        cols: 2,
        rows: 1,
        nodes: [
          { id: "mod", col: 0, row: 0, label: t("Module noyau", "Kernel module"), sub: t("C", "C"), tone: "focus" },
          { id: "gpio", col: 1, row: 0, label: t("GPIO", "GPIO"), sub: t("Raspberry Pi", "Raspberry Pi") },
        ],
        edges: [{ from: "mod", to: "gpio" }],
        caption: t("Le module pilote les GPIO depuis le noyau.", "The module drives the GPIOs from inside the kernel."),
      },
    ],
  },
  {
    slug: "robot-abb-irb120",
    title: t("Programmation du robot ABB IRB120", "Programming the ABB IRB120 robot"),
    summary: t(
      "Repères de travail, points et trajectoires d'un bras industriel, validés en simulation dans RobotStudio.",
      "Work frames, targets and paths for an industrial arm, validated in RobotStudio simulation.",
    ),
    period: t("juin 2026", "June 2026"),
    domain: t("Robotique industrielle", "Industrial robotics"),
    stack: ["ABB IRB120", "RobotStudio"],
    objective: t(
      "Préparer le programme d'un bras robotique industriel et vérifier ses mouvements en simulation avant de passer sur le robot.",
      "Prepare an industrial robot arm's program and check its motion in simulation before moving to the real robot.",
    ),
    work: {
      fr: [
        "Définition des repères de travail, des points et des trajectoires.",
        "Validation des mouvements du robot en simulation dans RobotStudio.",
      ],
      en: [
        "Defined work frames, targets and paths.",
        "Validated the robot's motion in RobotStudio simulation.",
      ],
    },
    challenges: {
      fr: [
        "Définir les repères de travail dont dépendent tous les points et trajectoires.",
        "Valider les mouvements du robot en simulation.",
      ],
      en: [
        "Defining the work frames every target and path depends on.",
        "Validating the robot's motion in simulation.",
      ],
    },
    diagrams: [],
  },
  {
    slug: "fx-agents",
    title: t("FX Agents", "FX Agents"),
    summary: t(
      "Système multi-agents de recherche sur EUR/USD : des agents à règles proposent, un moteur de risque déterministe décide, le tout testé en walk-forward sans information du futur.",
      "A multi-agent research system for EUR/USD: rule-based agents propose, a deterministic risk engine decides, all tested walk-forward with no look-ahead.",
    ),
    period: t("octobre 2026", "October 2026"),
    context: t("Projet personnel", "Personal project"),
    domain: t("Systèmes multi-agents, données de marché", "Multi-agent systems, market data"),
    stack: ["Python", "pandas", "NumPy", "pytest", "OANDA v20 REST", "Dukascopy"],
    objective: t(
      "Apprendre à concevoir un système multi-agents et à piloter des agents de codage IA, sur un problème où l'erreur est facile : décider d'un trade EUR/USD sans jamais utiliser d'information du futur, en laissant le dernier mot à un contrôle de risque écrit en code simple.",
      "Learn to design a multi-agent system and to direct AI coding agents, on a problem where mistakes come easily: deciding an EUR/USD trade without ever using information from the future, with the final say left to a risk check written in plain code.",
    ),
    work: {
      fr: [
        "Conçu et développé avec l'aide d'agents de codage IA. J'ai défini l'architecture, les spécifications et les protocoles de test anti-fuite, écrit une partie importante du code, relu les audits et pris les décisions GO/NO-GO.",
        "Comité de cinq agents à règles (tendance multi-unités de temps, ICT/SMC simplifié, régime de marché, fondamental, annonces) : débat haussier/baissier, puis un contradicteur cherche les objections avant toute proposition avec stop et objectif.",
        "Moteur de risque déterministe qui a toujours le dernier mot : 0,25 % de risque par trade, limites de perte journalière et de drawdown, spread maximal, deux entrées par jour, blocage autour des annonces importantes. Un LLM peut, en option, seulement confirmer ou rejeter une proposition.",
        "Données : historique EUR/USD Dukascopy décodé depuis son format binaire, cours Bid et Ask appariés heure par heure (26 481 bougies H1, de janvier 2018 à mars 2022), empreintes SHA-256 et rapport qualité.",
        "Recherche : six stratégies et un routeur par régime de marché, plus une régression logistique écrite en NumPy, comparés en walk-forward sur trois fenêtres de six mois dans un simulateur Bid/Ask (spread observé, slippage, gaps).",
        "Résultat : le modèle appris ne bat pas une référence constante sur les périodes de test. La chaîne fonctionne, mais aucun avantage n'est démontré.",
        "Vérifié par une suite de 334 tests pytest et par des backtests. L'exécution sur compte démo OANDA, seul mode autorisé par le code, n'a pas encore été lancée.",
      ],
      en: [
        "Designed and built with the help of AI coding agents. I defined the architecture, specifications and leak-proof test protocols, wrote a significant part of the code, reviewed the audits and made the GO/NO-GO decisions.",
        "A committee of five rule-based agents (multi-timeframe trend, simplified ICT/SMC, market regime, fundamentals, news): a bull/bear debate, then a challenger looks for objections before any proposal with a stop and a target.",
        "A deterministic risk engine that always has the final say: 0.25% risk per trade, daily loss and drawdown limits, maximum spread, two entries a day, a block around major announcements. An optional LLM can only confirm or reject a proposal.",
        "Data: Dukascopy EUR/USD history decoded from its binary format, Bid and Ask quotes paired hour by hour (26,481 H1 candles, January 2018 to March 2022), SHA-256 fingerprints and a quality report.",
        "Research: six strategies and a market-regime router, plus a logistic regression written in NumPy, compared walk-forward over three six-month windows in a Bid/Ask simulator (observed spread, slippage, gaps).",
        "Result: the learned model does not beat a constant baseline on the test periods. The pipeline works, but no edge is demonstrated.",
        "Checked by a suite of 334 pytest tests and by backtests. Execution on an OANDA practice account, the only mode the code allows, has not been run yet.",
      ],
    },
    challenges: {
      fr: [
        "Ne jamais utiliser d'information du futur : indicateurs H4 et D1 pris à la clôture de leur bougie, normalisation ajustée sur l'entraînement seul, labels purgés aux frontières des fenêtres.",
        "Garder une période de validation finale intacte : les prix de 2024 et après sont écartés d'après leur date, avant même la lecture de leur valeur.",
        "Simuler l'exécution sans s'avantager : achat à l'Ask, vente au Bid, gaps à travers le stop, stop retenu en premier quand une bougie touche les deux niveaux.",
        "Télécharger l'historique sans se faire bloquer : requêtes espacées, refus HTTP 429 respectés, cache reprenable. Les données de 2022 à 2025 restent incomplètes.",
        "Rendre l'envoi d'ordres sûr : un ordre n'est jamais renvoyé automatiquement, et une issue incertaine bloque les entrées suivantes jusqu'à vérification.",
        "Encadrer des agents de codage IA : missions écrites, périmètres de fichiers séparés, audits indépendants. Ce que j'en retiens : ils ne sont fiables qu'encadrés par des spécifications précises, des tests et des audits.",
      ],
      en: [
        "Never using information from the future: H4 and D1 indicators taken at their candle's close, scaling fitted on training data only, labels purged at window boundaries.",
        "Keeping a final validation period untouched: prices from 2024 onwards are dropped by their date, before their values are even read.",
        "Simulating execution without flattering it: buy at the Ask, sell at the Bid, gaps through the stop, stop assumed first when a candle touches both levels.",
        "Downloading the history without getting blocked: spaced requests, HTTP 429 refusals honoured, a resumable cache. Data for 2022 to 2025 is still incomplete.",
        "Making order submission safe: an order is never resent automatically, and an uncertain outcome blocks further entries until it is checked.",
        "Directing AI coding agents: written briefs, separate file scopes, independent audits. My takeaway: they are only reliable when framed by precise specifications, tests and audits.",
      ],
    },
    diagrams: [
      {
        lanes: [
          { col: 0, label: t("Marché", "Market") },
          { col: 1, label: t("Analyse", "Analysis") },
          { col: 2, label: t("Propositions", "Proposals") },
          { col: 3, label: t("Contrôle", "Control") },
          { col: 4, label: t("Exécution", "Execution") },
        ],
        cols: 5,
        rows: 3,
        nodes: [
          { id: "data", col: 0, row: 0, rowSpan: 3, label: t("Dukascopy", "Dukascopy"), sub: t("Bid/Ask H1", "Bid/Ask H1") },
          { id: "feat", col: 1, row: 0, rowSpan: 3, label: t("Indicateurs", "Indicators"), sub: t("H1, H4, D1 causaux", "causal H1, H4, D1") },
          { id: "committee", col: 2, row: 0, label: t("Comité d'agents", "Agent committee"), sub: t("5 analystes", "5 analysts") },
          { id: "strategies", col: 2, row: 1, label: t("6 stratégies", "6 strategies"), sub: t("selon le régime", "by market regime") },
          { id: "model", col: 2, row: 2, label: t("Modèle appris", "Learned model"), sub: t("classifieur NumPy", "NumPy classifier") },
          { id: "risk", col: 3, row: 0, rowSpan: 3, label: t("Moteur de risque", "Risk engine"), sub: t("code, dernier mot", "plain code, final say"), tone: "focus" },
          { id: "sim", col: 4, row: 0, rowSpan: 2, label: t("Simulation", "Simulation"), sub: t("backtests, walk-forward", "backtests, walk-forward") },
          { id: "oanda", col: 4, row: 2, label: t("OANDA démo", "OANDA practice"), sub: t("pas encore lancé", "not run yet"), tone: "muted" },
        ],
        edges: [
          { from: "data", to: "feat" },
          { from: "feat", to: "committee" },
          { from: "feat", to: "strategies" },
          { from: "feat", to: "model" },
          { from: "committee", to: "risk" },
          { from: "strategies", to: "risk" },
          { from: "model", to: "risk" },
          { from: "risk", to: "sim" },
          { from: "risk", to: "oanda", kind: "planned" },
        ],
        caption: t(
          "Toute proposition passe par le même moteur de risque. En pointillés : l'exécution sur compte démo OANDA, présente dans le code mais pas encore lancée.",
          "Every proposal goes through the same risk engine. Dashed: execution on an OANDA practice account, present in the code but not run yet.",
        ),
      },
      {
        cols: 4,
        rows: 1,
        nodes: [
          { id: "train", col: 0, row: 0, label: t("Entraînement", "Training"), sub: t("fenêtre croissante", "expanding window") },
          { id: "val", col: 1, row: 0, label: t("Validation", "Validation"), sub: t("6 mois, réglages", "6 months, tuning") },
          { id: "test", col: 2, row: 0, label: t("Test", "Test"), sub: t("6 mois suivants", "next 6 months") },
          { id: "held", col: 3, row: 0, label: t("2024 et après", "2024 onwards"), sub: t("exclu des calculs", "excluded from all runs"), tone: "muted" },
        ],
        edges: [
          { from: "train", to: "val" },
          { from: "val", to: "test" },
          { from: "test", to: "train", kind: "return", label: t("fenêtre suivante, 3 au total", "next window, 3 in total") },
        ],
        caption: t(
          "Walk-forward : entraînement sur tout le passé, réglage sur les 6 mois suivants, test sur les 6 d'après, trois fois. La période à partir de 2024 reste réservée.",
          "Walk-forward: train on all past data, tune on the next 6 months, test on the 6 after that, three times over. Everything from 2024 onwards stays held out.",
        ),
      },
    ],
  },
];

export const heroDiagram = projects[0].diagrams[0];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
