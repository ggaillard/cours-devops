"""DataOps — vérifie qu'un fichier de données respecte son contrat.

Sort en code 1 si le contrat est violé : la CI devient rouge,
exactement comme un test unitaire en échec.
"""
import sys
from pathlib import Path

import pandas as pd
import yaml

RACINE = Path(__file__).parent.parent


def valider(chemin_donnees: Path, chemin_contrat: Path) -> list[str]:
    donnees = pd.read_csv(chemin_donnees)
    contrat = yaml.safe_load(chemin_contrat.read_text(encoding="utf-8"))
    anomalies: list[str] = []

    manquantes = set(contrat["colonnes_obligatoires"]) - set(donnees.columns)
    if manquantes:
        anomalies.append(f"colonnes absentes : {sorted(manquantes)}")

    if len(donnees) < contrat["lignes_minimum"]:
        anomalies.append(
            f"{len(donnees)} lignes, minimum attendu {contrat['lignes_minimum']}")

    for regle in contrat["regles"]:
        col = regle["colonne"]
        if col not in donnees.columns:
            continue
        serie = donnees[col]

        vides = int(serie.isna().sum())
        if vides > regle["valeurs_manquantes_tolerees"]:
            anomalies.append(f"{col} : {vides} valeur(s) manquante(s)")

        hors_bornes = int(((serie < regle["min"]) | (serie > regle["max"])).sum())
        if hors_bornes:
            anomalies.append(
                f"{col} : {hors_bornes} valeur(s) hors de [{regle['min']} ; {regle['max']}]")

    return anomalies


def main() -> int:
    chemin = Path(sys.argv[1]) if len(sys.argv) > 1 else RACINE / "donnees" / "reference.csv"
    anomalies = valider(chemin, RACINE / "donnees" / "contrat.yml")

    print(f"Contrôle de {chemin.name}")
    if not anomalies:
        print("  ✅ contrat respecté")
        return 0
    for a in anomalies:
        print(f"  ❌ {a}")
    print(f"\n{len(anomalies)} violation(s) du contrat de données.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
