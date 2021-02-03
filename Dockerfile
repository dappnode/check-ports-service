FROM node:15.7.0-alpine3.10

# Env
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev
ENV PORT 3000

# Create Directory for the Container
WORKDIR /usr/src/app

# Dependencies
COPY package.json .
RUN npm install

# Code
ADD . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 3000