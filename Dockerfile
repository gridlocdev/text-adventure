# Stage 1: Build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the static files with BusyBox
FROM busybox:latest

# Create a non-root user
RUN addgroup -g 1001 vueapp && \
    adduser -D -u 1001 -G vueapp vueapp

# Create directory for static files
RUN mkdir -p /home/vueapp/www && \
    chown -R vueapp:vueapp /home/vueapp

# Copy built files from builder stage
COPY --from=builder --chown=vueapp:vueapp /app/dist /home/vueapp/www

# Switch to non-root user
USER vueapp

# Set working directory
WORKDIR /home/vueapp/www

# Expose port
EXPOSE 8080

# Start BusyBox httpd server
CMD ["httpd", "-f", "-v", "-p", "8080", "-h", "/home/vueapp/www"]
