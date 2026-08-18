---
layout: default
title: Outils & pratiques 2026
nav_order: 5
---

# 🚀 Outils & pratiques 2026
{: .no_toc }

Ces ressources complètent le parcours avec des outils largement adoptés en production depuis 2025.
{: .fs-6 .fw-300 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Docker Compose — Avancé

**Niveau :** 🟡 Intermédiaire

Fonctionnalités avancées pour les environnements de production.

### Profiles — Activer des services selon le contexte

```yaml
services:
  app:
    image: mon-app
    # Pas de profile → toujours démarré

  db:
    image: mariadb:11
    profiles:
      - dev
      - prod

  mailhog:
    image: mailhog/mailhog
    profiles:
      - dev       # Uniquement en développement

  prometheus:
    image: prom/prometheus
    profiles:
      - prod      # Uniquement en production
```

```bash
# Démarrer uniquement le profil dev
docker compose --profile dev up -d

# Démarrer le profil prod
docker compose --profile prod up -d
```

### Secrets Docker

```yaml
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### Healthchecks et dépendances

```yaml
services:
  db:
    image: mariadb:11
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    image: mon-app
    depends_on:
      db:
        condition: service_healthy
```

---

## Sécurité des conteneurs

**Niveau :** 🔴 Avancé

### Bonnes pratiques essentielles

**1. Utilisateur non-root**

```dockerfile
# Mauvaise pratique (root par défaut)
FROM node:20-alpine
WORKDIR /app
...

# Bonne pratique
FROM node:20-alpine
WORKDIR /app
...
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

**2. Image de base minimale**

```dockerfile
# Préférer les images légères
FROM alpine:3.19     # ~7 Mo vs ubuntu ~80 Mo
FROM node:20-alpine  # alpine variant
FROM python:3.11-slim
```

**3. Scan de vulnérabilités avec Trivy**

```bash
# Installer Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh

# Scanner une image
trivy image nginx:latest
trivy image mon-app:1.0

# Scanner dans le pipeline GitLab CI
scan-image:
  stage: test
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 1 --severity HIGH,CRITICAL $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

**4. Lecture seule du système de fichiers**

```bash
docker run --read-only --tmpfs /tmp mon-app
```

```yaml
services:
  app:
    image: mon-app
    read_only: true
    tmpfs:
      - /tmp
      - /app/cache
```

---

## Observabilité — Logs & métriques

**Niveau :** 🔴 Avancé

La **observabilité** repose sur trois piliers : logs, métriques et traces.

### Stack PLG (Promtail + Loki + Grafana)

```yaml
# compose.yml — Stack d'observabilité
services:

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

volumes:
  grafana_data:
```

**Accès :** Grafana sur `http://localhost:3000`

### Métriques applicatives (Node.js)

```javascript
const promClient = require('prom-client');
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status']
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

---

## GitHub Actions

**Niveau :** 🟡 Intermédiaire

Alternative à GitLab CI, GitHub Actions offre un écosystème riche de **marketplace actions**.

### Exemple — Pipeline Node.js

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Différences GitLab CI / GitHub Actions

| | GitLab CI | GitHub Actions |
|-|-----------|----------------|
| Fichier | `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| Stages | `stages:` explicites | Jobs séquentiels ou parallèles |
| Runners | GitLab Runner | GitHub-hosted ou self-hosted |
| Marketplace | Variables templates | Marketplace d'actions |
| Prix | Gratuit 400 min/mois | Gratuit 2000 min/mois |

---

## Introduction à Kubernetes

**Niveau :** 🔴 Avancé

Kubernetes (K8s) orchestre des conteneurs à grande échelle.

### Concepts fondamentaux

```
Cluster Kubernetes
├── Node (serveur physique ou VM)
│   ├── Pod (1 ou plusieurs conteneurs)
│   ├── Pod
│   └── Pod
└── Node
    ├── Pod
    └── Pod
```

| Objet K8s | Rôle |
|-----------|------|
| **Pod** | Unité de base : 1+ conteneurs co-localisés |
| **Deployment** | Gère le cycle de vie des pods (nombre de réplicas) |
| **Service** | Expose les pods via une IP stable |
| **Ingress** | Routage HTTP/HTTPS externe |
| **ConfigMap** | Configuration non-sensible |
| **Secret** | Configuration sensible (base64) |

### Exemple de Deployment

```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mon-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mon-app
  template:
    metadata:
      labels:
        app: mon-app
    spec:
      containers:
        - name: mon-app
          image: mon-registre/mon-app:1.0
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
```

### Tester avec Minikube (en local)

```bash
# Installer Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Démarrer un cluster local
minikube start

# Déployer
kubectl apply -f deployment.yml
kubectl apply -f service.yml

# Vérifier
kubectl get pods
kubectl get services
kubectl logs pod/mon-app-xxx
```

---

## Infrastructure as Code

**Niveau :** 🔴 Avancé

L'Infrastructure as Code (IaC) permet de gérer l'infrastructure comme du code : versionnée, testée, reproductible.

### Terraform — Provisionner l'infrastructure

```hcl
# main.tf — Créer un serveur chez un cloud provider
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_server" "web" {
  name        = "srv-web-01"
  image       = "debian-12"
  server_type = "cx22"
  location    = "nbg1"

  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }
}

output "server_ip" {
  value = hcloud_server.web.ipv4_address
}
```

```bash
terraform init      # Initialiser
terraform plan      # Prévisualiser
terraform apply     # Appliquer
terraform destroy   # Détruire
```

### Ansible — Configurer les serveurs

```yaml
# playbook.yml — Installer et configurer Nginx
---
- name: Configuration du serveur web
  hosts: webservers
  become: true

  tasks:
    - name: Mettre à jour les paquets
      apt:
        update_cache: true
        upgrade: dist

    - name: Installer Nginx
      apt:
        name: nginx
        state: present

    - name: Copier la configuration Nginx
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/monsite.conf
      notify: Recharger Nginx

    - name: Activer le site
      file:
        src: /etc/nginx/sites-available/monsite.conf
        dest: /etc/nginx/sites-enabled/monsite.conf
        state: link

  handlers:
    - name: Recharger Nginx
      service:
        name: nginx
        state: reloaded
```

```bash
# Exécuter le playbook
ansible-playbook -i inventaire.ini playbook.yml

# Tester sans appliquer (--check)
ansible-playbook -i inventaire.ini playbook.yml --check
```

---

## Ressources

- [Documentation Kubernetes](https://kubernetes.io/docs/home/)
- [Terraform Registry](https://registry.terraform.io/)
- [Documentation Ansible](https://docs.ansible.com/)
- [Grafana Cloud (gratuit)](https://grafana.com/products/cloud/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
