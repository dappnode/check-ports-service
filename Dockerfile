# Stage 1: Build
FROM node:15.11.0-alpine3.10 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM node:15.11.0-alpine3.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

WORKDIR /usr/src/app/dist/src

CMD [ "node", "index.js" ]

EXPOSE 3000
ENV PORT 3000
