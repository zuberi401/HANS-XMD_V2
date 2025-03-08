# Dockerfile
FROM node:lts-alpine

WORKDIR /app

RUN apk update && \
    apk add --no-cache \
    ffmpeg \
    imagemagick \
    webp \
    bash

COPY package*.json ./

RUN npm ci --production && npm install qrcode-terminal dotenv chalk

COPY . .

EXPOSE 3000

CMD ["pm2", "start", "index.js", "--name", "hans-xmd", "--watch"]
