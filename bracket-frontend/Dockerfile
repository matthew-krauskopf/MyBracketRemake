# =========================================
# Stage 1: Build the Angular Application
# =========================================
ARG NODE_VERSION=24.15.0-alpine

FROM node:${NODE_VERSION}

ENV NODE_ENV=development
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .rtgert

EXPOSE 4200

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200", "--poll", "2000"]