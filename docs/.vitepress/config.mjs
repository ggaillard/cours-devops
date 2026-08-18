import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  title: 'Cours DevOps',
  description: 'Cours DevOps 100 % en ligne, centré GitHub — CI/CD, conteneurs, DevSecOps, sans installation locale.',

  // Nécessaire pour un site « projet » GitHub Pages : https://ggaillard.github.io/cours-devops/
  base: '/cours-devops/',

  lastUpdated: true,
  cleanUrls: false,
  ignoreDeadLinks: true,

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
      { text: 'Le parcours', link: '/introduction/parcours' },
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
          { text: 'Introduction au DevOps', link: '/introduction/' },
          { text: 'Pourquoi le tout-en-ligne ?', link: '/introduction/tout-en-ligne' },
          { text: 'Le parcours recommandé', link: '/introduction/parcours' },
          { text: 'Préparer son compte GitHub', link: '/introduction/preparer-github' },
        ],
      },
      {
        text: 'Git & GitHub',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/git-github/' },
          { text: 'Les bases de Git', link: '/git-github/bases-git' },
          { text: 'Branches & Pull Requests', link: '/git-github/branches-pr' },
          { text: 'Issues & Projects', link: '/git-github/issues-projects' },
        ],
      },
      {
        text: 'GitHub Codespaces',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/codespaces/' },
          { text: 'Mon premier Codespace', link: '/codespaces/premier-codespace' },
          { text: 'Dev Containers', link: '/codespaces/dev-containers' },
        ],
      },
      {
        text: 'GitHub Actions (CI/CD)',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/actions/' },
          { text: 'Mon premier workflow', link: '/actions/premier-workflow' },
          { text: 'Intégration continue (CI)', link: '/actions/integration-continue' },
          { text: 'Secrets & variables', link: '/actions/secrets-variables' },
          { text: 'Matrices & artefacts', link: '/actions/matrices-artefacts' },
        ],
      },
      {
        text: 'GitHub Pages',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/pages/' },
          { text: 'Déployer un site statique', link: '/pages/deployer-site' },
        ],
      },
      {
        text: 'Conteneurs (GHCR)',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/conteneurs/' },
          { text: 'Construire une image dans Actions', link: '/conteneurs/build-image' },
          { text: 'Publier sur GHCR', link: '/conteneurs/publier-ghcr' },
        ],
      },
      {
        text: 'DevSecOps',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/securite/' },
          { text: 'Dependabot', link: '/securite/dependabot' },
          { text: 'CodeQL & scan de secrets', link: '/securite/codeql-secrets' },
        ],
      },
      {
        text: 'Déploiement continu',
        collapsed: false,
        items: [
          { text: 'Déployer vers un PaaS en ligne', link: '/deploiement/' },
        ],
      },
      {
        text: 'Les TP',
        collapsed: false,
        items: [
          { text: 'Vue d’ensemble', link: '/tp/' },
          { text: 'TP 1 — Pipeline CI de A à Z', link: '/tp/tp1-pipeline-ci' },
          { text: 'TP 2 — Publier un site sur Pages', link: '/tp/tp2-site-pages' },
          { text: 'TP 3 — Image conteneur sur GHCR', link: '/tp/tp3-image-ghcr' },
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
