import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  title: 'Cours DevOps',
  description: 'Cours DevOps 100 % en ligne, centré GitHub — CI/CD, conteneurs, DevSecOps, sans installation locale.',

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
          { text: 'Les TP', link: '/tp/' },
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
        text: 'Les TP',
        collapsed: false,
        items: [
          { text: 'Vue d’ensemble', link: '/tp/' },
          { text: 'S9 · TP 1 — Pipeline CI', link: '/tp/tp1-pipeline-ci' },
          { text: 'S13 · TP 2 — Site sur Pages', link: '/tp/tp2-site-pages' },
          { text: 'S16 · TP 3 — Image GHCR', link: '/tp/tp3-image-ghcr' },
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
      message: 'Contenu pédagogique DevOps — 100 % en ligne, centré GitHub.',
      copyright: 'BTS SIO · Publié avec GitHub Pages',
    },

    darkModeSwitchLabel: 'Apparence',
    lightModeSwitchTitle: 'Passer en mode clair',
    darkModeSwitchTitle: 'Passer en mode sombre',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Haut de page',
  },
})
