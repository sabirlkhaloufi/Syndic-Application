FROM node:16.14.2

WORKDIR /client

COPY package.json .

RUN npm install -g npm@9.3.0

COPY . .

EXPOSE 3001

CMD ["npm","start"]