# Use the official Node.js LTS image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy SSL files
COPY /etc/letsencrypt/live/api.skap.mcgi.services/privkey.pem .
COPY /etc/letsencrypt/live/api.skap.mcgi.services/fullchain.pem .

# Copy the rest of the application code
COPY . .
