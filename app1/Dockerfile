FROM node:latest

WORKDIR /app

COPY package.json index.js /app/
COPY package-lock.json /app/

RUN npm install

RUN npm i -g nodemon

CMD ["nodemon", "index.js"]