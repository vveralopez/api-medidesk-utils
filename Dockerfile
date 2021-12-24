FROM node:alpine
WORKDIR /app/apirest

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]


