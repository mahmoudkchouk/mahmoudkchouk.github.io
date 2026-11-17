# CLAUDE.md

Contexte pour les sessions Claude Code sur ce dépôt. Lire aussi `PRODUCT.md` (cible et règles produit) et `README.md` (modifier le contenu).

## Propriétaire

Mahmoud Kchouk, élève-ingénieur en dernière année à l'UTT (Automatique et Informatique Industrielle). Cherche un stage de fin d'études de 6 mois dès janvier ou février 2027 (IoT, DevOps, robotique, systèmes embarqués), partout en France.

- Email public : mahmoud.kchouk@utt.fr
- LinkedIn : https://www.linkedin.com/in/mahmoud-kchouk-b07383226/
- GitHub : mahmoudkchouk

## Projet

Portfolio en ligne sur https://mahmoudkchouk.github.io, bilingue FR/EN (routes `/fr` et `/en`).

- Stack : Next.js (App Router, export statique), TypeScript, Tailwind CSS 4, Motion, Lucide.
- Déploiement automatique par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`, en environ 2 minutes.
- Vérifier avant tout commit : `npm run lint` (tsc) et `npm run build`. Contrôler visuellement avec `npm run dev`, en desktop et à 390 px, sans débordement horizontal.

## Où sont les choses

- `src/content/projects.ts` : tous les projets (slug, title, summary, period, context, domain, stack, objective, work, challenges, diagrams), chaque texte au format `{ fr, en }`. `featured: true` = grande double page ; sinon carte dans « Autres projets ».
- Schéma `Diagram` : `lanes`, `nodes` (`col`, `row`, `rowSpan`, `tone` "focus"/"muted") et `edges` (`kind` "return" pour une boucle de retour, "planned" pour un chemin en pointillés sans paquets animés, présent dans le code mais pas lancé). Les libellés trop longs rétrécissent : garder les sous-libellés courts (environ 16 caractères).
- `src/content/site.ts` : profil, expérience, domaines de compétences (`capabilities`, avec les projets qui les prouvent), formation.
- `src/lib/i18n.ts` : textes de l'interface.
- `src/components/` : Hero, Sections (projets, domaines, expérience, parcours, contact ; `shortTitle` pour les liens des domaines), SystemDiagram, PidSimulator, TrajectoryVisual.

## Direction artistique « Système en lumière »

- Fond encre bleu nuit, Instrument Sans partout, un seul accent vert d'eau (#7fd1c4) réservé à ce qui est « vivant » : données en mouvement, disponibilité, focus clavier.
- Les projets sont le cœur du site : grandes doubles pages avec de grands schémas.
- Sobre et premium : pas de néon, pas de 3D, pas de murs de badges, peu de texte dans le hero.
- Titre du hero choisi par le propriétaire, à ne pas changer : « Du microcontrôleur au cloud, de la conception à la production. »
- Pour toute modification visuelle, utiliser les skills ui-ux-pro-max, frontend-design et impeccable. Ils ne sont pas dans le dépôt : les installer dans la session (`npx skills add nextlevelbuilder/ui-ux-pro-max-skill`, `npx skills add anthropics/skills --skill frontend-design`, `npx skills add pbakaus/impeccable`) et ne jamais les committer (`.claude/` et `skills-lock.json` restent hors git, par exemple via `.git/info/exclude`).

## Règles absolues

- Ne jamais inventer un résultat, une mesure, une métrique ou une fonctionnalité. Tout vient du code, des fichiers ou de ce que dit le propriétaire. Si une info manque, la demander.
- Pas de téléchargement de CV sur le site, pas de numéro de téléphone.
- Ne jamais publier de secret (.env, clé d'API, mot de passe, IP privée).
- Tout texte ajouté existe en FR et en EN.
- Demander l'accord avant tout `git push`.
- Messages de commit : JAMAIS de ligne « Co-Authored-By », ni « Claude-Session », ni aucune mention de Claude. L'historique a été nettoyé et force-pushé ; ne pas le réécrire ni le salir.
- Ne pas committer le fichier `AGENTS.md` que `next dev` génère tout seul.

## Projets : points d'attention

- FX Agents (`fx-agents`, « Autres projets ») : projet personnel, octobre 2026, conçu et développé avec l'aide d'agents de codage IA. Aucun lien vers son code. Seuls la suite de tests et les backtests ont été lancés : ne pas présenter l'exécution sur compte démo OANDA ni le tableau de bord comme testés. Pas de P&L.
- En attente du propriétaire : le dépôt public `esp32c6-rfid-iot` attend le firmware ESP-IDF et le subscriber Python. Les points à compléter sont marqués `TODO(Mahmoud)`. Ne rien faire dessus sans lui.
