FROM node:13.5.0-slim

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm install

ADD . /app

CMD ["npm", "start"]