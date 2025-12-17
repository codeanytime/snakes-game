# Multi-stage Dockerfile for building and serving the Vite React TypeScript app

# -------- Builder stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json yarn.lock ./
RUN npm i -g yarn@1.22.22 --force \
  && yarn install --silent

# Copy the rest of the source and build
COPY . .
RUN yarn build

# -------- Runner stage --------
FROM nginx:1.27-alpine AS runner

# Copy custom nginx configuration (includes SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
