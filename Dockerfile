# Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

# Package files kopieren
COPY package*.json ./

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Dependencies installieren
RUN npm ci

# Source code kopieren
COPY . .

# React App bauen
RUN npm run build

# Dev-Dependencies entfernen
RUN npm prune --production

# Production stage mit einfachem HTTP Server
FROM node:20-alpine

WORKDIR /app

# Nur serve installieren
RUN npm install -g serve

# Built files kopieren
COPY --from=builder /app/dist ./dist

# Port exponieren
EXPOSE 3001

# Statische Dateien servieren
CMD ["serve", "-s", "dist", "-l", "3001"]