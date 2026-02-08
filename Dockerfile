# Stage 1: Dependency Installation
FROM node:22-alpine AS deps

# Fix for Image Optimization issues on Alpine
RUN apk add --no-cache libc6-compat 

WORKDIR /app
COPY package.json package-lock.json* ./
# 'npm ci' is faster and safer for CI/CD than 'npm install'
RUN npm ci --legacy-peer-deps 

# Stage 2: Code Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set API URL for Build Time (NEXT_PUBLIC variables are baked in at build time)
ARG NEXT_PUBLIC_SERVER
ENV NEXT_PUBLIC_SERVER=${NEXT_PUBLIC_SERVER}
ARG NEXT_PUBLIC_SECRET_KEY
ENV NEXT_PUBLIC_SECRET_KEY=${NEXT_PUBLIC_SECRET_KEY}

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Final Production Image (Runner)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permissions for cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Hostname should be set to 0.0.0.0 for Docker
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]