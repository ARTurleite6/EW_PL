FROM node:18-bullseye

# Path: /app
WORKDIR /app

# Path: /app/package.json
COPY package.json ./

# Path: /app
RUN npm install

# Path: /app
COPY . .

ENV port=7777

EXPOSE $port

# Path: /app
CMD ["npm", "start"]
