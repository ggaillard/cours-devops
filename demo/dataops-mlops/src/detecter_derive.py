"""MLOps — compare les données de production aux données d'entraînement.

Un modèle peut se dégrader sans qu'une seule ligne de code ait changé :
c'est le monde qui a bougé, pas le programme. On surveille donc les
données entrantes, pas seulement le code.
"""
import sys
from pathlib import Path

import pandas as pd
from scipy.stats import ks_2samp

RACINE = Path(__file__).parent.parent
SEUIL_P = 0.05          # en dessous, les distributions diffèrent significativement
CIBLE = "MedHouseVal"


def main() -> int:
    reference = pd.read_csv(RACINE / "donnees" / "reference.csv")
    nom = sys.argv[1] if len(sys.argv) > 1 else "courant_stable.csv"
    courant = pd.read_csv(RACINE / "donnees" / nom)

    colonnes = [c for c in reference.columns if c != CIBLE]
    derives = []

    print(f"Référence vs {nom}\n")
    print(f"{'colonne':<14}{'p-value':>12}   verdict")
    print("-" * 46)
    for col in colonnes:
        resultat = ks_2samp(reference[col].dropna(), courant[col].dropna())
        derive = resultat.pvalue < SEUIL_P
        if derive:
            derives.append(col)
        print(f"{col:<14}{resultat.pvalue:>12.2e}   {'⚠️  DÉRIVE' if derive else 'stable'}")

    part = len(derives) / len(colonnes)
    print("-" * 46)
    print(f"{len(derives)}/{len(colonnes)} colonnes ont dérivé ({part:.0%})")

    if not derives:
        print("\n✅ Les données de production ressemblent aux données d'entraînement.")
        return 0

    gravite = "majeure" if part > 0.3 else "localisée"
    print(f"\n⚠️  Dérive {gravite} sur : {', '.join(derives)}")
    print("    Le modèle a été entraîné sur d'autres distributions : ses")
    print("    prédictions ne sont plus garanties. À réévaluer sur des")
    print("    données récentes, et probablement à réentraîner.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
