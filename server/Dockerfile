## build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install

## run

EXPOSE 3000
CMD npm start
