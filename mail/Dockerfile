FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY tsconfig.json /app

RUN npm install
RUN npm install -g concurrently
RUN npm install -g typescript

COPY . /app

RUN tsc

CMD ["npm", "run", "dev"]