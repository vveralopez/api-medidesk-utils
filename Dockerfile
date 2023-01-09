FROM node:latest

WORKDIR /api-medidesk-utils

COPY package*.json ./
COPY . .

RUN yarn install

CMD ["yarn", "start"]
