# Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci --only=production

# Source code kopieren
COPY . .

# React App bauen
RUN npm run build

# Production stage mit einfachem HTTP Server
FROM node:20-alpine

WORKDIR /app

# Nur serve installieren
RUN npm install -g serve

# Built files kopieren
COPY --from=builder /app/dist ./dist

# Port exponieren
EXPOSE 3000

# Statische Dateien servieren
CMD ["serve", "-s", "dist", "-l", "3000"]