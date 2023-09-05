# Development layer
FROM node:18.17.0-alpine as development

ENV NODE_ENV=development

WORKDIR /app

# Copy configuration files
COPY ["package*", "tsconfig*.json*", "./"]
COPY 'nest-cli.json' ./

# Install dependencies from package-lock.json
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY src/ /app

# Build application (produces dist/ folder)
RUN npm run build


# Runtime (production) layer
FROM node:18.17.0-alpine as production

ENV NODE_ENV=production

WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install runtime dependencies (without dev/test dependencies)
RUN npm ci --omit=dev

# Copy production build
COPY --from=development /app/dist/ ./dist/

# Expose application port
EXPOSE 7000

# Start application
CMD [ "node", "dist/main.js" ]