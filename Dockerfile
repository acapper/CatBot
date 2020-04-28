# base image
FROM node:current-slim

WORKDIR /catbot

COPY config.js .
COPY src src
COPY package.json .

RUN npm i

RUN npm start