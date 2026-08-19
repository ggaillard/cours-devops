# Démonstration DataOps / MLOps

Support du module d'ouverture [Les évolutions du métier](https://ggaillard.github.io/cours-devops/aller-plus-loin/).

Les scripts sont **fournis** : vous les exécutez et vous lisez ce qu'ils affichent.
Ni Python ni le *machine learning* ne sont des prérequis.

## Mise en route

```bash
pip install -r requirements.txt
python donnees/recuperer.py
```

## Les trois démonstrations

| Commande | Ce qu'elle montre |
| --- | --- |
| `python src/valider_donnees.py donnees/reference.csv` | DataOps : le contrat est respecté → code 0 |
| `python src/entrainer.py` | MLOps : l'entraînement est journalisé (paramètres, métriques, empreinte des données) |
| `python src/detecter_derive.py courant_stable.csv` | MLOps : pas de dérive → code 0 |
| `python src/detecter_derive.py courant_derive.csv` | MLOps : dérive détectée → code 1 |

Pour comparer les entraînements dans une interface :

```bash
mlflow ui --backend-store-uri sqlite:///mlflow.db
```

## Faire échouer volontairement le contrat

```python
import pandas as pd
d = pd.read_csv('donnees/reference.csv')
d.loc[0:4, 'MedHouseVal'] = 99.0      # hors bornes
d.loc[10:12, 'Population'] = None      # valeurs manquantes
d.to_csv('donnees/cassees.csv', index=False)
```

```bash
python src/valider_donnees.py donnees/cassees.csv   # → code 1
```

## Données

Jeu public fourni avec scikit-learn (prix de logements en Californie, 20 640 lignes).
Aucune donnée n'est versionnée : `donnees/*.csv` est ignoré, tout se régénère
avec `recuperer.py`. C'est précisément la pratique que le module enseigne.
