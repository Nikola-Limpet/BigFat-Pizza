FROM node:18-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Add package files
COPY package*.json ./
COPY package-lock.json ./

# Install dependencies
RUN if [ -f package-lock.json ]; then \
  npm ci; \
  else \
  npm install; \
  fi

# Copy source code
COPY . .

EXPOSE 8080

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["npm", "run", "start"]