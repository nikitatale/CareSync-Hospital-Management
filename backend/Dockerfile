
# base image
FROM node:22-slim

# set working directory
WORKDIR /app

# copy package files, to chache dependencies layer
COPY package*.json ./
RUN npm ci --omit=dev

# copied entire project from local directory into current working directory (/app) 
COPY . .

ENV NODE_ENV=production

# specifies on which port application will listen
EXPOSE 8080

USER node

# default command to start container
CMD ["node", "server.js"]