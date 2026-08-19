"""MLOps — entraîne un modèle et journalise l'expérience avec MLflow.

Chaque exécution enregistre : les paramètres, les métriques, le modèle
produit et l'empreinte des données. C'est le pendant du commit Git,
appliqué à un artefact qui ne se lit pas.
"""
import hashlib
from pathlib import Path

import mlflow
import mlflow.sklearn
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

RACINE = Path(__file__).parent.parent
CIBLE = "MedHouseVal"


def empreinte(chemin: Path) -> str:
    """Identifie la version exacte des données utilisées."""
    return hashlib.sha256(chemin.read_bytes()).hexdigest()[:12]


def main() -> None:
    chemin = RACINE / "donnees" / "reference.csv"
    donnees = pd.read_csv(chemin)
    X = donnees.drop(columns=[CIBLE])
    y = donnees[CIBLE]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

    parametres = {"n_estimators": 60, "max_depth": 12, "random_state": 42}

    mlflow.set_tracking_uri(f"sqlite:///{RACINE / 'mlflow.db'}")
    mlflow.set_experiment("prix-logements")

    with mlflow.start_run() as execution:
        modele = RandomForestRegressor(**parametres).fit(X_tr, y_tr)
        prediction = modele.predict(X_te)

        mae = mean_absolute_error(y_te, prediction)
        r2 = r2_score(y_te, prediction)

        mlflow.log_params(parametres)
        mlflow.log_param("donnees_empreinte", empreinte(chemin))
        mlflow.log_param("lignes_entrainement", len(X_tr))
        mlflow.log_metrics({"mae": mae, "r2": r2})
        mlflow.sklearn.log_model(modele, name="modele")

        print(f"exécution   : {execution.info.run_id[:8]}")
        print(f"données     : {empreinte(chemin)}")
        print(f"MAE         : {mae:.4f}")
        print(f"R²          : {r2:.4f}")


if __name__ == "__main__":
    main()
