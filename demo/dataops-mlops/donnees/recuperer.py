"""Récupère un jeu de données public et fabrique trois fichiers.

  reference.csv       ce sur quoi le modèle a été entraîné
  courant_stable.csv  des données de production comparables
  courant_derive.csv  des données de production après un changement du monde
                      (ici : hausse des revenus et vieillissement du parc)

La dérive est simulée volontairement, pour qu'on puisse observer
un détecteur qui répond « stable » ET un détecteur qui alerte.
"""
from pathlib import Path

from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split

DOSSIER = Path(__file__).parent


def main() -> None:
    donnees = fetch_california_housing(as_frame=True).frame

    reference, courant = train_test_split(donnees, test_size=0.5, random_state=42)

    derive = courant.copy()
    derive["MedInc"] = derive["MedInc"] * 1.25          # les revenus ont augmenté
    derive["HouseAge"] = (derive["HouseAge"] + 8).clip(upper=60)  # le parc a vieilli

    DOSSIER.mkdir(exist_ok=True)
    reference.to_csv(DOSSIER / "reference.csv", index=False)
    courant.to_csv(DOSSIER / "courant_stable.csv", index=False)
    derive.to_csv(DOSSIER / "courant_derive.csv", index=False)

    for nom in ("reference", "courant_stable", "courant_derive"):
        print(f"{nom + '.csv':<22} écrit")


if __name__ == "__main__":
    main()
