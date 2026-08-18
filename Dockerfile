# syntax=docker/dockerfile:1

# ── Étape 1 : construire le site ────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# On copie d'abord les manifestes pour profiter du cache de couches
COPY package.json package-lock.json ./
RUN npm ci

COPY docs ./docs
# Dans l'image, le site est servi à la racine (et non sous /cours-devops/)
ENV DOCS_BASE=/
RUN npm run docs:build

# ── Étape 2 : servir le site ────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime
LABEL org.opencontainers.image.title="Cours DevOps" \
      org.opencontainers.image.description="Cours DevOps 100% en ligne, centre GitHub (VitePress)" \
      org.opencontainers.image.source="https://github.com/ggaillard/cours-devops" \
      org.opencontainers.image.licenses="CC-BY-NC-SA-4.0"

COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1
