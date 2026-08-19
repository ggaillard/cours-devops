import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  lang: 'fr-FR',
  title: 'Cours DevOps',
  description: 'Cours DevOps : Git, CI/CD, conteneurs, DevSecOps, qualité logicielle et API objet en Java.',

  // Nécessaire pour un site « projet » GitHub Pages : https://ggaillard.github.io/cours-devops/
  // Surchargeable via DOCS_BASE=/ pour servir le site à la racine (image conteneur).
  base: process.env.DOCS_BASE || '/cours-devops/',

  lastUpdated: true,
  cleanUrls: false,

  // Un lien mort doit faire échouer la CI : c'est le principe même du cours.
  ignoreDeadLinks: false,

  head: [
    ['meta', { name: 'theme-color', content: '#3e80af' }],
    ['meta', { name: 'author', content: 'ggaillard' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Progression', link: '/introduction/parcours' },
      {
        text: 'Sections',
        items: [
          { text: 'Git & GitHub', link: '/git-github/' },
          { text: 'Codespaces', link: '/codespaces/' },
          { text: 'GitHub Actions', link: '/actions/' },
          { text: 'GitHub Pages', link: '/pages/' },
          { text: 'Conteneurs (GHCR)', link: '/conteneurs/' },
          { text: 'DevSecOps', link: '/securite/' },
          { text: 'Déploiement', link: '/deploiement/' },
          { text: 'Qualité & tests', link: '/qualite/' },
          { text: 'UML', link: '/uml/' },
          { text: 'Conception objet', link: '/api-java/' },
          { text: 'Les TP', link: '/tp/' },
          { text: 'Soutenance', link: '/soutenance/' },
          { text: 'Aller plus loin', link: '/aller-plus-loin/' },
          { text: 'Dépannage', link: '/depannage/' },
          { text: 'Glossaire', link: '/glossaire/' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Démarrer',
        collapsed: false,
        items: [
          { text: 'S1 · Introduction au DevOps', link: '/introduction/' },
          { text: 'S1 · Pourquoi le tout-en-ligne ?', link: '/introduction/tout-en-ligne' },
          { text: 'Parcours & progression', link: '/introduction/parcours' },
          { text: 'S1 · Préparer son compte GitHub', link: '/introduction/preparer-github' },
        ],
      },
      {
        text: 'Git & GitHub',
        collapsed: false,
        items: [
          { text: 'S2 · Git & GitHub', link: '/git-github/' },
          { text: 'S2 · Les bases de Git', link: '/git-github/bases-git' },
          { text: 'S3 · Branches & Pull Requests', link: '/git-github/branches-pr' },
          { text: 'S4 · Issues & Projects', link: '/git-github/issues-projects' },
        ],
      },
      {
        text: 'GitHub Codespaces',
        collapsed: false,
        items: [
          { text: 'S5 · Codespaces', link: '/codespaces/' },
          { text: 'S5 · Mon premier Codespace', link: '/codespaces/premier-codespace' },
          { text: 'S6 · Dev Containers', link: '/codespaces/dev-containers' },
        ],
      },
      {
        text: 'GitHub Actions (CI/CD)',
        collapsed: false,
        items: [
          { text: 'S7 · GitHub Actions', link: '/actions/' },
          { text: 'S7 · Mon premier workflow', link: '/actions/premier-workflow' },
          { text: 'S8 · Intégration continue (CI)', link: '/actions/integration-continue' },
          { text: 'S10 · Secrets & variables', link: '/actions/secrets-variables' },
          { text: 'S11 · Matrices & artefacts', link: '/actions/matrices-artefacts' },
        ],
      },
      {
        text: 'GitHub Pages',
        collapsed: false,
        items: [
          { text: 'S12 · GitHub Pages', link: '/pages/' },
          { text: 'S12 · Déployer un site statique', link: '/pages/deployer-site' },
        ],
      },
      {
        text: 'Conteneurs (GHCR)',
        collapsed: false,
        items: [
          { text: 'S14 · Conteneurs & GHCR', link: '/conteneurs/' },
          { text: 'S14 · Construire une image', link: '/conteneurs/build-image' },
          { text: 'S15 · Publier sur GHCR', link: '/conteneurs/publier-ghcr' },
        ],
      },
      {
        text: 'DevSecOps',
        collapsed: false,
        items: [
          { text: 'S17 · DevSecOps', link: '/securite/' },
          { text: 'S17 · Dependabot', link: '/securite/dependabot' },
          { text: 'S18 · CodeQL & scan de secrets', link: '/securite/codeql-secrets' },
        ],
      },
      {
        text: 'Déploiement continu',
        collapsed: false,
        items: [
          { text: 'S19 · Déploiement continu', link: '/deploiement/' },
        ],
      },
      {
        text: 'Qualité & tests',
        collapsed: false,
        items: [
          { text: 'S20 · La pyramide des tests', link: '/qualite/' },
          { text: 'S21 · Couverture de code', link: '/qualite/couverture' },
          { text: 'S22 · Analyse statique & quality gate', link: '/qualite/analyse-statique' },
        ],
      },
      {
        text: 'Modélisation UML',
        collapsed: false,
        items: [
          { text: 'S24 · Modéliser avec UML', link: '/uml/' },
        ],
      },
      {
        text: 'Conception objet & API',
        collapsed: false,
        items: [
          { text: 'S25 · Mise en place', link: '/api-java/' },
          { text: 'S26 · Modéliser le domaine', link: '/api-java/modeliser-poo' },
          { text: 'S27 · Associations & cycle de vie', link: '/api-java/associations-cycle-vie' },
          { text: 'S28 · Abstraction & polymorphisme', link: '/api-java/abstraction-polymorphisme' },
          { text: 'S29 · Exposer une API REST', link: '/api-java/api-rest' },
          { text: "S30 · Tester l'API", link: '/api-java/tester-api' },
        ],
      },
      {
        text: 'Aller plus loin (hors progression)',
        collapsed: true,
        items: [
          { text: 'Les évolutions du métier', link: '/aller-plus-loin/' },
          { text: 'DataOps', link: '/aller-plus-loin/dataops' },
          { text: 'MLOps', link: '/aller-plus-loin/mlops' },
        ],
      },
      {
        text: 'Les TP',
        collapsed: false,
        items: [
          { text: 'Vue d’ensemble', link: '/tp/' },
          { text: 'TP 0 — Contribuer au cours', link: '/tp/tp0-contribuer' },
          { text: 'S9 · TP 1 — Pipeline CI', link: '/tp/tp1-pipeline-ci' },
          { text: 'S13 · TP 2 — Site sur Pages', link: '/tp/tp2-site-pages' },
          { text: 'S16 · TP 3 — Image GHCR', link: '/tp/tp3-image-ghcr' },
          { text: 'S23 · TP 4 — Durcir la CI', link: '/tp/tp4-qualite-ci' },
          { text: "S31 · TP 5 — Livrer l'API", link: '/tp/tp5-api-livree' },
        ],
      },
      {
        text: 'Évaluation',
        collapsed: false,
        items: [
          { text: 'S32 · Soutenance', link: '/soutenance/' },
        ],
      },
      {
        text: 'Références',
        collapsed: true,
        items: [
          { text: 'Quand ça ne marche pas', link: '/depannage/' },
          { text: 'Glossaire', link: '/glossaire/' },
        ],
      },
    ],

    outline: { label: 'Sommaire', level: [2, 3] },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ggaillard/cours-devops' },
    ],

    editLink: {
      pattern: 'https://github.com/ggaillard/cours-devops/edit/main/docs/:path',
      text: 'Modifier cette page sur GitHub',
    },

    lastUpdatedText: 'Mis à jour le',

    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Rechercher', buttonAriaLabel: 'Rechercher' },
          modal: {
            noResultsText: 'Aucun résultat pour',
            resetButtonTitle: 'Réinitialiser',
            footer: {
              selectText: 'sélectionner',
              navigateText: 'naviguer',
              closeText: 'fermer',
            },
          },
        },
      },
    },

    footer: {
      message: 'Contenu pédagogique DevOps — BTS SIO.',
      copyright: 'BTS SIO · Publié avec GitHub Pages',
    },

    darkModeSwitchLabel: 'Apparence',
    lightModeSwitchTitle: 'Passer en mode clair',
    darkModeSwitchTitle: 'Passer en mode sombre',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Haut de page',
  },
}))
