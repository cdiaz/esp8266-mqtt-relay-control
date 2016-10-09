# Dockerfile
FROM node:6.7.0

# Copy app files
COPY . /app

# Install dependencies
WORKDIR /app  
RUN npm install

EXPOSE 1883
EXPOSE 80