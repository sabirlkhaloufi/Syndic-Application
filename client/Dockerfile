FROM node:16.14.2

WORKDIR /dashboard

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 3001

CMD ["npm","start"]