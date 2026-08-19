#!/usr/bin/env node
/**
 * Vérifie la cohérence pédagogique du cours.
 *
 * Le build VitePress détecte déjà les liens morts. Il ne voit pas, en revanche,
 * qu'une page renvoie à « la séance 26 » alors que la notion est introduite en
 * séance 28, ni qu'un total d'heures ne correspond plus au nombre de séances.
 * Ce sont ces erreurs-là — invisibles à la compilation, fausses pour l'étudiant —
 * que ce script refuse.
 *
 * Usage : node outils/verifier-coherence.mjs
 * Sortie : 0 si tout est cohérent, 1 sinon.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(RACINE, 'docs')

const anomalies = []
const signale = (regle, message, fichier) =>
  anomalies.push({ regle, message, fichier })

// ---------------------------------------------------------------- utilitaires

function listerPages(dossier, acc = []) {
  for (const entree of readdirSync(dossier)) {
    if (entree === '.vitepress' || entree === 'node_modules' || entree === 'public') continue
    const chemin = join(dossier, entree)
    if (statSync(chemin).isDirectory()) listerPages(chemin, acc)
    else if (entree.endsWith('.md')) acc.push(chemin)
  }
  return acc
}

/** `/tmp/x/docs/api-java/api-rest.md` → `/api-java/api-rest` */
const versLien = (chemin) =>
  '/' + chemin.slice(DOCS.length + 1).replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')

/** `/api-java/api-rest` → `docs/api-java/api-rest.md` (ou index.md) */
function versFichier(lien) {
  const nu = lien.split('#')[0].replace(/^\//, '').replace(/\/$/, '')
  const candidats = [join(DOCS, `${nu}.md`), join(DOCS, nu, 'index.md')]
  if (nu === '') candidats.push(join(DOCS, 'index.md'))
  return candidats.find(existsSync) ?? null
}

const pages = listerPages(DOCS)
const source = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]))
const relatif = (p) =>
  (p.startsWith(RACINE) ? p.slice(RACINE.length + 1) : p).replaceAll('\\', '/')

/** « ~1 h 30 », « ~40 min », « 2 h » → minutes */
function enMinutes(duree) {
  const heures = duree.match(/(\d+)\s*h/)
  const minutes = duree.match(/h\s*(\d+)|(\d+)\s*min/)
  return (heures ? Number(heures[1]) * 60 : 0) + (minutes ? Number(minutes[1] ?? minutes[2]) : 0)
}

// ------------------------------------------- 1. bandeaux et numéros de séance

/**
 * Une séance tient sur une page (« Séance 9 · 2 h ») ou se répartit sur
 * plusieurs (« Séance 1 (2/3) · ~30 min »). Les deux formes sont acceptées ;
 * dans le second cas les fractions doivent être complètes et les durées
 * partielles totaliser 2 h.
 */
const seanceDeLaPage = new Map() // lien de page → numéro de séance
const morceaux = new Map() // numéro de séance → [{ chemin, part, total, minutes }]

const BANDEAU = /🎯\s*Séance\s+(\d+)\s*(?:\((\d+)\/(\d+)\)\s*)?·\s*([^\n]*)/g

for (const [chemin, texte] of source) {
  const bandeaux = [...texte.matchAll(BANDEAU)]
  if (bandeaux.length === 0) continue
  if (bandeaux.length > 1) {
    signale('bandeau', `${bandeaux.length} bandeaux de séance sur une même page`, chemin)
  }
  const [, numero, part, total, duree] = bandeaux[0]
  const minutes = enMinutes(duree)

  if (minutes === 0) {
    signale('bandeau', `durée illisible : « ${duree.trim()} »`, chemin)
  } else if (!part && minutes !== 120) {
    signale('bandeau', `séance sur une seule page : « ${duree.trim()} » au lieu de 2 h`, chemin)
  }

  seanceDeLaPage.set(versLien(chemin), Number(numero))
  const lot = morceaux.get(Number(numero)) ?? []
  lot.push({ chemin, part: part ? Number(part) : 1, total: total ? Number(total) : 1, minutes })
  morceaux.set(Number(numero), lot)
}

// ----------------------------------------------- 2. continuité de la numérotation

const numeros = [...morceaux.keys()].sort((a, b) => a - b)
const maximum = numeros[numeros.length - 1] ?? 0

