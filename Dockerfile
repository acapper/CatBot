# base image
FROM node:current-slim as build

WORKDIR /catbot

COPY config.js .
COPY src src
COPY package.json .

RUN npm i

ENTRYPOINT ["sh", "-c", "npm start"]