#!/usr/bin/env node
/**
 * Analyse chaque bloc ```mermaid du cours avec le vrai analyseur Mermaid.
 *
 * Pourquoi ce script existe : le build VitePress **réussit** sur un diagramme
 * fautif. Le rendu se fait dans le navigateur de l'étudiant, et l'erreur
 * n'apparaît qu'à l'affichage — c'est-à-dire en classe, projeté au tableau.
 *
 * Usage : node outils/verifier-diagrammes.mjs
 * Sortie : 0 si tous les diagrammes s'analysent, 1 sinon.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(RACINE, 'docs')

// Mermaid s'attend à tourner dans un navigateur : on lui en fournit un minimal.
const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true })
for (const cle of ['window', 'document', 'Element', 'SVGElement', 'HTMLElement', 'getComputedStyle']) {
  globalThis[cle] = cle === 'window' ? dom.window : dom.window[cle]
}
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
})

const mermaid = (await import('mermaid')).default
mermaid.initialize({ startOnLoad: false })

function listerPages(dossier, acc = []) {
  for (const entree of readdirSync(dossier)) {
    if (entree === '.vitepress' || entree === 'node_modules') continue
    const chemin = join(dossier, entree)
    if (statSync(chemin).isDirectory()) listerPages(chemin, acc)
    else if (entree.endsWith('.md')) acc.push(chemin)
  }
  return acc
}

const relatif = (p) => p.slice(RACINE.length + 1).replaceAll('\\', '/')

let total = 0
const echecs = []

for (const chemin of listerPages(DOCS)) {
  const blocs = [...readFileSync(chemin, 'utf8').matchAll(/```mermaid\n([\s\S]*?)```/g)]

  for (const [rang, bloc] of blocs.entries()) {
    total += 1
    try {
      await mermaid.parse(bloc[1])
    } catch (erreur) {
      echecs.push({
        fichier: relatif(chemin),
        rang: rang + 1,
        message: String(erreur.message).split('\n')[0],
      })
    }
  }
}

console.log(`Diagrammes Mermaid — ${total} bloc(s) analysé(s)\n`)

if (echecs.length === 0) {
  console.log('  ✔ tous les diagrammes s\'analysent')
  console.log('\nAucune erreur.')
  process.exit(0)
}

for (const { fichier, rang, message } of echecs) {
  console.log(`  ✘ ${fichier} — diagramme ${rang}`)
  console.log(`      ${message}`)
}
console.log(`\n${echecs.length} diagramme(s) en erreur.`)
process.exit(1)
