# base image
FROM node:current-slim as build

WORKDIR /catbot

RUN npm i nexe -g

COPY config.js .
COPY src src
COPY package.json .

RUN npm i

RUN nexe src/main.js


# base image
FROM debian:stable as production

WORKDIR /catbot

COPY --from=build /catbot/main main

RUN chmod +x main

ENTRYPOINT ["./main"]