for (let n = 1; n <= maximum; n += 1) {
  if (!morceaux.has(n)) {
    signale('continuité', `aucune page ne porte le bandeau de la séance ${n}`, 'docs/')
  }
}

// une séance découpée doit l'être complètement, et durer 2 h au total
for (const [numero, lot] of morceaux) {
  const attendu = lot[0].total
  const parts = lot.map((m) => m.part).sort((a, b) => a - b)

  if (lot.some((m) => m.total !== attendu)) {
    signale('continuité', `séance ${numero} : les pages n'annoncent pas le même découpage`, 'docs/')
    continue
  }
  if (lot.length !== attendu || parts.some((p, i) => p !== i + 1)) {
    signale(
      'continuité',
      `séance ${numero} : ${lot.length} page(s) trouvée(s) pour un découpage en ${attendu} — parts ${parts.join(', ')}`,
      'docs/',
    )
    continue
  }
  const somme = lot.reduce((t, m) => t + m.minutes, 0)
  if (attendu > 1 && somme !== 120) {
    signale(
      'continuité',
      `séance ${numero} : les durées partielles totalisent ${somme} min au lieu de 120`,
      'docs/',
    )
  }
}

// ------------------------------------------------------- 3. renvois croisés

// Formes reconnues : « séance 28](/chemin) », « [séance 28](/chemin) », « [la séance 28](/chemin) »
const RENVOI = /\[?[^[\]\n]{0,12}séances?\s+(\d+)\]\(([^)#]+)(?:#[^)]*)?\)/gi

for (const [chemin, texte] of source) {
  for (const [brut, numero, cible] of texte.matchAll(RENVOI)) {
    if (!cible.startsWith('/')) continue
    const fichierCible = versFichier(cible)
    if (!fichierCible) continue // le build VitePress signale déjà les liens morts
    const declaree = seanceDeLaPage.get(versLien(fichierCible))
    if (declaree === undefined) {
      signale(
        'renvoi',
        `« ${brut.trim()} » pointe vers une page sans bandeau de séance`,
        chemin,
      )
    } else if (declaree !== Number(numero)) {
      signale(
        'renvoi',
        `« ${brut.trim()} » : la page cible porte le bandeau de la séance ${declaree}`,
        chemin,
      )
    }
  }
}

// Forme abrégée du glossaire et des tableaux : « [S26](/api-java/modeliser-poo) ».
for (const [chemin, texte] of source) {
  for (const [brut, numero, cible] of texte.matchAll(/\[S(\d+)\]\((\/[^)#]+)(?:#[^)]*)?\)/g)) {
    const fichierCible = versFichier(cible)
    if (!fichierCible) continue
    const declaree = seanceDeLaPage.get(versLien(fichierCible))
    if (declaree === undefined) {
      signale('renvoi', `« ${brut} » pointe vers une page sans bandeau de séance`, chemin)
    } else if (declaree !== Number(numero)) {
      signale(
        'renvoi',
        `« ${brut} » : la page cible porte le bandeau de la séance ${declaree}`,
        chemin,
      )
    }
  }
}

// Les mentions non liées (« vu en séance 12 », dans un schéma, un tableau…) ne
// peuvent pas être confrontées à leur cible : on vérifie au moins qu'elles
// désignent une séance qui existe.
for (const [chemin, texte] of source) {
  for (const [brut, numero] of texte.matchAll(/\bséance\s+(\d+)\b(?!\s*\])/gi)) {
    const n = Number(numero)
    if (n < 1 || n > maximum) {
      signale('renvoi', `« ${brut} » : le cours ne compte que ${maximum} séances`, chemin)
    }
  }
}

// ------------------------------------------------- 4. sidebar ↔ bandeaux

const config = await import(pathToFileURL(join(DOCS, '.vitepress', 'config.mjs')).href)
const sidebar = config.default.themeConfig.sidebar

const entrees = sidebar.flatMap((groupe) => groupe.items ?? [])

for (const { text, link } of entrees) {
  const fichier = versFichier(link)
  if (!fichier) {
    signale('sidebar', `le lien « ${link} » ne correspond à aucun fichier`, 'docs/.vitepress/config.mjs')
    continue
  }
  const annonce = text.match(/^S(\d+)\s*·/)
  const declaree = seanceDeLaPage.get(versLien(fichier))

  if (annonce && declaree === undefined) {
    signale('sidebar', `« ${text} » annonce une séance, la page n'a pas de bandeau`, relatif(fichier))
  } else if (annonce && declaree !== Number(annonce[1])) {
    signale(
      'sidebar',
      `« ${text} » contredit le bandeau de la page (séance ${declaree})`,
      'docs/.vitepress/config.mjs',
    )
  } else if (!annonce && declaree !== undefined) {
    signale(
      'sidebar',
      `« ${text} » n'annonce aucune séance alors que la page porte le bandeau ${declaree}`,
      'docs/.vitepress/config.mjs',
    )
  }
}

const dansLaSidebar = new Set(
  entrees.map(({ link }) => versFichier(link)).filter(Boolean).map(versLien),
)
for (const lien of seanceDeLaPage.keys()) {
  if (!dansLaSidebar.has(lien)) {
    signale('sidebar', `page de séance absente de la sidebar`, `docs${lien}`)
  }
}

// --------------------------- 5. arithmétique des formats réduits (parcours.md)

const parcours = source.get(join(DOCS, 'introduction', 'parcours.md'))

if (parcours) {
  // « | **~42 h (21 séances)** | S1–S16 puis S24–S28 : … |ance »
  const LIGNE = /\|\s*\*\*~(\d+)\s*h\s*\((\d+)\s*séances?\)\*\*\s*\|([^|]*)\|/g

  for (const [, heures, compte, description] of parcours.matchAll(LIGNE)) {
    const annonce = Number(compte)

    if (Number(heures) !== annonce * 2) {
      signale(
        'arithmétique',
        `« ~${heures} h (${annonce} séances) » : ${annonce} séances de 2 h font ${annonce * 2} h`,
        join(DOCS, 'introduction', 'parcours.md'),
      )
    }

    // On ne recompte que les descriptions énumératives (« S1–S16 puis S24–S28 »).
    const enumeration = description.split(':')[0]
    if (!/^[\s,]*S\d/.test(enumeration)) continue

    const seances = new Set()
    for (const [, debut, fin] of enumeration.matchAll(/S(\d+)(?:\s*[–-]\s*S?(\d+))?/g)) {
      for (let n = Number(debut); n <= Number(fin ?? debut); n += 1) seances.add(n)
    }
    if (seances.size !== annonce) {
      signale(
        'arithmétique',
        `« ${enumeration.trim()} » représente ${seances.size} séances, pas ${annonce}`,
        join(DOCS, 'introduction', 'parcours.md'),
      )
    }
  }

  // Le total annoncé dans le texte doit suivre le nombre réel de séances.
  const totaux = [...parcours.matchAll(/(\d+)\s+séances\b/g)].map(([, n]) => Number(n))
  if (totaux.length && !totaux.includes(maximum)) {
    signale(
      'arithmétique',
      `aucune mention du total réel (${maximum} séances) — trouvé : ${totaux.join(', ')}`,
      join(DOCS, 'introduction', 'parcours.md'),
    )
  }
}

// ------------------------------------------------ 6. totaux cités ailleurs

const EN_LETTRES = {
  vingt: 20, 'vingt-cinq': 25, trente: 30, 'trente et une': 31, 'trente-deux': 32,
  'trente-trois': 33, 'trente-quatre': 34, 'trente-cinq': 35,
}

for (const [chemin, texte] of source) {
  for (const [brut, mot] of texte.matchAll(
    /\b(vingt|vingt-cinq|trente|trente et une|trente-deux|trente-trois|trente-quatre|trente-cinq)\s+séances\b/gi,
  )) {
    const valeur = EN_LETTRES[mot.toLowerCase()]
    if (valeur !== undefined && valeur !== maximum) {
      signale('total', `« ${brut} » — le cours en compte ${maximum}`, chemin)
    }
  }
  for (const [brut, n] of texte.matchAll(/\b(?:les\s+)?(\d+)\s+séances\b/g)) {
    if (chemin.endsWith('parcours.md')) continue // traité au point 5
    if (Number(n) > 15 && Number(n) !== maximum) {
      signale('total', `« ${brut} » — le cours en compte ${maximum}`, chemin)
    }
  }
}

// ------------------------------- 6 bis. convention socle / approfondissement

/**
 * Une page qui contient une section 🚀 doit l'annoncer dans son bandeau,
 * sans quoi l'étudiant ne peut pas savoir ce qui est exigible.
 */
for (const [chemin, texte] of source) {
  const marquees = texte.includes('## 🚀 Approfondissement')
  const annonce = texte.includes('**Socle :**')

  if (marquees && !annonce) {
    signale('socle', 'sections 🚀 présentes, mais le bandeau ne les annonce pas', chemin)
  } else if (annonce && !marquees) {
    signale('socle', 'le bandeau annonce des sections 🚀 qui n\'existent pas', chemin)
  }

  // le marqueur doit toujours porter le même libellé
  for (const [brut] of texte.matchAll(/^##+\s*🚀.*$/gm)) {
    if (!brut.startsWith('## 🚀 Approfondissement — ')) {
      signale('socle', `titre 🚀 hors convention : « ${brut.trim()} »`, chemin)
    }
  }
}

// ---------------------------------------------- 7. prérequis en marche arrière

/** Un prérequis ne peut pas être une séance postérieure. */
for (const [chemin, texte] of source) {
  const moi = seanceDeLaPage.get(versLien(chemin))
  if (moi === undefined) continue

  const bloc = texte.match(/\*\*Prérequis\s*:\*\*([^\n]*)/)
  if (!bloc) continue

  for (const [, cible] of bloc[1].matchAll(/\]\((\/[^)#]+)(?:#[^)]*)?\)/g)) {
    const fichierCible = versFichier(cible)
    if (!fichierCible) continue
    const numero = seanceDeLaPage.get(versLien(fichierCible))
    if (numero !== undefined && numero > moi) {
      signale(
        'prérequis',
        `la séance ${moi} exige la séance ${numero}, qui vient après (${cible})`,
        chemin,
      )
    }
  }
}

// ------------------------------------ 8. le dépôt illustre bien ce qu'il enseigne

const readme = readFileSync(join(RACINE, 'README.md'), 'utf8')
const tableau = readme.match(/\| Notion enseignée[\s\S]*?\n\n/)?.[0] ?? ''
const cites = [...tableau.matchAll(/\]\(([^)]+)\)/g)].map(([, c]) => c.replace(/\/$/, ''))

for (const cible of cites) {
  if (!existsSync(join(RACINE, cible))) {
    signale('dépôt', `le tableau « notion → fichier » cite ${cible}, qui n'existe pas`, 'README.md')
  }
}

const aCiter = [
  ...readdirSync(join(RACINE, '.github', 'workflows')).map((f) => `.github/workflows/${f}`),
  '.devcontainer/devcontainer.json',
  '.github/dependabot.yml',
  'Dockerfile',
  ...(existsSync(join(RACINE, 'demo'))
    ? readdirSync(join(RACINE, 'demo')).map((d) => `demo/${d}`)
    : []),
]

for (const preuve of aCiter) {
  if (!cites.some((c) => c === preuve || c.startsWith(`${preuve}/`))) {
    signale(
      'dépôt',
      `${preuve} n'apparaît pas dans le tableau « notion → fichier »`,
      'README.md',
    )
  }
}

// ------------------------------------------------------------------ rapport

const REGLES = [
  ['bandeau', 'bandeaux de séance'],
  ['continuité', 'continuité de la numérotation'],
  ['renvoi', 'renvois croisés vers une séance'],
  ['prérequis', 'sens de lecture des prérequis'],
  ['sidebar', 'sidebar ↔ bandeaux'],
  ['arithmétique', 'formats réduits'],
  ['total', 'nombre total de séances'],
  ['socle', 'convention socle / approfondissement'],
  ['dépôt', 'le dépôt illustre ce qu\'il enseigne'],
]

console.log(`Cohérence du cours — ${pages.length} pages, ${maximum} séances\n`)

for (const [cle, libelle] of REGLES) {
  const lot = anomalies.filter((a) => a.regle === cle)
  if (lot.length === 0) {
    console.log(`  ✔ ${libelle}`)
    continue
  }
  console.log(`  ✘ ${libelle}`)
  for (const { message, fichier } of lot) {
    console.log(`      ${relatif(String(fichier))}`)
    console.log(`        ${message}`)
  }
}

console.log()
if (anomalies.length) {
  console.log(`${anomalies.length} incohérence(s). Le cours n'est pas publiable en l'état.`)
  process.exit(1)
}
console.log('Aucune incohérence.')
