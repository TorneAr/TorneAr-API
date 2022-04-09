FROM node:16-alpine as local
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4000
