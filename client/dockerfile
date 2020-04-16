FROM mhart/alpine-node:12.16.1 as build 
WORKDIR /app
COPY src/ src/
COPY public/ public/
COPY public/ public/
COPY server/ server/
COPY *.json ./
RUN npm i
RUN npm run build
RUN npm run build:server

FROM mhart/alpine-node:12.16.1 as prod
WORKDIR /app
COPY --from=build app/build/ src/
COPY --from=build app/build-server/ ./

EXPOSE 3000/tcp
ENTRYPOINT [ "node", "server.js" ]