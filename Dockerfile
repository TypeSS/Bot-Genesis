FROM node:current

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src
COPY tsconfig.json ./

RUN npm run build
CMD ["npm", "run", "start"]
