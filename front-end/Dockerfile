FROM node:18-alpine

WORKDIR /app

# Add package files
COPY package*.json ./

# Install dependencies using clean install
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 5173

# Use the start command instead of dev for better production setup
CMD ["npm", "run", "start"]