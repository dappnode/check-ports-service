FROM node:15.11.0-alpine3.10

# Env
ENV PORT 3000

# Create Directory for the Container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./
RUN npm install

# Code
COPY . .

# compile Typescript
RUN npm run build

CMD [ "node", "./dist/src/index.js" ]
EXPOSE 3000