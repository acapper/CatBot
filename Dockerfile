# base image
FROM node:current-slim as build

WORKDIR /catbot

COPY config.js .
COPY src src
COPY package.json .

RUN npm i

CMD [ "npm", "start", ">>", "catbot.log" ]

ENTRYPOINT [ "/bin/bash" ]