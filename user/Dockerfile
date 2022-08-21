FROM node:16.14.2

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

RUN npm install -D ts-node

CMD ["npm", "run", "dev"]