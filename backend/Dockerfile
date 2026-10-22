FROM node:22-slim

WORKDIR /app

# copy package files, to chache dependencies layer
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 8080

USER node
CMD ["node", "server.js"]