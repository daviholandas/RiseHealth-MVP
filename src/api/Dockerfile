FROM node:latest

WORKDIR /usr/src/db

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3200

CMD ["npm", "start"]